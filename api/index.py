from flask import Flask, jsonify, request, redirect, url_for, session
from flask_cors import CORS
from database import *
from auth import *

app = Flask(__name__)
app.secret_key ='amherstburgers'
cors = CORS(app) # allow CORS for all domains on all routes.

create_db()

@app.route("/api/login", methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    print(email)
    password = data.get("password")
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

@app.route("/api/drink", methods=['POST'])
def drink():
    data = request.get_json()
    amount = data.get("amount")
    token_data = decode_token(app, session['token'])
    if token_data["status"] == "error":
        return jsonify(token_data), 403

    return jsonify(drink_water(token_data["user_id"], amount)), 
    