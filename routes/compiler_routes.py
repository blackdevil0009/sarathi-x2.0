from flask import Blueprint, request
from flask_jwt_extended import jwt_required

from services.compiler_service import validate_code_request, execute_python_code
from utils.response import success_response, error_response

compiler_bp = Blueprint("compiler", __name__)


@compiler_bp.route("/execute", methods=["POST"])
@jwt_required()
def execute():
    data = request.get_json(silent=True) or {}
    code = data.get("code")
    language = data.get("language", "python").lower()

    validation_error = validate_code_request(code, language)
    if validation_error:
        return error_response(validation_error, code=400)

    result = execute_python_code(code)
    return success_response({"result": result}, message="Code execution completed")
