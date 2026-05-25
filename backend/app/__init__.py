from flask import Flask
from flask_cors import CORS
from app.routes.test import test_bp

def create_app():
    app = Flask(__name__)

    CORS(app)

    app.register_blueprint(test_bp)

    @app.route("/")
    def home():
        return {"message": "Backend running"}

    return app