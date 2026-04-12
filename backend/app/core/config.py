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

    # Compliance agent provider settings.
    # To switch later to Minimax/Kimi, update AGENT_PROVIDER, AGENT_BASE_URL,
    # AGENT_API_KEY, AGENT_MODEL_CHEAP, AGENT_MODEL_COMPLEX in environment.
    agent_provider: str = Field(default_factory=lambda: os.getenv("AGENT_PROVIDER", "anthropic"))
    agent_api_key: str = Field(default_factory=lambda: os.getenv("AGENT_API_KEY", os.getenv("ANTHROPIC_API_KEY", "")))
    agent_base_url: str = Field(default_factory=lambda: os.getenv("AGENT_BASE_URL", ""))
    agent_model_cheap: str = Field(default_factory=lambda: os.getenv("AGENT_MODEL_CHEAP", "claude-haiku-4-5-20251001"))
    agent_model_complex: str = Field(default_factory=lambda: os.getenv("AGENT_MODEL_COMPLEX", "claude-sonnet-4-5"))
    supabase_url: str = Field(default_factory=lambda: os.getenv("SUPABASE_URL", ""))
    supabase_publishable_key: str = Field(default_factory=lambda: os.getenv("SUPABASE_PUBLISHABLE_KEY", ""))
    supabase_service_role_key: str = Field(default_factory=lambda: os.getenv("SUPABASE_SERVICE_ROLE_KEY", ""))
    allowed_origins: str = Field(default_factory=lambda: os.getenv("ALLOWED_ORIGINS", "http://localhost:3000"))
    allowed_hosts: str = Field(default_factory=lambda: os.getenv("ALLOWED_HOSTS", "localhost,127.0.0.1,testserver"))
    cors_allow_methods: str = Field(default_factory=lambda: os.getenv("CORS_ALLOW_METHODS", "GET,POST,PUT,PATCH,DELETE,OPTIONS"))
    cors_allow_headers: str = Field(default_factory=lambda: os.getenv("CORS_ALLOW_HEADERS", "Authorization,Content-Type,X-Request-ID"))
    max_request_size_bytes: int = Field(default_factory=lambda: int(os.getenv("MAX_REQUEST_SIZE_BYTES", "1048576")))
    security_headers_enabled: bool = Field(default_factory=lambda: os.getenv("SECURITY_HEADERS_ENABLED", "true").lower() == "true")
    hsts_enabled: bool = Field(default_factory=lambda: os.getenv("HSTS_ENABLED", "false").lower() == "true")
    hsts_max_age_seconds: int = Field(default_factory=lambda: int(os.getenv("HSTS_MAX_AGE_SECONDS", "63072000")))


settings = Settings()
