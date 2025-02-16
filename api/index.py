from flask import Flask, jsonify, request, redirect, url_for, session, make_response
from flask_cors import CORS
from database import *
from flask_cors import CORS
from auth import *

app = Flask(__name__)
app.secret_key ='amherstburgers'
cors = CORS(app)

create_db()

@app.route("/api/login", methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    result = check_user(email, password)
    if result["status"] == "success":
        token = generate_token(app, result["id"])
        session['token'] = token
        response = make_response(jsonify({
            "status": "success",
            "message": "Welcome to DRINKUP!",
            "token": token
        }), 200)
        response.set_cookie(
            "token", 
            token, 
            httponly=True, 
            secure=True,  # Set to False if using HTTP (not recommended)
            samesite="Lax",
        )

        return response
    else:
        return jsonify(result), 401

@app.route("/api/register", methods=['POST'])
def register():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    result = create_user(name, email, password)
    token = generate_token(app, result["id"])
    session['token'] = token

    response = make_response(jsonify(result), 200)
    response.set_cookie(
        "token", 
        token, 
        httponly=True, 
        secure=True,  # Set to False if using HTTP (not recommended)
        samesite="Lax",
    )

    return response

@app.route("/api/get-points",methods=['GET'])
def getPoints():
    if 'token' not in session:
        return jsonify({"status": "error", "message": "Not logged in"}), 401
    token_data = decode_token(app, session['token'])
    if token_data["status"] == "error":
        return jsonify(token_data), 403

    return jsonify(get_points(token_data["user_id"]))

@app.route("/api/drink", methods=['POST'])
def drink():
    if 'token' not in session:
        return jsonify({"status": "error", "message": "Can't drink, not logged in"}), 401
    data = request.get_json()
    amount = data.get("amount")
    token_data = decode_token(app, session['token'])
    if token_data["status"] == "error":
        return jsonify(token_data), 403

    return jsonify(drink_water(token_data["user_id"], amount)), 
    
