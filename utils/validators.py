import re
from flask import current_app

COURSE_OPTIONS = {
    "Graduation - Technical",
    "Graduation - Non-Technical",
    "Intermediate",
    "High School",
    "Nursery (Class 1)",
    "Nursery (Class 2)",
    "Nursery (Class 3)",
    "Nursery (Class 4)",
    "Nursery (Class 5)",
    "Nursery (Class 6)",
    "Nursery (Class 7)",
    "Nursery (Class 8)",
}

EMAIL_REGEX = re.compile(r"^[\w\.-]+@gmail\.com$")
MOBILE_REGEX = re.compile(r"^\+?[0-9]{7,15}$")


def validate_email(value):
    if not value or not EMAIL_REGEX.match(value.strip().lower()):
        return False
    return True


def validate_mobile(value):
    if not value or not MOBILE_REGEX.match(value.strip()):
        return False
    return True


def validate_course(value):
    return bool(value and value in COURSE_OPTIONS)


def is_minor_course(value):
    return value in {"High School", "Intermediate"} or value.startswith("Nursery")


def validate_parent_contact(course_value, contact_value):
    if is_minor_course(course_value):
        return validate_mobile(contact_value)
    return True


def allowed_file(filename):
    if not filename or "." not in filename:
        return False
    extension = filename.rsplit('.', 1)[1].lower()
    return extension in current_app.config["ALLOWED_ID_EXTENSIONS"]
