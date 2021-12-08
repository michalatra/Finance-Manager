from flask import Flask
from flask_cors import CORS
from content import api, auth

app = Flask(__name__)
app.register_blueprint(api.api)
app.register_blueprint(auth.auth)
CORS(app)

if __name__ == "__main__":
    app.run()