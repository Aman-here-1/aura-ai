from openai import OpenAI
from app.core.config import settings


class OpenAIService:

    def __init__(self):
        self.client = OpenAI(
            api_key=settings.OPENAI_API_KEY
        )

    def generate(self, prompt: str) -> str:
        response = self.client.responses.create(
            model=settings.OPENAI_MODEL,
            input=prompt
        )

        return response.output_text


openai_service = OpenAIService()