from flask import Blueprint, request
from app.config import supabase

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

    return {
        "message": "Task created",
        "data": response.data
    }