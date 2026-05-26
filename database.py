from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import SQLAlchemyError

_db = SQLAlchemy()

def init_db(app):
    _db.init_app(app)
    with app.app_context():
        try:
            _db.create_all()
        except SQLAlchemyError as error:
            app.logger.error("Unable to initialize database: %s", error)


def get_db():
    return _db
