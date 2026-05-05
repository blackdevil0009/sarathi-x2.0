import logging


def configure_logging(app):
    handler = logging.StreamHandler()
    formatter = logging.Formatter(
        "%(asctime)s [%(levelname)s] %(name)s - %(message)s"
    )
    handler.setFormatter(formatter)
    app.logger.handlers = [handler]
    app.logger.setLevel(logging.INFO)
    logging.getLogger("sqlalchemy").setLevel(logging.WARNING)
