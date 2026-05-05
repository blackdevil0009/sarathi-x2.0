import logging
from flask import Flask
from flask_jwt_extended import JWTManager
from werkzeug.exceptions import HTTPException

from config import Config
from database import init_db
from routes.auth_routes import auth_bp
from routes.compiler_routes import compiler_bp
from utils.logger import configure_logging
from utils.response import error_response


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    configure_logging(app)
    init_db(app)

    JWTManager(app)

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(compiler_bp, url_prefix="/api/compiler")

    @app.route("/")
    def index():
        return {
            "success": True,
            "message": "Backend is running",
            "routes": [
                "/api/auth/register",
                "/api/auth/login",
                "/api/auth/me",
                "/api/compiler/execute",
            ],
        }

    @app.route("/api")
    def api_index():
        return {
            "success": True,
            "message": "API root",
            "routes": [
                "/auth/register",
                "/auth/login",
                "/auth/me",
                "/compiler/execute",
            ],
        }

    @app.errorhandler(404)
    def not_found(error):
        return error_response("Endpoint not found", code=404)

    @app.errorhandler(413)
    def request_too_large(error):
        return error_response("Uploaded file is too large", code=413)

    @app.errorhandler(Exception)
    def handle_exception(error):
        app.logger.exception("Unhandled exception")
        if isinstance(error, HTTPException):
            return error_response(error.description, code=error.code)
        message = str(error)
        return error_response("Internal server error", errors=[message], code=500)

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=False)
