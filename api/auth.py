import jwt
import datetime

def generate_token(app, user_id):
    """Generate a JWT token."""
    expiration_time = datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(days=7)
    token = jwt.encode({
        'sub': user_id,
        'exp': expiration_time
    }, app.config['SECRET_KEY'], algorithm='HS256')
    return token

def decode_token(app, token):
    """Decode a JWT and return the user ID."""
    try:
        payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        return {"status": "success", "user_id": payload['sub']}
    except jwt.ExpiredSignatureError:
        return {"status": "error", "message": "Token has expired"}
    except jwt.InvalidTokenError:
        return {"status": "error", "message": "Invalid token"}