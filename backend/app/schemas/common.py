"""Pydantic API schemas."""
from pydantic import BaseModel, Field
from typing import Any


class AISystemCreate(BaseModel):
    id: str = Field(..., description="External or generated system ID")
    name: str
    description: str
    monitoring_enabled: bool = False


class EvidenceCreate(BaseModel):
    id: str
    ai_system_id: str
    source: str
    evidence_type: str
    payload: dict[str, Any]


class ComplianceRunRequest(BaseModel):
    ai_system_id: str
    framework: str
