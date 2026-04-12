"""Artifact generation pipeline services."""
from __future__ import annotations

import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from jinja2 import Environment, FileSystemLoader, select_autoescape

from app.models.artifact_entities import GeneratedArtifact

TEMPLATE_DIR = Path(__file__).resolve().parents[2] / "templates" / "artifacts"


def extract_evidence(bundle_id: str) -> dict[str, Any]:
    """Mock extractor for OCR/PDF evidence into structured fields."""
    # Placeholder for Unstructured.io + Tesseract integration.
    return {
        "bundle_id": bundle_id,
        "effluent_ph": 7.2,
        "consent_expiry": "2026-12-31",
        "hitl_logs_present": True,
        "lab_report_ref": f"lab-{bundle_id}",
        "etp_runtime_hours": 132,
        "operator_training_records": "uploaded",
    }


def select_template(template_id: str) -> str:
    """Map template IDs to Jinja2 files."""
    mapping = {
        "eu-ai-act-annex-iv": "eu_ai_act_annex_iv.j2",
        "gpcb-monthly": "gpcb_monthly_summary.j2",
    }
    return mapping.get(template_id, "eu_ai_act_annex_iv.j2")


def generate_llm_sections(template_id: str, evidence: dict[str, Any], metadata: dict[str, Any]) -> dict[str, Any]:
    """Generate section drafts with LLM provider abstraction.

    Current implementation is deterministic stub with provider metadata.
    """
    gaps: list[str] = []
    if not evidence.get("hitl_logs_present"):
        gaps.append("Missing HITL logs for traceability")

    return {
        "provider": "claude-3.5-sonnet|llama3.1-fallback",
        "sections": {
            "risk_management": f"System {metadata['system_id']} has monitoring={metadata.get('monitoring_enabled', False)}.",
            "data_governance": "Evidence includes consent expiry and lab references for validation checks.",
            "human_oversight": "Human review checkpoints verified through HITL logs." if evidence.get("hitl_logs_present") else "HITL evidence missing.",
        },
        "gaps": gaps,
    }


def validate_artifact_output(template_id: str, payload: dict[str, Any]) -> dict[str, Any]:
    """Cross-check generated content against required control sections."""
    required = ["risk_management", "data_governance", "human_oversight"]
    missing = [section for section in required if section not in payload.get("sections", {})]
    return {
        "template_id": template_id,
        "passed": len(missing) == 0 and len(payload.get("gaps", [])) == 0,
        "missing_sections": missing,
        "reported_gaps": payload.get("gaps", []),
    }


def embed_audit_trail(evidence: dict[str, Any], approver: str = "pending-human-review") -> dict[str, Any]:
    """Embed evidence links, generation trace, and approval state."""
    return {
        "evidence_refs": [evidence.get("lab_report_ref"), evidence.get("bundle_id")],
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "approver": approver,
        "citations": ["LLM synthesis from extracted evidence and AI system metadata"],
    }


def render_artifact(template_file: str, context: dict[str, Any]) -> str:
    """Render Jinja2 artifact output (PDF/Word conversion can be layered later)."""
    env = Environment(
        loader=FileSystemLoader(str(TEMPLATE_DIR)),
        autoescape=select_autoescape(enabled_extensions=("html", "xml"), default=False),
    )
    template = env.get_template(template_file)
    return template.render(**context)


def persist_artifact(
    db,
    org_id: str,
    request_data: dict[str, Any],
    output_payload: dict[str, Any],
    validation_result: dict[str, Any],
    audit_embed: dict[str, Any],
) -> GeneratedArtifact:
    artifact = GeneratedArtifact(
        id=f"artifact_{uuid.uuid4().hex[:20]}",
        tenant_id=org_id,
        org_id=org_id,
        template_id=request_data["template_id"],
        system_id=request_data["system_id"],
        evidence_bundle_id=request_data["evidence_bundle_id"],
        jurisdiction=request_data["jurisdiction"],
        audience=request_data["target_audience"],
        status="approved" if validation_result.get("passed") else "draft",
        output_payload=output_payload,
        validation_result=validation_result,
        audit_embed=audit_embed,
    )
    db.add(artifact)
    db.commit()
    db.refresh(artifact)
    return artifact
