from src.services.mail import mail, os, create_access_token, Message


class InvitationMaillable():

    def __init__(self) -> None:
        pass

    def send_mail(to=None, assessment_id=None, user_id=None) -> dict:

        if id is None and user_id is None:
            print("Need assessment id and user id !!!")
            exit(0)

        token = create_access_token(
            {"user_id": user_id, "assessment_id": assessment_id}, expires_delta=False)

        msg = Message(
            subject="Welcome To eAssessment",
            body='http://127.0.0.1:4000?token={}'.format(token),
            sender="chinmay.mathakari@gmail.com",
            recipients=[to]
        )
        try:
            mail.send(message=msg)
            return {'message': 'Mail sent!', "status": True, "status_code": 400}
        except Exception as e:
            print(e)
            return {'message': 'Mail failed to send', "status": False, "status_code": 404}
