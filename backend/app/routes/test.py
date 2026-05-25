from flask import Blueprint
from app.config import supabase

test_bp = Blueprint("test", __name__)

@test_bp.route("/test-db")
def test_db():
    response = supabase.table("tasks").select("*").execute()

    return {
        "data": response.data
    }