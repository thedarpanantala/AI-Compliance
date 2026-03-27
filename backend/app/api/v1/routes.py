"""Versioned REST API routes."""
from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session

from app.core.security import require_roles
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
from app.agent.compliance_agent import run_compliance_agent
from app.agent.standalone_agent import run_standalone_agent
from app.api.v1.evidence_sources import router as evidence_sources_router
from app.api.v1.reports import router as reports_router

router = APIRouter(prefix="/api")
router.include_router(evidence_sources_router, prefix="/evidence-sources", tags=["evidence-sources"])
router.include_router(reports_router, prefix="/reports", tags=["reports"])


@router.post("/ai-systems")
def register_ai_system(
    payload: AISystemCreate,
    request: Request,
    claims: dict = Depends(require_roles("owner", "admin", "risk_manager", "contributor")),
    db: Session = Depends(get_db),
) -> dict:
    system = AISystem(tenant_id=payload.org_id, **payload.model_dump(), framework_mappings={})
    db.add(system)
    write_audit_log(
        db=db,
        org_id=payload.org_id,
        user_id=claims.get("sub", "system"),
        action="create",
        entity="AISystem",
        resource_id=payload.id,
        before_data=None,
        after_data=payload.model_dump(),
        ip_address=request.client.host if request.client else None,
    )
    db.commit()
    return {"status": "created", "id": payload.id}


@router.get("/ai-systems")
def list_ai_systems(
    claims: dict = Depends(require_roles("owner", "admin", "risk_manager", "contributor", "viewer", "auditor")),
    db: Session = Depends(get_db),
) -> list[dict]:
    org_id = claims.get("org_id")
    rows = db.query(AISystem).filter(AISystem.org_id == org_id).all()
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
def attach_evidence(
    payload: EvidenceCreate,
    request: Request,
    claims: dict = Depends(require_roles("owner", "admin", "risk_manager", "contributor")),
    db: Session = Depends(get_db),
) -> dict:
    item = Evidence(tenant_id=payload.org_id, **payload.model_dump())
    db.add(item)
    write_audit_log(
        db=db,
        org_id=payload.org_id,
        user_id=claims.get("sub", "system"),
        action="create",
        entity="Evidence",
        resource_id=payload.id,
        before_data=None,
        after_data=payload.model_dump(),
        ip_address=request.client.host if request.client else None,
    )
    db.commit()
    return {"status": "attached", "id": payload.id}


@router.post("/compliance/assessments")
def create_assessment(
    payload: ComplianceAssessmentCreate,
    claims: dict = Depends(require_roles("owner", "admin", "risk_manager")),
    db: Session = Depends(get_db),
) -> dict:
    assessment = ComplianceAssessment(tenant_id=payload.org_id, **payload.model_dump())
    db.add(assessment)
    db.commit()
    return {"status": "created", "id": assessment.id, "requested_by": claims.get("sub")}


@router.post("/compliance/control-assessments")
def upsert_control_assessment(
    payload: ControlAssessmentUpsert,
    claims: dict = Depends(require_roles("owner", "admin", "risk_manager", "auditor")),
    db: Session = Depends(get_db),
) -> dict:
    row = db.query(ControlAssessment).filter(ControlAssessment.id == payload.id).first()
    if row is None:
        row = ControlAssessment(tenant_id=claims.get("org_id", "demo-org"), **payload.model_dump())
        db.add(row)
    else:
        row.status = payload.status
        row.notes = payload.notes
    db.commit()
    return {"status": "ok", "id": row.id}


@router.post("/compliance/run")
def run_compliance_scan(
    req: ComplianceRunRequest,
    claims: dict = Depends(require_roles("owner", "admin", "risk_manager", "auditor")),
    db: Session = Depends(get_db),
) -> dict:
    system = db.query(AISystem).filter(AISystem.id == req.ai_system_id).first()
    if system is None:
        raise HTTPException(status_code=404, detail="AI system not found")

    if system.org_id != claims.get("org_id"):
        raise HTTPException(status_code=403, detail="Cross-tenant access denied")

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


@router.post("/agent/chat")
async def agent_chat(payload: dict, db: Session = Depends(get_db)) -> dict:
    """Platform-embedded compliance agent endpoint."""
    result = await run_compliance_agent(
        user_message=payload["message"],
        org_id=payload["org_id"],
        system_id=payload.get("system_id"),
        conversation_history=payload.get("history", []),
        db=db,
        user_id=payload.get("user_id"),
    )
    return result


@router.post("/agent/standalone")
async def standalone_chat(payload: dict) -> dict:
    """Standalone public-facing compliance agent endpoint."""
    result = await run_standalone_agent(
        user_message=payload["message"],
        conversation_history=payload.get("history", []),
        uploaded_docs=payload.get("uploaded_docs"),
    )
    return result
