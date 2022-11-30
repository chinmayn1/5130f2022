from datetime import datetime, timedelta
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from flask_jwt_extended import create_access_token
import os
from flask_mail import Mail, Message

mail=Mail()