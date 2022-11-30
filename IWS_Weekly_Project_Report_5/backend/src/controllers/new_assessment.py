from flask import Blueprint, json, request, jsonify
from flask_jwt_extended.utils import get_jwt_identity
from flask_jwt_extended.view_decorators import jwt_required
from src.constants.http_status_code import HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_200_OK, HTTP_404_NOT_FOUND
from src.models.new_assessment import NewAssessment as NewAssessmentModel
from src.models.question import Questions as QuestionsModel
from flask_jwt_extended import get_jwt_identity, verify_jwt_in_request
from flask import Flask
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

new_assessment = Blueprint("new-assessment", __name__,
                           url_prefix="/api/v1/new-assessment")


@new_assessment.get("/")
@jwt_required()
def getAllNewAssessment():
    user_id = get_jwt_identity()["id"] if get_jwt_identity()[
        "id"] else get_jwt_identity()["user_id"]
    assessments = NewAssessmentModel.get_all_by_id(user_id=user_id)
    if assessments:
        return jsonify({"status": True, "message": "Found", "assessments": assessments}), HTTP_200_OK
    else:
        return jsonify({"status": False, "message": "Not found", "assessments": []}), HTTP_404_NOT_FOUND


@new_assessment.get("/<int:id>")
@jwt_required()
def getSingleNewAssessment(id=None):
    # user_id = get_jwt_identity()["id"] if get_jwt_identity()[
    #     "id"] else get_jwt_identity()["user_id"]
    user_id = 13
    new_assessment = NewAssessmentModel.post_by_id(id=id, user_id=user_id)
    if new_assessment:
        return jsonify({"status": True, "message": "Found", "assessments": new_assessment}), HTTP_200_OK
    else:
        return jsonify({"status": False, "message": "Not found", "assessments": []}), HTTP_404_NOT_FOUND


@new_assessment.get("/question/all/<int:assessment_id>")
@jwt_required()
def getAllQuestions(assessment_id=None):
    user_id = get_jwt_identity()["id"] if get_jwt_identity()[
        "id"] else get_jwt_identity()["user_id"]
    question = QuestionsModel.get_all_by_id(
        user_id=user_id, assessment_id=assessment_id)
    if question:
        return jsonify({"status": True, "message": "Found", "question": question}), HTTP_200_OK
    else:
        return jsonify({"status": False, "message": "Not found", "question": []}), HTTP_404_NOT_FOUND


@new_assessment.get("/question/<int:id>")
def getSingleQuestion(id=None):
    question = QuestionsModel.get_by_id(id=id)
    if question:
        return jsonify({"status": True, "message": "Found", "question": question}), HTTP_200_OK
    else:
        return jsonify({"status": False, "message": "Not found", "question": question}), HTTP_400_BAD_REQUEST

# ! NEW ASSESSMENT  AND QUESTION WHOLE IN ONE API
# using assessment id fetch assessment and using that get all question as well


@new_assessment.get("/question/merge/user/<int:user_id>/assessment/<int:id>")
def getAllInOne(id=None, user_id=None):
    if id and user_id:
        assessments = NewAssessmentModel.get_by_id(id=id, user_id=user_id)
        print(assessments)
        if assessments:
            questions = QuestionsModel.get_all_by_id(
                user_id=user_id, assessment_id=id)
            return jsonify({"status": True, "message": "Found", "data": {"assessment": assessments, "questions": questions}})
        else:
            return jsonify({"status": False, "message": "no assessment found with id {}".format(id)})
    else:
        return jsonify({"status": False, "message": "assessment id or user_id is missing", "data": []})


@new_assessment.post("/create")
@jwt_required()
def NewAssessmentStore():
    print(verify_jwt_in_request()[1])
    token = verify_jwt_in_request()[1]
    user_id = get_jwt_identity()["id"] if get_jwt_identity()[
        "id"] else get_jwt_identity()["user_id"]
    assessment_name = request.json.get("assessment_name")
    job_role = request.json.get("job_role")
    new_assessment = NewAssessmentModel(
        user_id=user_id, assessment_name=assessment_name, job_role=job_role)
    NewAssessmentModel.save(new_assessment)
    return jsonify({"status": True, "message": "Question Created", "assessment_id": new_assessment.id}), HTTP_201_CREATED


