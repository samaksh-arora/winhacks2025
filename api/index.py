from flask import Flask, jsonify, request, redirect, url_for, session
from database import *
from auth import *

app = Flask(__name__)
app.secret_key ='amherstburgers'

create_db()

@app.route("/api/login", methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password']

    result = check_user(email, password)
    if result["status"] == "success":
        token = generate_token()
        session['token'] = token
        return jsonify({
            "message": "Welcome to DRINKUP!",
            "token": token
        }), 200
    else:
        return jsonify(result), 401
@app.route("/api/register", methods=['POST'])

def register():
    name = request.form['name']
    email = request.form['email']
    password = request.form['password']

    token = generate_token()
    session['token'] = token

    result = create_user(name, email, password)

    return jsonify(result), 200