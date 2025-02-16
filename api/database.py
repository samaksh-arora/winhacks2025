import os
import bcrypt
import sqlite3
import datetime

DATABASE = "./database.sqlite3"
conn = None
c = None

def create_db():
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    if not os.path.exists(DATABASE):
        print(f"Creating database at location {DATABASE}")
        c.execute("""CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL UNIQUE,
                    password TEXT NOT NULL,
                    points INTEGER DEFAULT 0)""")

        c.execute("""CREATE TABLE IF NOT EXISTS action_types (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    points INTEGER DEFAULT 1,
                    max_per_day INTEGER DEFAULT -1)""")
    
        c.execute("""INSERT INTO action_types (id, name, points, max_per_day) VALUES
                    (1, "Drink Water", 1, 3000)""")
        
        c.execute("""CREATE TABLE IF NOT EXISTS actions (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER NOT NULL,
                    date DATETIME DEFAULT CURRENT_TIMESTAMP,
                    type INTEGER NOT NULL,
                    amount INTEGER DEFAULT 0)""")
        
        conn.commit()
        print("Database created")
    else:
        print("Database already exists")

# Create a hash of a given password.
def hash_password(password):
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode("utf-8"), salt)
    return hashed

# Create a user and save it to the database.
def create_user(name, email, password):
    hashed = hash_password(password)

    c.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", (name, email, hashed))

    conn.commit()

# Checks if the user exists (for login purposes).
def check_user(email, password):

    c.execute("SELECT id, password FROM users WHERE email = ?", (email,))
    user_data = c.fetchone()

    if user_data is None:
        return {"status": "error", "message": "User does not exist"}
    
    id = user_data[0]
    stored_pwd = user_data[1]

    if bcrypt.checkpw(password.encode('utf-8'), stored_pwd):
        return {"status": "success", "message": "Login successful", "id": id}
    else:
        return {"status": "error", "message": "Incorrect password", "id": id}

def get_minutes_since_last_action(user_id, action_type):
    c.execute("SELECT date FROM actions WHERE user_id = ? AND type = ?", (user_id, action_type))
    latest_action = c.fetchone()

    if latest_action:
        date = datetime.datetime.strptime(latest_action[0], "%Y-%m-%d %H:%M:%S")
        now = datetime.datetime.now(datetime.timezone.utc)
        diff = now - date
        return diff.total_seconds() // 60

    return -1

def water_to_points(amount):
    c.execute("SELECT points FROM action_types WHERE id=1")
    action = c.fetchone()

    if action is None:
        return amount # Default to 1 point per amount.

    return amount * int(action[0])

def increase_points(user_id, amount):
    c.execute("SELECT points FROM users WHERE id=?", (user_id,))
    points = c.fetchone()

    if points is None:
        return {"status": "error", "message": "Invalid user", "relogin": True}
    
    points = int(points[0]) + water_to_points(amount)
    c.execute("UPDATE users SET points=? WHERE id=?", (points, user_id))
    conn.commit()

    return points

def drink_water(user_id, amount):
    minutes = get_minutes_since_last_action(user_id)
    if minutes < 5 and minutes != -1:
        return {"status": "error", "message": "Woah there, pace yourself! You shouldn't drink too much water at a time."}

    c.execute("INSERT INTO actions (user_id, type, amount) VALUES (?, 1, ?)", (user_id, amount))
    conn.commit()

    points = increase_points(user_id, amount)
    return {"status": "success", "message": "You drank up!", "points": points}