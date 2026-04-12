"""FastAPI application entrypoint."""
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

from app.api.v1.routes import router as api_router
from app.api.v1.artifact_routes import router as artifact_router
from app.core.config import settings

limiter = Limiter(key_func=get_remote_address, default_limits=[f"{settings.api_rate_limit_per_minute}/minute"])

app = FastAPI(title=settings.app_name, version="1.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in settings.allowed_origins.split(",") if origin.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.include_router(api_router)
app.include_router(artifact_router)


@app.get("/health")
@limiter.limit("120/minute")
def health(request: Request) -> dict:
    """Health check endpoint."""
    return {"status": "ok", "deployment_mode": settings.deployment_mode, "env": settings.env}


@app.get("/security/posture")
@limiter.limit("30/minute")
def security_posture(request: Request) -> JSONResponse:
    """Expose non-sensitive security posture metadata for operations checks."""
    payload = {
        "jwt_enabled": True,
        "field_encryption_enabled": bool(settings.field_encryption_key),
        "rate_limit_per_minute": settings.api_rate_limit_per_minute,
        "deployment_mode": settings.deployment_mode,
    }
    return JSONResponse(payload)
