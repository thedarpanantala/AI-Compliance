"""Audit logging service."""
import hashlib
import json
from datetime import datetime
from sqlalchemy.orm import Session
from app.models.entities import AuditLog


def write_audit_log(
    db: Session,
    tenant_id: str,
    user_id: str,
    action: str,
    entity: str,
    change_set: dict,
) -> AuditLog:
    """Write immutable audit event using deterministic hash."""
    payload = {
        "tenant_id": tenant_id,
        "user_id": user_id,
        "action": action,
        "entity": entity,
        "change_set": change_set,
        "timestamp": datetime.utcnow().isoformat(),
    }
    immutable_hash = hashlib.sha256(json.dumps(payload, sort_keys=True).encode()).hexdigest()
    event = AuditLog(
        id=f"audit_{immutable_hash[:12]}",
        tenant_id=tenant_id,
        user_id=user_id,
        action=action,
        entity=entity,
        change_set=change_set,
        immutable_hash=immutable_hash,
    )
    db.add(event)
    db.commit()
    db.refresh(event)
    return event
