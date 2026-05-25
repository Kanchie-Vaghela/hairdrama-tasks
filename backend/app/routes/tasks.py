from flask import Blueprint, request
from app.config import supabase
from app.services.email_service import send_email

tasks_bp = Blueprint("tasks", __name__)

@tasks_bp.route("/tasks", methods=["GET"])
def get_tasks():
    response = supabase.table("tasks").select("*").execute()

    return {
        "data": response.data
    }

@tasks_bp.route("/tasks", methods=["POST"])
def create_task():

    data = request.json

    response = supabase.table("tasks").insert({
        "title": data["title"],
        "description": data["description"],
        "created_by": data["created_by"],
        "assigned_to": data["assigned_to"]
    }).execute()

    assigned_user = supabase.table("users").select(
        "*"
    ).eq(
        "id",
        data["assigned_to"]
    ).single().execute()

    send_email(
        assigned_user.data["email"],
        "New Task Assigned",
        f"""
You have been assigned a new task.

Title:
{data["title"]}

Description:
{data["description"]}
"""
    )

    return {
        "message": "Task created",
        "data": response.data
    }

@tasks_bp.route("/tasks/<task_id>/complete", methods=["PATCH"])
def complete_task(task_id):

    existing_task = supabase.table(
        "tasks"
    ).select(
        "*"
    ).eq(
        "id",
        task_id
    ).single().execute()

    response = supabase.table(
        "tasks"
    ).update({
        "status": "completed"
    }).eq(
        "id",
        task_id
    ).execute()

    creator = supabase.table(
        "users"
    ).select(
        "*"
    ).eq(
        "id",
        existing_task.data["created_by"]
    ).single().execute()

    send_email(
        creator.data["email"],
        "Task Completed",
        f"""
Your task has been completed.

Title:
{existing_task.data["title"]}

Description:
{existing_task.data["description"]}
"""
    )

    return {
        "message": "Task completed",
        "data": response.data
    }