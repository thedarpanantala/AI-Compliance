"""Artifact Engine and jurisdiction bridge APIs."""
from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.artifact_engine.services import (
    embed_audit_trail,
    extract_evidence,
    generate_llm_sections,
    persist_artifact,
    render_artifact,
    select_template,
    validate_artifact_output,
)
from app.core.security import require_roles
from app.db.session import get_db
from app.models.artifact_entities import ControlMapping
from app.schemas.artifact import GenerateArtifactRequest, GPCBSnapshotRequest, MapControlsRequest

router = APIRouter(prefix="/api", tags=["artifact-engine"])


@router.post("/generate-artifact")
def generate_artifact(
    payload: GenerateArtifactRequest,
    claims: dict = Depends(require_roles("owner", "admin", "risk_manager", "auditor")),
    db: Session = Depends(get_db),
) -> dict:
    evidence = extract_evidence(payload.evidence_bundle_id)
    metadata = {"system_id": payload.system_id, "monitoring_enabled": True}
    llm_output = generate_llm_sections(payload.template_id, evidence=evidence, metadata=metadata)
    validation = validate_artifact_output(payload.template_id, llm_output)
    audit_embed = embed_audit_trail(evidence)

    template_file = select_template(payload.template_id)
    rendered = render_artifact(
        template_file,
        {
            "request": payload.model_dump(),
            "metadata": metadata,
            "evidence": evidence,
            "llm": llm_output,
            "validation": validation,
            "audit": audit_embed,
        },
    )

    artifact = persist_artifact(
        db,
        org_id=claims.get("org_id", "demo-org"),
        request_data=payload.model_dump(),
        output_payload={"rendered_text": rendered, "llm": llm_output},
        validation_result=validation,
        audit_embed=audit_embed,
    )

    return {
        "artifact_id": artifact.id,
        "status": artifact.status,
        "template_id": payload.template_id,
        "validation": validation,
        "rendered_preview": rendered[:1200],
    }


@router.post("/map-controls")
def map_controls(
    payload: MapControlsRequest,
    claims: dict = Depends(require_roles("owner", "admin", "risk_manager", "auditor", "viewer")),
    db: Session = Depends(get_db),
) -> dict:
    mapping = (
        db.query(ControlMapping)
        .filter(ControlMapping.indian_control == payload.indian_control)
        .order_by(ControlMapping.confidence_score.desc())
        .first()
    )

    if not mapping:
        return {
            "indian_control": payload.indian_control,
            "target_jurisdiction": payload.target_jurisdiction,
            "mapped_controls": [],
            "transformation_instructions": ["No direct mapping found. Manual review required."],
        }

    equivalents = mapping.eu_equivalent if payload.target_jurisdiction.upper() == "EU" else mapping.us_equivalent
    return {
        "org_id": claims.get("org_id"),
        "indian_control": payload.indian_control,
        "target_jurisdiction": payload.target_jurisdiction,
        "mapped_controls": equivalents,
        "confidence_score": mapping.confidence_score,
        "transformation_instructions": [mapping.evidence_transform],
        "steps": mapping.transformation_steps,
    }


@router.post("/textile/gpcb-monthly-snapshot")
def gpcb_monthly_snapshot(
    payload: GPCBSnapshotRequest,
    claims: dict = Depends(require_roles("owner", "admin", "risk_manager", "contributor")),
    db: Session = Depends(get_db),
) -> dict:
    request = GenerateArtifactRequest(
        template_id="gpcb-monthly",
        system_id=payload.system_id,
        evidence_bundle_id=payload.evidence_bundle_id,
        jurisdiction="IN",
        target_audience="regulator",
    )
    result = generate_artifact(request, claims=claims, db=db)
    result["factory_site_id"] = payload.factory_site_id
    result["month"] = payload.month
    return result


@router.get("/healthcare/icmr-hitl-assessment/{system_id}")
def icmr_hitl_assessment(system_id: str) -> dict:
    return {
        "system_id": system_id,
        "assessment": "ICMR HITL draft generated",
        "required_sections": ["clinical oversight", "escalation", "post-deployment monitoring"],
    }


@router.get("/healthcare/bodh-readiness/{system_id}")
def bodh_readiness(system_id: str) -> dict:
    return {
        "system_id": system_id,
        "categories": ["data quality", "robustness", "clinical utility", "human oversight"],
        "status": "submission-package-draft",
    }


@router.post("/abdm-consent-bridge")
def abdm_consent_bridge(payload: dict) -> dict:
    return {
        "bridge_status": "mapped",
        "input": payload,
        "mapped_controls": ["DPDPA-Consent-Record-30days", "EUAI-Art10-Transparency"],
    }


@router.post("/textile/cs3d-buyer-report")
def cs3d_buyer_report(payload: dict) -> dict:
    return {
        "status": "draft-generated",
        "target": "EU buyer",
        "mapped_schema": "CS3D",
        "source": payload,
    }


@router.post("/esg-metric-calculator")
def esg_metric_calculator(payload: dict) -> dict:
    production_units = max(float(payload.get("production_units", 1)), 1.0)
    return {
        "water_per_unit": float(payload.get("water", 0)) / production_units,
        "energy_per_unit": float(payload.get("energy", 0)) / production_units,
        "waste_per_unit": float(payload.get("waste", 0)) / production_units,
    }
