from flask import (Flask, request)

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    return 'Hello, World!'