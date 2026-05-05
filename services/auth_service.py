import os
import uuid
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from flask import current_app
from flask_jwt_extended import create_access_token

from database import get_db
from models.user import User
from utils.validators import (
    validate_email,
    validate_mobile,
    validate_course,
    validate_parent_contact,
    allowed_file,
    is_minor_course,
)

DB = get_db()


def build_registration_errors(data, file):
    errors = []

    full_name = data.get("full_name", "").strip()
    mobile = data.get("mobile", "").strip()
    gmail = data.get("gmail", "").strip().lower()
    course = data.get("course", "").strip()
    address = data.get("address", "").strip()
    parent_contact = data.get("parent_contact", "").strip()
    password = data.get("password", "")
    confirm_password = data.get("confirm_password", "")
    terms_accepted = data.get("terms_accepted")

    if not full_name:
        errors.append("Full Name is required")
    if not validate_mobile(mobile):
        errors.append("Mobile Number is required and must be valid")
    if not validate_email(gmail):
        errors.append("Gmail is required and must be a valid gmail.com address")
    if not validate_course(course):
        errors.append("Course is required and must be a valid option")
    if not address:
        errors.append("Address is required")
    if not validate_parent_contact(course, parent_contact):
        errors.append("Parent's Contact Number is required for minors and must be valid")
    if not file:
        errors.append("School/College ID file is required")
    elif not allowed_file(file.filename):
        errors.append("School/College ID file must be a PDF or image")
    if not password or len(password) < 8:
        errors.append("Password is required and must be at least 8 characters")
    if password != confirm_password:
        errors.append("Password and Confirm Password must match")
    if terms_accepted not in [True, "true", "True", "1", 1, "on"]:
        errors.append("Terms and Conditions must be accepted")

    if gmail and DB.session.query(User).filter_by(gmail=gmail).first():
        errors.append("Gmail is already registered")

    return errors


def save_id_file(file):
    upload_folder = current_app.config["UPLOAD_FOLDER"]
    os.makedirs(upload_folder, exist_ok=True)
    filename = secure_filename(file.filename)
    unique_name = f"{uuid.uuid4().hex}_{filename}"
    saved_path = os.path.join(upload_folder, unique_name)
    file.save(saved_path)
    return saved_path


def register_user(data, file):
    errors = build_registration_errors(data, file)
    if errors:
        return None, errors

    id_file_path = None
    try:
        id_file_path = save_id_file(file)
        password_hash = generate_password_hash(data["password"], method="pbkdf2:sha256", salt_length=16)

        user = User(
            full_name=data["full_name"].strip(),
            mobile=data["mobile"].strip(),
            gmail=data["gmail"].strip().lower(),
            course=data["course"].strip(),
            address=data["address"].strip(),
            parent_contact=data.get("parent_contact", "").strip() if is_minor_course(data["course"].strip()) else None,
            id_file_path=id_file_path,
            password_hash=password_hash,
        )
        DB.session.add(user)
        DB.session.commit()
        return user, None
    except Exception as error:
        DB.session.rollback()
        if id_file_path and os.path.exists(id_file_path):
            try:
                os.remove(id_file_path)
            except OSError:
                pass
        return None, ["Unable to complete registration. Please try again."]


def authenticate_user(gmail, password):
    if not gmail or not password:
        return None, "Gmail and password are required"

    user = DB.session.query(User).filter_by(gmail=gmail.strip().lower()).first()
    if not user or not check_password_hash(user.password_hash, password):
        return None, "Invalid login credentials"

    access_token = create_access_token(identity=str(user.id))
    return access_token, None
