from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    OPENAI_API_KEY: str
    OPENAI_MODEL: str = "gpt-5.5"

    class Config:
        env_file = ".env"


settings = Settings()

print("API Key:", settings.OPENAI_API_KEY[:10] + "...")
print("Model:", settings.OPENAI_MODEL)