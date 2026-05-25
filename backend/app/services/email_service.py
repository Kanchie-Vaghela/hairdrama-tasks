import smtplib
import os

from email.message import EmailMessage

EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")


def send_email(to, subject, body):

    try:

        msg = EmailMessage()

        msg["Subject"] = subject
        msg["From"] = EMAIL_USER
        msg["To"] = to

        msg.set_content(body)

        server = smtplib.SMTP(
            "smtp.gmail.com",
            587
        )

        server.starttls()

        server.login(
            EMAIL_USER,
            EMAIL_PASS
        )

        server.send_message(msg)

        server.quit()

        print("EMAIL SENT")

    except Exception as e:
        print("EMAIL ERROR:", e)