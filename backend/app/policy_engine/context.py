"""Context builder for policy engine runs."""
from __future__ import annotations

from typing import Any

from sqlalchemy.orm import Session

from app.models.entities import AISystem, Evidence


def build_policy_context(db: Session, ai_system_id: str) -> dict[str, Any]:
    """Assemble canonical context object for control evaluation."""
    ai_system = db.query(AISystem).filter(AISystem.id == ai_system_id).first()
    evidence_rows = db.query(Evidence).filter(Evidence.ai_system_id == ai_system_id).all()

    evidence = [
        {
            "id": e.id,
            "source": e.source,
            "evidence_type": e.evidence_type,
            "payload": e.payload,
            "content_hash": e.content_hash,
            "is_locked": e.is_locked,
        }
        for e in evidence_rows
    ]

    return {
        "ai_system": {
            "id": ai_system.id if ai_system else ai_system_id,
            "org_id": ai_system.org_id if ai_system else "unknown",
            "name": ai_system.name if ai_system else None,
            "monitoring_enabled": bool(ai_system and ai_system.monitoring_enabled),
            "risk_tier": ai_system.risk_tier if ai_system else None,
            "system_type": ai_system.system_type if ai_system else None,
        },
        "evidence": evidence,
        "connector_results": {},
        "data_assets": [],
    }
