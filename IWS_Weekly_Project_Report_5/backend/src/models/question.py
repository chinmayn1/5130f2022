from src.models import db
from datetime import datetime

# QUESTION Model


class Questions(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    assessment_id = db.Column(db.Integer, db.ForeignKey('new_assessment.id'))
    OrderBy = db.Column(db.Integer, db.Sequence("orderBy"))
    name = db.Column(db.String(100), nullable=False)
    question_type = db.Column(db.String(100), nullable=False)
    time = db.Column(db.Integer, nullable=False)
    question = db.Column(db.Text, nullable=False)
    option_1 = db.Column(db.String(100), nullable=True)
    option_2 = db.Column(db.String(100), nullable=True)
    option_3 = db.Column(db.String(100), nullable=True)
    option_4 = db.Column(db.String(100), nullable=True)
    correct_option = db.Column(db.String(100), nullable=True)
    selected_language = db.Column(db.String(100))
    isShuffle = db.Column(db.Boolean, nullable=True)
    timestamp = db.Column(
        db.DateTime, default=datetime.now, onupdate=datetime.now)

    def __repr__(self) -> str:
        return f"Question Typse: {self.name}"

    @classmethod
    def get_by_id(cls, id):
        que = cls.query.filter_by(id=id).first()
        result = {}
        if que:
            result['id'] = que.id
            result['user_id'] = que.user_id
            result['assessment_id'] = que.assessment_id
            result['name'] = que.name
            result['question_type'] = que.question_type
            result['time'] = que.time
            result['question'] = que.question
            result['option_1'] = que.option_1
            result['option_2'] = que.option_2
            result['option_3'] = que.option_3
            result['option_4'] = que.option_4
            result['correct_option'] = que.correct_option
            result['isShuffle'] = que.isShuffle
            result['orderBy'] = que.OrderBy
            result['selected_language'] = que.selected_language
            return result
        return None

    @classmethod
    def QuestionNameSetter(cls, user_id, assessment_id):
        que = cls.query.filter_by(
            user_id=user_id, assessment_id=assessment_id).order_by(cls.OrderBy.desc()).first()
        if que:
            que_name = que.name.split("-")
            return que_name[0] + "-" + str(int(que_name[1])+1)
        return "Question-1"

    @classmethod
    def get_all_by_id(cls, user_id=None, assessment_id=None):
        result = []
        que = cls.query.filter_by(
            user_id=user_id, assessment_id=assessment_id).order_by(cls.OrderBy).all()
        print(que)
        if que:
            for item in que:
                result.append({
                    'id': item.id,
                    'user_id': item.user_id,
                    'assessment_id': item.assessment_id,
                    'name': item.name,
                    'question_type': item.question_type,
                    'time': item.time,
                    'question': item.question,
                    'option_1': item.option_1,
                    'option_2': item.option_2,
                    'option_3': item.option_3,
                    'option_4': item.option_4,
                    'correct_option': item.correct_option,
                    'isShuffle': item.isShuffle,
                    "orderBy": item.OrderBy,
                    'selected_language': item.selected_language
                })
            return result
        return None

    @classmethod
    def delete_By_id(cls, id=None):
        if id is not None:
            que = cls.query.get(id)
            if que:
                db.session.delete(que)
                db.session.commit()
                return {"status": True, "message": f"Question with id:{id} has been deleted successfully", "tag": "success"}
            else:
                return {"status": False, "message": f"No question with id:{id} has been found.", "tag": "info"}

    def save(self):
        db.session.add(self)
        db.session.commit()

    def commit():
        db.session.commit()
