from flask import Blueprint, request
from app.config import supabase

users_bp = Blueprint("users", __name__)

@users_bp.route("/save-user", methods=["POST"])
def save_user():
    data = request.json

    response = supabase.table("users").upsert({
        "id": data["id"],
        "email": data["email"],
        "name": data["name"],
        "avatar_url": data["avatar_url"]
    }).execute()

    return {
        "message": "User saved",
        "data": response.data
    }

@users_bp.route("/users", methods=["GET"])
def get_users():
    response = supabase.table("users").select("*").execute()

    return {
        "data": response.data
    }