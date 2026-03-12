"""FastAPI application entrypoint."""
from fastapi import FastAPI
from app.core.config import settings
from app.api.v1.routes import router as api_router

app = FastAPI(title=settings.app_name, version="1.0.0")
app.include_router(api_router)


@app.get("/health")
def health() -> dict:
    """Health check endpoint."""
    return {"status": "ok"}
