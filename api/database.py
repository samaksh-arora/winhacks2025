import os
import bcrypt
import sqlite3

DATABASE = "./database.sqlite3"

def create_db():
    if not os.path.exists(DATABASE):
        print(f"Creating database at location {DATABASE}")
        conn = sqlite3.connect(DATABASE)
        c = conn.cursor()

        c.execute("""CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL UNIQUE,
                    password TEXT NOT NULL)""")

        c.execute("""CREATE TABLE IF NOT EXISTS action_types (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    points INTEGER DEFAULT 1)""")
        
        c.execute("""CREATE TABLE IF NOT EXISTS actions (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    type INTEGER NOT NULL,
                    amount INTEGER DEFAULT 0)""")
        
        conn.commit()
        c.close()
        print("Database created")
    else:
        print("Database already exists")

def hash_password(password):
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode("utf-8"), salt)
    return hashed

# In my next JS code, I'm going to be using jsonwebtoken or jwt to check if the user is logged in. That way I can perform various middleware steps (i.e. redirecting users to the login page). How do I set that up in flask as well?
def create_user(name, email, password):
    hashed = hash_password(password)

    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()

    c.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", (name, email, hashed))

    conn.commit()
    conn.close()

def check_user(email, password):
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()

    c.execute("SELECT password FROM users WHERE email = ?", (email))
    stored_pwd = c.fetchone()

    conn.close()

    if stored_pwd is None:
        return {"status": "error", "message": "User does not exist"}
    
    stored_pwd = stored_pwd[0]

    if bcrypt.checkpw(password.encode('utf-8'), stored_pwd):
        return {"status": "success", "message": "Login successful"}
    else:
        return {"status": "error", "message": "Incorrect password"}