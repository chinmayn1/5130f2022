from flask import Flask
import os
from src.controllers.candidate import candidate
from src.controllers.user import user
from src.controllers.team import team
from src.controllers.new_assessment import new_assessment
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from src.models import db, MIGRATE_DB, MIGRATE_FRESH
from src.services.mail import mail

def create_app(test_config=None):

    app = Flask(__name__, instance_relative_config=True)

    if test_config is None:
        app.config.from_mapping(
            SECRET_KEY=os.environ.get("SECRET_KEY"),
            SQLALCHEMY_DATABASE_URI=os.environ.get("SQLALCHEMY_DATABASE_URI"),
            SQLALCHEMY_TRACK_MODIFICATIONS=False,
            JWT_SECRET_KEY=os.environ.get("JWT_SECRET_KEY"),
            MAIL_SERVER=os.environ.get("MAIL_SERVER"),
            MAIL_PORT=os.environ.get("MAIL_PORT"),
            MAIL_USERNAME=os.environ.get("MAIL_USERNAME"),
            MAIL_PASSWORD=os.environ.get("MAIL_PASSWORD"),
            MAIL_USE_TLS=True,
            MAIL_USE_SSL=False
        )
    else:
        app.config.from_mapping(test_config)

    CORS(app)
    db.app = app
    db.init_app(app)
    MIGRATE_DB(db=db)
    MIGRATE_FRESH(db=db)
    mail.init_app(app=app)
    JWTManager(app)
    app.register_blueprint(user)
    app.register_blueprint(team)
    app.register_blueprint(new_assessment)
    app.register_blueprint(candidate)
    return app
