from flask import jsonify


def success_response(data=None, message=None, code=200):
    payload = {"success": True}
    if message:
        payload["message"] = message
    if data is not None:
        payload["data"] = data
    return jsonify(payload), code


def error_response(message, errors=None, code=400):
    payload = {"success": False, "message": message}
    if errors is not None:
        payload["errors"] = errors
    return jsonify(payload), code
