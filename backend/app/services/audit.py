"""Audit logging service with tamper-evident hash chaining."""
from __future__ import annotations

import hashlib
import json
import uuid
from datetime import datetime, timezone

from sqlalchemy import desc
from sqlalchemy.orm import Session

from app.models.entities import AuditLog


def compute_audit_hash(
    prev_hash: str,
    user_id: str,
    action: str,
    resource_id: str | None,
    change_set: dict,
    timestamp: str,
) -> str:
    """Compute immutable hash for an audit entry chained to the previous entry."""
    payload = {
        "prev": prev_hash,
        "user": user_id,
        "action": action,
        "resource": resource_id,
        "changes": change_set,
        "ts": timestamp,
    }
    canonical = json.dumps(payload, sort_keys=True, separators=(",", ":"))
    return hashlib.sha256(canonical.encode()).hexdigest()


def write_audit_log(
    db: Session,
    org_id: str,
    user_id: str,
    action: str,
    entity: str,
    resource_id: str | None,
    before_data: dict | None,
    after_data: dict | None,
    ip_address: str | None,
) -> AuditLog:
    """Create an append-only audit event without committing transaction."""
    last = (
        db.query(AuditLog)
        .filter(AuditLog.org_id == org_id)
        .order_by(desc(AuditLog.created_at), desc(AuditLog.id))
        .first()
    )
    prev_hash = last.immutable_hash if last else "genesis"

    timestamp = datetime.now(timezone.utc).isoformat()
    change_set = after_data or {}
    immutable_hash = compute_audit_hash(prev_hash, user_id, action, resource_id, change_set, timestamp)

    event = AuditLog(
        id=f"audit_{uuid.uuid4().hex[:20]}",
        tenant_id=org_id,
        org_id=org_id,
        user_id=user_id,
        action=action,
        entity=entity,
        resource_id=resource_id,
        change_set=change_set,
        before_data=before_data,
        after_data=after_data,
        immutable_hash=immutable_hash,
        ip_address=ip_address,
    )
    db.add(event)
    return event
