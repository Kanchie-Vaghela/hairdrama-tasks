import smtplib
import os

from email.message import EmailMessage

from dotenv import load_dotenv

load_dotenv()

EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")

def send_email(to, subject, body):

    msg = EmailMessage()

    msg["Subject"] = subject
    msg["From"] = EMAIL_USER
    msg["To"] = to

    msg.set_content(body)

    with smtplib.SMTP_SSL(
        "smtp.gmail.com",
        465
    ) as smtp:

        smtp.login(
            EMAIL_USER,
            EMAIL_PASS
        )

        smtp.send_message(msg)