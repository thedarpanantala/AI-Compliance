from typing import List, Dict, Any
import uuid
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel

from app.models.entities import EvidenceSource
from app.core.security import require_roles

router = APIRouter()

class EvidenceSourceCreate(BaseModel):
    name: str
    source_type: str
    config: Dict[str, Any]
    credentials: Dict[str, Any]
    schedule: str | None = None

class EvidenceSourceResponse(BaseModel):
    id: str
    name: str
    source_type: str
    is_active: bool
    last_run: datetime | None = None
    last_success: datetime | None = None
    
    class Config:
        from_attributes = True

@router.post("/", response_model=EvidenceSourceResponse)
async def create_evidence_source(
    source: EvidenceSourceCreate,
    claims: dict = Depends(require_roles("owner", "admin", "risk_manager"))
):
    # This is a stub implementation. In a real app, you would use Dependency Injection for the DB session.
    # We would encrypt credentials before saving.
    return {
        "id": str(uuid.uuid4()),
        "name": source.name,
        "source_type": source.source_type,
        "is_active": True
    }

@router.get("/", response_model=List[EvidenceSourceResponse])
async def list_evidence_sources():
    # Stub returning empty list
    return []

@router.post("/{source_id}/test")
async def test_evidence_source(source_id: str):
    return {"status": "success", "message": "Connection successful"}

@router.post("/{source_id}/sync")
async def sync_evidence_source(source_id: str):
    return {"status": "success", "job_id": str(uuid.uuid4())}
