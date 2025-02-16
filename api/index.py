from flask import Flask, jsonify, request, redirect, url_for, session, make_response
from flask_cors import CORS
from database import *
from flask_cors import CORS
from auth import *

app = Flask(__name__)
app.secret_key ='amherstburgers'
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000", "supports_credentials": True}})

create_db()

staticPoints = 0
multiplier = 1

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
            samesite="None",
            secure=True
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
    result['token'] = token

    response = make_response(jsonify(result), 200)
    response.set_cookie(
        "token", 
        token,
        samesite="None",
        secure=True
    )

    return response
@app.route("/api/get-points",methods=['GET'])
def getPoints():
    #return jsonify({"points":staticPoints,"multiplier":multiplier})
    token = request.cookies.get('token')

    if token is None:
        return jsonify({"status": "error", "message": "Not logged in"}), 401
    token_data = decode_token(app, token)
    if token_data["status"] == "error":
        return jsonify(token_data), 403

    return jsonify(get_points(token_data["user_id"]))

@app.route("/api/drink", methods=['POST'])
def drink():
    # global staticPoints
    # global multiplier
    # data = request.get_json()
    # amount = data.get('amount')
    # test = data.get('multiplier')
    # print(test)
    # staticPoints = staticPoints + amount
    # multiplier = test
    # return jsonify({"status": "success"}),200
    token = request.cookies.get('token')
    if token is None:
        return jsonify({"status": "error", "message": "Not logged in"}), 401
    
    data = request.get_json()
    amount = data.get("amount")
    token_data = decode_token(app, token)
    if token_data["status"] == "error":
        return jsonify(token_data), 403

    return jsonify(drink_water(token_data["user_id"], amount)), 200
    
@app.route('/api/badges', methods=['GET'])
def badges():
    badges = get_badges()
    return jsonify({"badges": badges})

@app.route('/api/leaderboard', methods=['GET'])
def leaderboard():
    leaderboard = get_leaderboard()
    return jsonify({"leaderboard": leaderboard})