from flask import Blueprint, request, jsonify
from flask_jwt_extended.utils import get_jwt_identity
from flask_jwt_extended.view_decorators import jwt_required
from src.constants.http_status_code import HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_200_OK, HTTP_409_CONFLICT, HTTP_202_ACCEPTED
from src.models.team import Team as TeamModel
from werkzeug.security import generate_password_hash

team = Blueprint("team", __name__, url_prefix="/api/v1/team")


@team.get("/<int:id>")
def TeamSingle(id=None):
    member = TeamModel.get_by_id(id=id)
    if member:
        return jsonify({"status": True, "user": member}), HTTP_200_OK
    else:
        return jsonify({"status": False, "message": "No user found"}), HTTP_400_BAD_REQUEST


@team.get("/")
@jwt_required()
def Teams():
    #members = TeamModel.get_all(id=get_jwt_identity()['user_id'])
    members = TeamModel.get_all(id=get_jwt_identity(
    )['id'], role=get_jwt_identity()['user_role'])

    if members:
        return jsonify({"status": True, "message": "Found", "result": members}), HTTP_200_OK
    else:
        return jsonify({"status": False, "message": "Not found"}), HTTP_400_BAD_REQUEST


@team.post("/member/create")
@jwt_required()
def CreateTeamMembers():
    email = request.json.get("email")
    fname = request.json.get("fname")
    lname = request.json.get("lname")
    role = request.json.get("role")
    mobile = request.json.get("mobile")
    user_id = get_jwt_identity()['user_id']
    if TeamModel.get_by_email(email=email) is None:
        team = TeamModel(user_id=user_id, fname=fname, mobile=mobile,
                         lname=lname, email=email, role=role)
        TeamModel.save(team)
        return jsonify({"status": True, "message": "New user add to your account successfully.", "tag": "success"}), HTTP_201_CREATED
    else:
        return jsonify({"status": False, "message": "Already email exists", "tag": "info"}), HTTP_409_CONFLICT


@team.put("/set-password")
@jwt_required()
def SetMemberPassword():
    member = TeamModel.for_update(id=get_jwt_identity()['id'])
    password = request.json.get("password")
    if member:
        member.password = generate_password_hash(
            password, 'sha256')
        member.is_verified = True
        TeamModel.commit()
        return jsonify({"status": True, "message": "Your password has been setted."}), HTTP_201_CREATED
    else:
        return jsonify({"status": False, "message": "No User Found"}), HTTP_400_BAD_REQUEST


@team.put("/member/update/")
@jwt_required()
def MemberUpdate():
    password = request.json.get("new_password")
    id = request.json.get("id") if get_jwt_identity()[
        'user_role'] == "Owner" else get_jwt_identity()['id']
    member = TeamModel.for_update(id=id)
    if member:
        member.password = generate_password_hash(password, 'sha256')
        TeamModel.commit()
        return jsonify({"status": True, "message": "Your password has been setted.", "tag": "success"}), HTTP_201_CREATED
    else:
        return jsonify({"status": False, "message": "No User Found", "tag": "info"}), HTTP_400_BAD_REQUEST

# * Deleting Member Acc


@team.delete("/member/delete/<int:id>")
@jwt_required()
def DeleteTeamMember(id=None):
    if id:
        team_delete = TeamModel.query.get(id)
        if team_delete:
            TeamModel.delete(team_delete)
            return jsonify({"status": True, "message": f"User with email: {team_delete.email} has been removed successfully.", "tag": "success"}), HTTP_202_ACCEPTED
        else:
            return jsonify({"status": False, "message": f"No user found with id: {id}", "tag": "danger"}), HTTP_400_BAD_REQUEST
    else:
        return jsonify({"status": False, "message": "ID is missing"}), HTTP_400_BAD_REQUEST
