"""Pydantic API schemas."""
from typing import Any

from pydantic import BaseModel, Field


class AISystemCreate(BaseModel):
    id: str = Field(..., description="External or generated system ID")
    org_id: str = Field(default="demo-org")
    name: str
    description: str | None = None
    system_type: str | None = None
    risk_tier: str | None = None
    monitoring_enabled: bool = False


class EvidenceCreate(BaseModel):
    id: str
    org_id: str = "demo-org"
    ai_system_id: str | None = None
    title: str | None = None
    source: str
    evidence_type: str
    payload: dict[str, Any] = Field(default_factory=dict)


class ComplianceRunRequest(BaseModel):
    ai_system_id: str
    framework: str


class ComplianceAssessmentCreate(BaseModel):
    id: str
    org_id: str = "demo-org"
    ai_system_id: str
    framework: str
    name: str


class ControlAssessmentUpsert(BaseModel):
    id: str
    assessment_id: str
    control_id: str
    status: str = "not_assessed"
    notes: str | None = None
