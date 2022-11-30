from src.services.mail import Mail, os, SendGridAPIClient, create_access_token


class TeamRegisterMaillable():
    def __init__(self) -> None:
        pass

    def send_email(to=None, user_id=None) -> dict:
        Message = Mail(
            from_email=os.environ.get('FROM_EMAIL'),
            to_emails=to
        )
        token = create_access_token(
            {"id": user_id, "mail": to, "userFrom": "team"}, expires_delta=False)

        Message.dynamic_template_data = {
            "APP_NAME": os.environ.get('APP_NAME'),
            "validate_url": os.environ.get("FRONTEND_BASE_URL")+'set-password?token='+token
        }

        Message.template_id = 'd-1b384c97a4054c3a8e192867a26e15db'

        try:
            send_grid = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
            response = send_grid.send(Message)
            return {'message': 'Mail sent!', "status": True, "status_code": response.status_code}
        except Exception as e:
            print(e)
            return {'message': 'Mail failed to send', "status": False}
