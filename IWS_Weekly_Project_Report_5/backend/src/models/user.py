from src.models import db
from datetime import datetime

# USER Model


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=True)
    is_verified = db.Column(db.Boolean, default=False)
    role = db.Column(db.String(30), default="Owner", nullable=False)
    lname = db.Column(db.String(50), nullable=True)
    fname = db.Column(db.String(50), nullable=True)
    mobile = db.Column(db.Numeric, nullable=True)
    company_name = db.Column(db.String(80), nullable=True)
    job_title = db.Column(db.String(200), nullable=True)
    no_hires_per_year = db.Column(db.String(50), nullable=True)
    country = db.Column(db.String(70), nullable=True)
    website = db.Column(db.String(100), nullable=True)
    file_uploaded_name = db.Column(db.String(150), nullable=True)
    teams = db.relationship('Team', backref="user")
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, onupdate=datetime.now())

    def __repr__(self):
        return f"User>>> {self.email}"

    @classmethod
    def get_by_id(cls, id):
        result = {}
        user = cls.query.filter_by(id=id).first()
        if user:
            result['id'] = user.id
            result['email'] = user.email
            result['fname'] = user.fname
            result['lname'] = user.lname
            result['company_name'] = user.company_name
            result['job_title'] = user.job_title
            result['hires'] = user.no_hires_per_year
            result['role'] = user.role
            result['mobile'] = str(user.mobile)
            result['country'] = user.country
            result['website'] = user.website
            result['file_uploaded_name'] = user.file_uploaded_name
            return result

    @classmethod
    def get_by_email(cls, email):
        return cls.query.filter_by(email=email).first()

    @classmethod
    def for_update(cls, id=id):
        if id is not None: 
            user = cls.query.filter_by(id=id).first()
            return user
        return None

    def save(self):
        db.session.add(self)
        db.session.commit()

    def commit():
        db.session.commit()
