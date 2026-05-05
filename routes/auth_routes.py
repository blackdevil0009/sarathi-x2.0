from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from services.auth_service import register_user, authenticate_user
from utils.response import success_response, error_response

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/register", methods=["POST"])
def register():
    form = request.form.to_dict(flat=True)
    file = request.files.get("id_file")
    user, errors = register_user(form, file)
    if errors:
        return error_response("Registration failed", errors=errors, code=400)
    return success_response({"user": user.to_dict()}, message="Registration completed", code=201)


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json(silent=True)
    if data is None:
        data = request.form.to_dict(flat=True)
    token, error = authenticate_user(data.get("gmail"), data.get("password"))
    if error:
        return error_response(error, code=401)
    return success_response({"access_token": token}, message="Login successful")


@auth_bp.route("/me", methods=["GET"])
@jwt_required()
def me():
    current_user_id = get_jwt_identity()
    return success_response({"user_id": current_user_id}, message="Authenticated user")
