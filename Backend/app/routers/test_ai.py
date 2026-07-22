from fastapi import APIRouter
from app.services.openai_service import openai_service

router = APIRouter(prefix="/test", tags=["AI Test"])


@router.get("/openai")
def test_openai():
    try:
        response = openai_service.generate(
            "Say Hello from Aura AI in one sentence."
        )

        return {
            "success": True,
            "response": response
        }

    except Exception as e:
        import traceback

        traceback.print_exc()  # Terminal me full error print hoga

        return {
            "success": False,
            "error": str(e),
            "type": type(e).__name__
        }