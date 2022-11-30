from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, inspect
import os
db = SQLAlchemy()


def MIGRATE_DB(db):
    if os.environ.get("MIGRATE_DB").lower() in ("true"):
        print("Migrating tables at ", db)
        db.create_all()
        print("Migrating done")


def MIGRATE_FRESH(db):
    engine = create_engine(os.environ.get("SQLALCHEMY_DATABASE_URI"))
    # inspector = inspect(engine)
    # if os.environ.get("MIGRATE_DB_FRESH").lower() in ("true"):
    #     print("Dropping all tables: ", inspector.get_table_name())
    #     db.drop_all()
    #     print("All tables dropped")
    #     print("Migrating tables at ", db)
    #     db.create_all()
    #     print("Migrating done")
