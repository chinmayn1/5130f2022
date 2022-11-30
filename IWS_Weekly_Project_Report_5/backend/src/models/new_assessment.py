from src.models import db
from datetime import datetime
results = []

# NEW ASSESSMENT Model


class NewAssessment(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    assessment_name = db.Column(db.String(100), nullable=False)
    job_role = db.Column(db.String(255), nullable=False)
    timestamp = db.Column(
        db.DateTime, default=datetime.now, onupdate=datetime.now)

    def __repr__(self) -> str:
        return f"Assessment Name: {self.assessment_name}"

    @classmethod
    def get_by_id(cls, id, user_id):
        newAssessment = cls.query.filter_by(id=id, user_id=user_id).first()
        result = {}
        if newAssessment:
            result['id'] = newAssessment.id
            result['user_id'] = newAssessment.user_id
            result['assessment_name'] = newAssessment.assessment_name
            result['job_role'] = newAssessment.job_role
            return result
        return None

    @classmethod
    def get_all_by_id(cls, user_id):
        result = []
        assessment = cls.query.filter_by(user_id=user_id).all()
        if assessment:
            for item in assessment:
                result.append({
                    'id': item.id,
                    'user_id': item.user_id,
                    'assessment_name': item.assessment_name,
                    'job_role': item.job_role
                })
            return result

        return None

    @classmethod
    def post_by_id(cls,id):
        print("modal")
        return None


    def save(self):
        db.session.add(self)
        db.session.commit()

    def commit():
        db.session.commit()
