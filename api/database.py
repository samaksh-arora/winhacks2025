import os
import bcrypt
import sqlite3
import datetime
import random

DATABASE = "./database.sqlite3"
conn = None
c = None

def create_db():
    global conn, c
    
    if not os.path.exists(DATABASE):
        conn = sqlite3.connect(DATABASE, check_same_thread=False)
        c = conn.cursor()
        print(f"Creating database at location {DATABASE}")
        c.execute("""CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL UNIQUE,
                    password TEXT NOT NULL,
                    points INTEGER DEFAULT 0)""")
        
        c.execute("""INSERT INTO users VALUES (1, "admin", "admin@gmail.com", "epicness", 50000)""")
        c.execute("""INSERT INTO users VALUES (2, "john_doe", "john.doe@example.com", "password123", 350)""")
        c.execute("""INSERT INTO users VALUES (3, "sarah_lee", "sarah.lee@example.com", "letmein2025", 1200)""")
        c.execute("""INSERT INTO users VALUES (4, "mike_smith", "mike.smith123@example.com", "hello1234", 250)""")
        c.execute("""INSERT INTO users VALUES (5, "lucy_hamilton", "lucy.hamilton@example.com", "ilovecats!", 1500)""")
        c.execute("""INSERT INTO users VALUES (6, "paul_king", "paul.king789@example.com", "securepass", 500)""")
        c.execute("""INSERT INTO users VALUES (7, "jane_doe", "jane.doe@example.com", "mysecretpassword", 200)""")
        c.execute("""INSERT INTO users VALUES (8, "emily_williams", "emily.williams@example.com", "12345678", 1750)""")
        c.execute("""INSERT INTO users VALUES (9, "robert_brown", "robert.brown@example.com", "qwertyuiop", 950)""")
        c.execute("""INSERT INTO users VALUES (10, "alice_martin", "alice.martin@example.com", "password1", 300)""")
        c.execute("""INSERT INTO users VALUES (11, "charles_davis", "charles.davis@example.com", "charles2025", 800)""")

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
    
        c.execute("""CREATE TABLE IF NOT EXISTS badges (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    cost INTEGER DEFAULT 2000,
                    icon INTEGER DEFAULT 0)""")
        c.execute("""INSERT INTO badges (id, name, cost, icon) VALUES
                    (1, "Water Wannabe", 2000, 1),
                    (2, "Liquid Learner", 4000, 0),
                    (3, "Sipping Sprout", 6000, 0),
                    (4, "Thirsty Turtle", 8000, 0),
                    (5, "Aqua Advocate", 10000, 3),
                    (6, "Hydration Hero", 12000, 4),
                    (7, "Fluid Fanatic", 14000, 3),
                    (8, "H2-Oh Yeah!", 16000, 6),
                    (9, "Senior Sipper", 18000, 5),
                    (10, "Quench Quest Champion", 20000, 4),
                    (11, "Water Wizard", 22000, 7),
                    (12, "Hydro Homie", 24000, 3),
                    (13, "Sip Supreme", 26000, 8),
                    (14, "Hydration Guru", 28000, 4),
                    (15, "Aqua Ace", 30000, 5),
                    (16, "Liquid Legend", 32000, 2),
                    (17, "Elixir Elite", 34000, 2),
                    (18, "Water Warrior", 36000, 5),
                    (19, "Drip Dynamo", 38000, 8),
                    (20, "Fluid Fiend", 40000, 7),
                    (21, "Sustaining Sipper", 45000, 8),
                    (22, "Moisture Maven", 50000, 9),
                    (23, "Pristine Purifier", 60000, 9),
                    (24, "Vivacious Vessel", 70000, 9),
                    (25, "Sip Savant", 80000, 9),
                    (26, "Harmonic Hydrator", 90000, 9),
                    (27, "Master of Moisture", 100000, 10)""")
        
        conn.commit()
        print("Database created")
    else:
        conn = sqlite3.connect(DATABASE, check_same_thread=False)
        c = conn.cursor()
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
    user_id = c.lastrowid
    conn.commit()

    return {"status": "success", "message": "Welcome to DRINKUP!", "id": user_id}

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

def get_minutes_since_last_action(user_id, action_type = 1):
    c.execute("SELECT date FROM actions WHERE user_id = ? AND type = ?", (user_id, action_type))
    latest_action = c.fetchone()

    if latest_action:
        date = datetime.datetime.strptime(latest_action[0], "%Y-%m-%d %H:%M:%S")
        date = date.replace(tzinfo=datetime.timezone.utc)
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

def get_points(user_id):
    c.execute("SELECT points FROM users WHERE id=?", (user_id,))
    points = c.fetchone()

    if points is None:
        return {"status": "error", "message": "Invalid user", "relogin": True}
    
    return {"status": "success", "points": points[0]}

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

def get_badges():
    c.execute("SELECT * FROM badges")
    badges = c.fetchall()
    
    badge_list = [{"id": row[0], "name": row[1], "cost": row[2], "icon": row[3]} for row in badges]
    return badge_list

def get_leaderboard():
    c.execute("SELECT id, name, points FROM users ORDER BY points DESC")
    users = c.fetchall()

    user_list = [{"id": row[0], "name": row[1], "points": row[2]} for row in users]
    return user_list