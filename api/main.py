import os
from flask import Flask
from flask_cors import CORS

DEBUG = bool(os.environ.get("DEBUG", True))

app = Flask (__name__)
CORS(app)

#app.config["DEBUG"] = DEBUG

@app.route("/")
def hello_world():
    """root"""
    return "<p>hello world</p>"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
