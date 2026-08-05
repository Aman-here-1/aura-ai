import os
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    OPENAI_API_KEY: str
    OPENAI_MODEL: str = "gpt-5.5"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
    )


print("Current Working Directory:", os.getcwd())
print(".env exists:", os.path.exists(".env"))

settings = Settings()

print("API Key Loaded:", settings.OPENAI_API_KEY[:10] + "...")
print("Model:", settings.OPENAI_MODEL)