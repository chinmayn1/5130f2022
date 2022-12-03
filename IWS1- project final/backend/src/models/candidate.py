from src.models import db
from datetime import datetime


# Candidates
class Candidate(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    assessment_id = db.Column(db.Integer, db.ForeignKey('new_assessment.id'))
    firstName = db.Column(db.String(50), nullable=False)
    lastName = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(70), nullable=False)
    timestamp = db.Column(
        db.DateTime, default=datetime.now, onupdate=datetime.now)

    @classmethod
    def get_all(cls, user_id, assessment_id):
        result = []
        candidates = cls.query.filter_by(
            user_id=user_id, assessment_id=assessment_id).all()
        if candidates:
            for item in candidates:
                result.append({
                    'id': item.id,
                    'user_id': item.user_id,
                    'assessment_id': item.assessment_id,
                    'firstName': item.firstName,
                    'lastName': item.lastName,
                    'email': item.email,
                    'timestamp': item.timestamp.strftime("%B %d, %Y")
                })
            return result
        return None

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def commit():
        db.session.commit()
