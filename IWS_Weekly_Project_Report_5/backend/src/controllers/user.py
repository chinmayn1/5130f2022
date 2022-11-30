
from flask import Blueprint, request, jsonify
from flask_jwt_extended.utils import create_access_token
from flask_jwt_extended.view_decorators import jwt_required
from src.constants.http_status_code import HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_409_CONFLICT, HTTP_202_ACCEPTED, HTTP_401_UNAUTHORIZED, HTTP_200_OK
from src.services.mail.register import RegisterMaillable
from src.models.user import User as UserModel
from src.models.team import Team as TeamModel
from flask_jwt_extended import get_jwt_identity, verify_jwt_in_request
from werkzeug.security import generate_password_hash, check_password_hash

user = Blueprint("user", __name__, url_prefix="/api/v1/user")


@user.get('/')
@jwt_required()
def Users():
    user_id = get_jwt_identity()['user_id'] if get_jwt_identity()[
        'user_id'] else get_jwt_identity()['id']
    user = UserModel.get_by_id(id=user_id)
    if user:
        return jsonify({"status": True, "message": "User found", "user": user}), HTTP_200_OK
    else:
        return jsonify({"status": False, "message": "No user found"}), HTTP_400_BAD_REQUEST


@user.post("/signup")
def SignUp():
    email = request.json.get("email")
    if UserModel.get_by_email(email=email) is not None:
        return jsonify({"status": False, "message": "Email is already registered with us",  "tag": "danger"}), HTTP_409_CONFLICT
    user = UserModel(email=email)
    user.save()
    RegisterMaillable.send_mail(email, user.id)
    return jsonify({"message": "New user created", "status": True}), HTTP_201_CREATED

# This need remove when updating for react-backend done


@user.put("/details")
@jwt_required()
def SetUserDetails():
    print(verify_jwt_in_request()[1])
    token = verify_jwt_in_request()[1]
    print(type(token))
    password = request.json.get("password")
    first_name = request.json.get("first_name")
    last_name = request.json.get("last_name")
    company_name = request.json.get("company_name")
    job_title = request.json.get("job_title")
    hires = request.json.get("hires")

    if 'sub' in token:
        print("true")
        key_list=list(token.keys())
        val_list=list(token.values())
        index=key_list.index('sub')
        id=val_list[index]
        update_user = UserModel.for_update(id)
        if update_user:
            if password:
                update_user.password = generate_password_hash(
                    password, 'sha256')
                update_user.is_verified = True
            else:
                update_user.fname = first_name
                update_user.lname = last_name
                update_user.company_name = company_name
                update_user.job_title = job_title
                update_user.no_hires_per_year = hires
            UserModel.commit()
            return jsonify({"message": "User details updated", "status": True}), HTTP_201_CREATED
        return jsonify({"message": "Something went wrong", "status": False}), HTTP_400_BAD_REQUEST


@user.route("/details/<int:id>", methods=["PUT", "PATCH"])
@jwt_required()
def UserDetails(id=None):
    password = request.json.get("password")
    firstName = request.json.get("firstName")
    lastName = request.json.get("lastName")
    companyName = request.json.get("companyName")
    jobTitle = request.json.get("jobTitle")
    hires = request.json.get("hires")

    update_user = UserModel.for_update(id)
    if update_user:
        if password:
            update_user.password = generate_password_hash(
                password, 'sha256')
            update_user.is_verified = True
        else:
            update_user.fname = firstName
            update_user.lname = lastName
            update_user.company_name = companyName
            update_user.job_title = jobTitle
            update_user.no_hires_per_year = hires
        UserModel.commit()
        return jsonify({"message": "User details updated", "status": True}), HTTP_201_CREATED
    return jsonify({"message": "Something went wrong", "status": False}), HTTP_400_BAD_REQUEST


@user.put("/profile/update")
@jwt_required()
def Profile():
    user_id = get_jwt_identity()['id']
    user_profile = UserModel.for_update(id=user_id)

    first_name = request.json.get("first_name")
    last_name = request.json.get("last_name")
    mobile = request.json.get("mobile")

    old_password = request.json.get("old_password")
    new_password = request.json.get("new_password")

    new_email = request.json.get("new_email")
    current_password = request.json.get("current_password")

    if user_profile:
        if first_name and last_name and mobile:
            user_profile.fname = first_name
            user_profile.lname = last_name
            user_profile.mobile = int(mobile)
            UserModel.commit()
            return jsonify({"status": True, "message": "Profile Updated successfully!", "tag": "success"}), HTTP_201_CREATED

        if old_password and new_password:
            if check_password_hash(user_profile.password, old_password):
                user_profile.password = generate_password_hash(new_password)
                UserModel.commit()
                return jsonify({"status": True, "message": "Your password has been changed successfully", "tag": "success", "relatedTo": "Password"}), HTTP_201_CREATED
            else:
                return jsonify({"status": False, "message": "Your old password didn\'t matched.", "tag": "danger", "relatedTo": "Password"}), HTTP_400_BAD_REQUEST

        if new_email and current_password:
            if check_password_hash(user_profile.password, current_password):
                user_profile.email = new_email
                UserModel.commit()
                return jsonify({"status": True, "message": "Your email has been changed successfully", "tag": "success", "relatedTo": "Email"}), HTTP_201_CREATED
            else:
                return jsonify({"status": False, "message": "Your password didn\'t matched", "tag": "danger", "relatedTo": "Email"}), HTTP_400_BAD_REQUEST


@user.put("/company/update/")
@jwt_required()
def CompanyDetails():
    id = get_jwt_identity()['user_id'] if get_jwt_identity()[
        'user_id'] else get_jwt_identity()['id']
    company_name = request.json.get("company_name")
    country = request.json.get("country")
    website = request.json.get("website")

    if country or website or company_name:
        user_company_details = UserModel.for_update(id=id)
        user_company_details.company_name = company_name
        user_company_details.country = country
        user_company_details.website = website
        UserModel.commit()
        return jsonify({"status": True, "message": "Your company details updated successfully", "tag": "success"})

#!User login Authentication for all members


@user.post("/auth")
def Auth():
    email = request.json.get("email")
    password = request.json.get("password")
    if email and password:
        user = UserModel.get_by_email(email=email)
        member = TeamModel.get_by_email(email=email)
        if user and check_password_hash(user.password, password):
            return jsonify({"message": "User Found", "status": True, "user": {"access_token": create_access_token({"id": user.id, "user_role": user.role, "fname": user.fname, "user_id": None}, expires_delta=False)}}), HTTP_202_ACCEPTED
        elif member and check_password_hash(member.password, password):
            return jsonify({"message": "User Found", "status": True, "user": {"access_token": create_access_token({"id": member.id, "user_role": member.role, "fname": member.fname, "user_id": member.user_id}, expires_delta=False)}}), HTTP_202_ACCEPTED
        else:
            return jsonify({"message": "Provided Credentails doesn\'t meet with our records.", "status": False}), HTTP_401_UNAUTHORIZED
