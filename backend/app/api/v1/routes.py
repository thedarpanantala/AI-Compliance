"""Versioned REST API routes."""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.common import AISystemCreate, EvidenceCreate, ComplianceRunRequest
from app.models.entities import AISystem, Evidence
from app.services.audit import write_audit_log
from app.policy_engine.engine import evaluate_control

router = APIRouter(prefix="/api")


@router.post("/ai-systems")
def register_ai_system(payload: AISystemCreate, db: Session = Depends(get_db)) -> dict:
    system = AISystem(tenant_id="demo", **payload.model_dump(), framework_mappings={})
    db.add(system)
    db.commit()
    write_audit_log(db, "demo", "system", "create", "AISystem", payload.model_dump())
    return {"status": "created", "id": payload.id}


@router.get("/ai-systems")
def list_ai_systems(db: Session = Depends(get_db)) -> list[dict]:
    rows = db.query(AISystem).all()
    return [{"id": r.id, "name": r.name, "monitoring_enabled": r.monitoring_enabled} for r in rows]


@router.post("/evidence")
def attach_evidence(payload: EvidenceCreate, db: Session = Depends(get_db)) -> dict:
    item = Evidence(tenant_id="demo", **payload.model_dump())
    db.add(item)
    db.commit()
    write_audit_log(db, "demo", "system", "create", "Evidence", payload.model_dump())
    return {"status": "attached", "id": payload.id}


@router.post("/compliance/run")
def run_compliance_scan(req: ComplianceRunRequest, db: Session = Depends(get_db)) -> dict:
    system = db.query(AISystem).filter(AISystem.id == req.ai_system_id).first()
    records = db.query(Evidence).filter(Evidence.ai_system_id == req.ai_system_id).all()
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
    result = evaluate_control(
        yaml_control,
        metadata={"monitoring_enabled": bool(system and system.monitoring_enabled)},
        evidence=[{"evidence_type": e.evidence_type} for e in records],
    )
    return {
        "control_id": result.control_id,
        "passed": result.passed,
        "details": result.details,
        "framework": req.framework,
    }
