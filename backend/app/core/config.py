"""Application configuration management."""
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Runtime settings loaded from env variables."""

    app_name: str = "AI Compliance Platform"
    database_url: str
    jwt_secret: str
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60

    class Config:
        env_file = ".env"


settings = Settings()
