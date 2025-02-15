from flask import Flask, render_template, request, redirect, url_for, session
app = Flask(__name__)

app.secret_key ='amherstburgers'

users = {
    'admin': {'password': 'password123'},
}

@app.route("/api/login", methods= ['GET', 'POST'])

def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        if username in users and users[username]['password'] == [password]:
            session['username'] = username
            return f"Welcom to DRINKUP!, {username}", 200
        else:
            return "Invalid username or password", 401

    return render_template('login.html')
@app.route("/api/dashboard")


