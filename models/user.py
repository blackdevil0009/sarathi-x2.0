from datetime import datetime
from database import get_db

DB = get_db()


class User(DB.Model):
    __tablename__ = "users"

    id = DB.Column(DB.Integer, primary_key=True)
    full_name = DB.Column(DB.String(120), nullable=False)
    mobile = DB.Column(DB.String(20), nullable=False)
    gmail = DB.Column(DB.String(255), nullable=False, unique=True)
    course = DB.Column(DB.String(80), nullable=False)
    address = DB.Column(DB.Text, nullable=False)
    parent_contact = DB.Column(DB.String(20), nullable=True)
    id_file_path = DB.Column(DB.String(512), nullable=False)
    password_hash = DB.Column(DB.String(255), nullable=False)
    created_at = DB.Column(DB.DateTime, default=datetime.utcnow, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "full_name": self.full_name,
            "mobile": self.mobile,
            "gmail": self.gmail,
            "course": self.course,
            "address": self.address,
            "parent_contact": self.parent_contact,
            "id_file_path": self.id_file_path,
            "created_at": self.created_at.isoformat(),
        }
