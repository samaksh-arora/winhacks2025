import jwt
import datetime

def generate_token(app, user_email):
    """Generate a JWT token."""
    expiration_time = datetime.datetime.utcnow() + datetime.timedelta(days=7)
    token = jwt.encode({
        'sub': user_email,
        'exp': expiration_time
    }, app.config['SECRET_KEY'], algorithm='HS256')
    return token