@ new_assessment.post("/question/create")
@jwt_required()
def QuestionStore():
    user_id = get_jwt_identity()["id"] if get_jwt_identity()[
        "id"] else get_jwt_identity()["user_id"]
    assessment_id = request.json.get("assessment_id")
    question_type = request.json.get("question_type")
    time_minutes = request.json.get("time_minutes")
    option_1 = request.json.get("option_1")
    option_2 = request.json.get("option_2")
    option_3 = request.json.get(
        "option_3") if request.json.get("option_3") else None
    option_4 = request.json.get(
        "option_4") if request.json.get("option_4") else None
    que = request.json.get("text")
    correct_option = request.json.get("correct_option")
    selected_language = request.json.get(
        "selected_language") if request.json.get("selected_language") else None

    question = QuestionsModel(user_id=user_id, assessment_id=assessment_id, name=QuestionsModel.QuestionNameSetter(user_id=user_id, assessment_id=assessment_id), question_type=question_type, time=time_minutes,
                              option_1=option_1, option_2=option_2, option_3=option_3, option_4=option_4, question=que, correct_option=correct_option, selected_language=selected_language)
    QuestionsModel.save(question)

    return jsonify({"status": True, "message": "Questions Addedd"}), HTTP_201_CREATED

# Updating Question


@new_assessment.put("/question/update/<int:id>")
def UpdateQuestion(id=None):
    time_minutes = request.json.get("time_minutes")
    option_1 = request.json.get("option_1")
    option_2 = request.json.get("option_2")
    option_3 = request.json.get(
        "option_3") if request.json.get("option_3") else None
    option_4 = request.json.get(
        "option_4") if request.json.get("option_4") else None
    que = request.json.get("text")
    correct_option = request.json.get("correct_option")
    selected_language = request.json.get(
        "selected_language") if request.json.get("selected_language") else None
    if id:
        question = QuestionsModel.query.filter_by(id=id).first()
        if question:
            question.time = time_minutes
            question.question = que
            question.option_1 = option_1
            question.option_2 = option_2
            question.option_3 = option_3
            question.option_4 = option_4
            question.correct_option = correct_option
            question.selected_language = selected_language
            QuestionsModel.commit()
            return jsonify({"status": True, "message": "Updated successfully"}), HTTP_200_OK
        else:
            return jsonify({"status": False, "message": "Not found"}), HTTP_400_BAD_REQUEST
    else:
        return jsonify({"status": False, "message": "ID is missing"}), HTTP_400_BAD_REQUEST
# Ordering Question


@new_assessment.put("/question/orderby")
@jwt_required()
def OrderQuestion():
    if request.get_json() is not None and "swapID" in request.get_json():
        updateId = request.json.get(
            "updateID") if request.json.get("updateID") else None
        swapID = request.json.get(
            "swapID") if request.json.get("swapID") else None
        if updateId and swapID:
            updateQue = QuestionsModel.query.filter_by(id=updateId).first()
            swapQue = QuestionsModel.query.filter_by(id=swapID).first()
            updateQue.OrderBy, swapQue.OrderBy = swapQue.OrderBy, updateQue.OrderBy
            QuestionsModel.commit()
            return jsonify({"status": True, "message": f"Position setted for id:{id} successfully"}), HTTP_200_OK
        else:
            return jsonify({"status": False, "message": "ID is missing"}), HTTP_400_BAD_REQUEST
    else:
        return jsonify({"status": False, "message": "updateID and  swapID data is missing"}), HTTP_400_BAD_REQUEST

# Deleting A Specific Question


@new_assessment.delete("/question/delete/<int:id>")
def DeleteQuestion(id=None):
    if id:
        return jsonify({"status": True, "data": QuestionsModel.delete_By_id(id=id)}), HTTP_200_OK
    else:
        return jsonify({"status": False, "message": "ID is missing"}), HTTP_400_BAD_REQUEST
