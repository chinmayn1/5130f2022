from src.models import db
from datetime import datetime
from src.models.user import User as UserModel
# TEAM MODEL


class Team(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String(30))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(255), nullable=True)
    is_verified = db.Column(db.Boolean, default=False)
    lname = db.Column(db.String(50))
    fname = db.Column(db.String(50))
    mobile = db.Column(db.Numeric, nullable=True)
    timestamp = db.Column(
        db.DateTime, default=datetime.now, onupdate=datetime.now)

    def __repr__(self) -> str:
        return f"Team>>>> {self.email}"

    @classmethod
    def get_by_id(cls, id):
        teams = {}
        team = cls.query.filter_by(id=id).first()
        if team:
            teams['id'] = team.id
            teams['fname'] = team.fname
            teams['lname'] = team.lname
            teams['email'] = team.email
            teams['mobile'] = team.mobile
            teams['role'] = team.role
            teams['user_id'] = team.user_id
            return teams
        return None

    @classmethod
    def get_all(cls, id=None, role=None):
        result = []
        if id and role:
            if role == "Owner":
                user = UserModel.get_by_id(id)
                if user:
                    result.append(user)
                team = cls.query.filter_by(user_id=id).all()
                for item in team:
                    result.append({
                        'id': item.id,
                        'fname': item.fname,
                        'lname': item.lname,
                        'email': item.email,
                        'mobile': item.mobile,
                        'role': item.role,
                        'user_id': item.user_id
                    })
                return result
            else:
                current_user = cls.query.filter_by(id=id).first()
                result.append({
                    'id': current_user.id,
                    'fname': current_user.fname,
                    'lname': current_user.lname,
                    'email': current_user.email,
                    'role': current_user.role,
                    'user_id': current_user.user_id
                })
                team = cls.query.filter_by(
                    user_id=current_user.user_id)
                for item in team:
                    if item.id != current_user.id:
                        result.append({
                            'id': item.id,
                            'fname': item.fname,
                            'lname': item.lname,
                            'email': item.email,
                            'role': item.role,
                            'user_id': item.user_id
                        })
                return result
        return None

    @classmethod
    def get_by_email(cls, email):
        return cls.query.filter_by(email=email).first()

    @classmethod
    def for_update(cls, id=None):
        if id is not None:
            return cls.query.filter_by(id=id).first()
        return None

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def commit():
        db.session.commit()
