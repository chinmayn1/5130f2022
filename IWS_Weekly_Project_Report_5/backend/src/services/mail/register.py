from src.services.mail import mail, os, create_access_token, Message


class RegisterMaillable():
    def __init__(self) -> None:
        pass

    def send_mail(to=None, user_id=None) -> dict:

        token = create_access_token(user_id, expires_delta=False)

        msg = Message(
            subject="Welcome",
            body='http://127.0.0.1:3000/set-password?token='+token,
            sender="chinmay.mathakari@gmail.com",
            recipients=[to]
        )
        try:
            mail.send(message=msg)
            return {'message': 'Mail sent!', "status": True, "status_code": 400}
        except Exception as e:
            print(e)
            return {'message': 'Mail failed to send', "status": False, "status_code": 404}
