"""FastAPI application entrypoint."""
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from starlette.middleware.trustedhost import TrustedHostMiddleware

from app.api.v1.routes import router as api_router
from app.api.v1.artifact_routes import router as artifact_router
from app.core.config import settings
from app.core.middleware import RequestSizeLimitMiddleware, SecurityHeadersMiddleware

def client_ip_key_func(request: Request) -> str:
    """Resolve client IP with proxy-aware flexibility for Cloudflare/other CDNs."""
    if settings.trust_proxy_headers:
        forwarded = request.headers.get(settings.client_ip_header)
        if forwarded:
            return forwarded.split(",")[0].strip()
        xff = request.headers.get("x-forwarded-for")
        if xff:
            return xff.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


limiter = Limiter(key_func=client_ip_key_func, default_limits=[f"{settings.api_rate_limit_per_minute}/minute"])

app = FastAPI(title=settings.app_name, version="1.2.1")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in settings.allowed_origins.split(",") if origin.strip()],
    allow_credentials=True,
    allow_methods=[method.strip() for method in settings.cors_allow_methods.split(",") if method.strip()],
    allow_headers=[header.strip() for header in settings.cors_allow_headers.split(",") if header.strip()],
)
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=[host.strip() for host in settings.allowed_hosts.split(",") if host.strip()],
)
app.add_middleware(RequestSizeLimitMiddleware, max_bytes=settings.max_request_size_bytes)
if settings.security_headers_enabled:
    app.add_middleware(
        SecurityHeadersMiddleware,
        hsts_seconds=settings.hsts_max_age_seconds,
        enable_hsts=settings.hsts_enabled,
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
        "security_headers_enabled": settings.security_headers_enabled,
        "trusted_hosts": [host.strip() for host in settings.allowed_hosts.split(",") if host.strip()],
        "max_request_size_bytes": settings.max_request_size_bytes,
        "waf_provider": settings.waf_provider,
        "client_ip_header": settings.client_ip_header,
    }
    return JSONResponse(payload)
