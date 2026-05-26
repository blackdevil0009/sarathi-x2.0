import os
from datetime import timedelta
from pathlib import Path

from dotenv import load_dotenv, find_dotenv

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(find_dotenv())


def get_env(key, default=None, required=False):
    value = os.environ.get(key, None)
    if value == "":
        value = None
    if value is None:
        if required and default is None:
            raise RuntimeError(f"Environment variable {key} is required")
        return default
    return value


class Config:
    SECRET_KEY = get_env("SECRET_KEY", "change-me")
    JWT_SECRET_KEY = get_env("JWT_SECRET_KEY", SECRET_KEY)
    SQLALCHEMY_DATABASE_URI = get_env(
        "DATABASE_URL",
        f"mysql+pymysql://{get_env('DB_USER','root')}:{get_env('DB_PASSWORD','password')}@{get_env('DB_HOST','127.0.0.1')}:{get_env('DB_PORT','3306')}/{get_env('DB_NAME','app_db')}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    UPLOAD_FOLDER = get_env("UPLOAD_FOLDER", str(BASE_DIR / "uploads" / "ids"))
    MAX_CONTENT_LENGTH = 2 * 1024 * 1024
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=2)
    ALLOWED_ID_EXTENSIONS = {"pdf", "png", "jpg", "jpeg"}
    COMPILER_TIMEOUT_SECONDS = int(get_env("COMPILER_TIMEOUT_SECONDS", "5"))
    COMPILER_MAX_OUTPUT = int(get_env("COMPILER_MAX_OUTPUT", "8192"))
