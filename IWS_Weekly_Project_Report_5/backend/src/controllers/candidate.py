import token
from flask import Blueprint, jsonify, request
from flask_jwt_extended.utils import get_jwt_identity
from src.constants.http_status_code import HTTP_400_BAD_REQUEST, HTTP_201_CREATED, HTTP_202_ACCEPTED
from src.models.candidate import Candidate as CandidateModel
from flask_jwt_extended.view_decorators import jwt_required
from src.services.mail.invitation import InvitationMaillable


candidate = Blueprint("candidate", __name__, url_prefix="/api/v1/candidates")


@candidate.get("/<int:assessment_id>")
@jwt_required()
def getAllCandidate(assessment_id=None):
    if assessment_id:
        user_id = get_jwt_identity()['id']
        candidate = CandidateModel.get_all(
            user_id=user_id, assessment_id=assessment_id)
        if candidate:
            return jsonify({"status": True, "messgae": "Found", "candidate": candidate})
        else:
            return jsonify({"status": False, "message": "Not Found", "candidate": []}), HTTP_400_BAD_REQUEST
    else:
        return jsonify({"status": False, "message": "assessment id is missing"}), HTTP_400_BAD_REQUEST


@candidate.post("/create")
@jwt_required()
def CandidateCreate():
    assessment_id = request.json.get("assessment_id")
    user_id = get_jwt_identity()['id']
    # print(token["accessToken"])
    #user_id = 11
    firstName = request.json.get(
        "first_name") if request.json.get("first_name") else None
    lastName = request.json.get("last_name")
    email = request.json.get("email")

    if firstName and lastName and email:
        result = []
        candidate_create = CandidateModel(user_id=user_id, assessment_id=assessment_id,
                                          firstName=firstName, lastName=lastName, email=email)
        CandidateModel.save(candidate_create)
        print("inside candidate")
        result.append({
            'id': candidate_create.id,
            'user_id': candidate_create.user_id,
            'assessment_id': candidate_create.assessment_id,
            'firstName': candidate_create.firstName,
            'lastName': candidate_create.lastName,
            'email': candidate_create.email,
            'timestamp': candidate_create.timestamp.strftime("%B %d, %Y")
        })
        InvitationMaillable.send_mail(
            candidate_create.email, user_id=user_id, assessment_id=assessment_id)
        return jsonify({"status": True, "message": "Candidate created successfully", "candidate": result, "tag": "success"}), HTTP_201_CREATED
    else:
        return jsonify({"status": False, "message": "assessment_id,first_name, last_name or email value is missing", "tag": "danger"}), HTTP_400_BAD_REQUEST


@candidate.delete("/delete/<int:id>")
def RemoveCandidateFromAssessment(id=None):
    if id:
        candidate_delete = CandidateModel.query.get(id)
        if candidate_delete:
            print(id)
            CandidateModel.delete(candidate_delete)
            return jsonify({"status": True, "message": f"Candidate with email: {candidate_delete.email} has been removed successfully.", "tag": "success"}), HTTP_202_ACCEPTED
        else:
            return jsonify({"status": False, "message": f"No user found with id: {id}", "tag": "danger"}), HTTP_400_BAD_REQUEST
    else:
        return jsonify({"status": False, "message": "ID is missing"}), HTTP_400_BAD_REQUEST
