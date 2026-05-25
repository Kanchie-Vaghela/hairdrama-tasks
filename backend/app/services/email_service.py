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

        with smtplib.SMTP(
            "smtp.gmail.com",
            587,
            timeout=10
        ) as server:

            server.starttls()

            server.login(
                EMAIL_USER,
                EMAIL_PASS
            )

            server.send_message(msg)

        print("EMAIL SENT SUCCESSFULLY")

    except Exception as e:

        print("EMAIL FAILED:", str(e))