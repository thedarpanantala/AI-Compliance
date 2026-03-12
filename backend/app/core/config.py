"""Application configuration management."""
from __future__ import annotations

import os
from pathlib import Path

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


ENV_LOCAL = "local"


def get_secret(name: str, default: str | None = None) -> str:
    """Resolve secrets from local env or AWS SSM Parameter Store.

    Local/dev: reads plain environment variables.
    Non-local: attempts SSM and falls back to env/default.
    """
    env = os.getenv("ENV", ENV_LOCAL)
    if env == ENV_LOCAL:
        value = os.getenv(name, default)
        if value is None:
            raise RuntimeError(f"Missing required local secret: {name}")
        return value

    # Lazy import to avoid requiring boto3 in minimal local runs.
    try:
        import boto3

        region = os.getenv("AWS_REGION", "ap-south-1")
        param_path = f"/compliance-platform/{name}"
        client = boto3.client("ssm", region_name=region)
        response = client.get_parameter(Name=param_path, WithDecryption=True)
        return response["Parameter"]["Value"]
    except Exception:
        value = os.getenv(name, default)
        if value is None:
            raise RuntimeError(f"Missing required secret: {name}")
        return value


class Settings(BaseSettings):
    """Runtime settings loaded from env/secret sources."""

    model_config = SettingsConfigDict(
        env_file=str(Path(__file__).resolve().parents[2] / ".env"),
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    app_name: str = "AI Compliance Platform"
    env: str = Field(default=ENV_LOCAL)
    deployment_mode: str = Field(default="cloud_multi_tenant")
    database_url: str = Field(default_factory=lambda: get_secret("DATABASE_URL", "sqlite+pysqlite:///:memory:"))
    jwt_secret: str = Field(default_factory=lambda: get_secret("JWT_SECRET", "dev-secret"))
    field_encryption_key: str = Field(
        default_factory=lambda: get_secret(
            "FIELD_ENCRYPTION_KEY", "Klm06WrWmkxqKtYDLQbFJ9n2Ulo53ITeGUmCWhOe91Y="
        )
    )
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60
    api_rate_limit_per_minute: int = 60


settings = Settings()
