import os
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