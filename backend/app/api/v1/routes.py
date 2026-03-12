"""Versioned REST API routes."""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.entities import AISystem, ComplianceAssessment, ControlAssessment, Evidence
from app.policy_engine.context import build_policy_context
from app.policy_engine.engine import evaluate_control
from app.schemas.common import (
    AISystemCreate,
    ComplianceAssessmentCreate,
    ComplianceRunRequest,
    ControlAssessmentUpsert,
    EvidenceCreate,
)
from app.services.audit import write_audit_log

router = APIRouter(prefix="/api")


@router.post("/ai-systems")
def register_ai_system(payload: AISystemCreate, db: Session = Depends(get_db)) -> dict:
    system = AISystem(tenant_id=payload.org_id, **payload.model_dump(), framework_mappings={})
    db.add(system)
    db.commit()
    write_audit_log(db, payload.org_id, "system", "create", "AISystem", payload.model_dump())
    return {"status": "created", "id": payload.id}


@router.get("/ai-systems")
def list_ai_systems(db: Session = Depends(get_db)) -> list[dict]:
    rows = db.query(AISystem).all()
    return [
        {
            "id": row.id,
            "org_id": row.org_id,
            "name": row.name,
            "risk_tier": row.risk_tier,
            "monitoring_enabled": row.monitoring_enabled,
        }
        for row in rows
    ]


@router.post("/evidence")
def attach_evidence(payload: EvidenceCreate, db: Session = Depends(get_db)) -> dict:
    item = Evidence(tenant_id=payload.org_id, **payload.model_dump())
    db.add(item)
    db.commit()
    write_audit_log(db, payload.org_id, "system", "create", "Evidence", payload.model_dump())
    return {"status": "attached", "id": payload.id}


@router.post("/compliance/assessments")
def create_assessment(payload: ComplianceAssessmentCreate, db: Session = Depends(get_db)) -> dict:
    assessment = ComplianceAssessment(tenant_id=payload.org_id, **payload.model_dump())
    db.add(assessment)
    db.commit()
    return {"status": "created", "id": assessment.id}


@router.post("/compliance/control-assessments")
def upsert_control_assessment(payload: ControlAssessmentUpsert, db: Session = Depends(get_db)) -> dict:
    row = db.query(ControlAssessment).filter(ControlAssessment.id == payload.id).first()
    if row is None:
        row = ControlAssessment(tenant_id="demo-org", **payload.model_dump())
        db.add(row)
    else:
        row.status = payload.status
        row.notes = payload.notes
    db.commit()
    return {"status": "ok", "id": row.id}


@router.post("/compliance/run")
def run_compliance_scan(req: ComplianceRunRequest, db: Session = Depends(get_db)) -> dict:
    system = db.query(AISystem).filter(AISystem.id == req.ai_system_id).first()
    if system is None:
        raise HTTPException(status_code=404, detail="AI system not found")

    yaml_control = """
control:
  id: EUAI-HR-001
  title: High Risk AI must have monitoring
  framework: EU_AI_ACT

tests:
  - type: metadata_check
    field: monitoring_enabled
    operator: equals
    value: true
  - type: evidence_exists
    evidence_type: validation_study
"""
    context = build_policy_context(db, req.ai_system_id)
    result = evaluate_control(yaml_control, context=context)
    return {
        "control_id": result.control_id,
        "passed": result.passed,
        "details": result.details,
        "framework": req.framework,
        "context_summary": {
            "evidence_count": len(context["evidence"]),
            "risk_tier": context["ai_system"].get("risk_tier"),
        },
    }
