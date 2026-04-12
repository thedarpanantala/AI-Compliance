"""Custom HTTP middleware for API security hardening."""
from __future__ import annotations

from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import JSONResponse, Response


class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    """Attach common SaaS-grade HTTP security headers."""

    def __init__(self, app, hsts_seconds: int = 63072000, enable_hsts: bool = False):
        super().__init__(app)
        self._hsts_seconds = hsts_seconds
        self._enable_hsts = enable_hsts

    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
        response.headers["Content-Security-Policy"] = "default-src 'self'; frame-ancestors 'none'; base-uri 'self'"
        if self._enable_hsts:
            response.headers["Strict-Transport-Security"] = f"max-age={self._hsts_seconds}; includeSubDomains"
        return response


class RequestSizeLimitMiddleware(BaseHTTPMiddleware):
    """Reject requests over configured size to reduce abuse risk."""

    def __init__(self, app, max_bytes: int = 1_048_576):
        super().__init__(app)
        self._max_bytes = max_bytes

    async def dispatch(self, request: Request, call_next) -> Response:
        content_length = request.headers.get("content-length")
        if content_length and int(content_length) > self._max_bytes:
            return JSONResponse(
                status_code=413,
                content={"detail": f"Payload too large. Max {self._max_bytes} bytes."},
            )
        return await call_next(request)
