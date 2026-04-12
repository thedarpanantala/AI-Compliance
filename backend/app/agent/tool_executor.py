"""Executes agent tool calls against the real database."""
from __future__ import annotations

import uuid

from sqlalchemy.orm import Session

from app.models.entities import AISystem, ComplianceAssessment, Control, ControlAssessment, Evidence, Task
from app.policy_engine.context import build_policy_context
from app.policy_engine.engine import evaluate_control


async def execute_tool(
    name: str,
    params: dict,
    org_id: str,
    default_system_id: str | None,
    db: Session,
) -> dict:
    """Execute a single agent tool call."""
    sid = params.get("system_id", default_system_id)

    if name == "get_ai_system":
        system = db.query(AISystem).filter(AISystem.id == sid, AISystem.org_id == org_id).first()
        if not system:
            return {"error": "System not found"}
        return {
            "id": system.id,
            "name": system.name,
            "status": system.status,
            "risk_tier": system.risk_tier,
            "system_type": system.system_type,
            "metadata": system.metadata_ or {},
            "summary": f"Fetched {system.name} — risk tier: {system.risk_tier}",
        }

    if name == "list_evidence":
        items = db.query(Evidence).filter(Evidence.ai_system_id == sid, Evidence.org_id == org_id).all()
        evidence_type = params.get("evidence_type")
        if evidence_type:
            items = [item for item in items if item.evidence_type == evidence_type]
        return {
            "count": len(items),
            "items": [
                {
                    "id": item.id,
                    "title": item.title,
                    "type": item.evidence_type,
                    "tags": (item.metadata_ or {}).get("inferred_tags", []),
                    "locked": item.is_locked,
                }
                for item in items
            ],
            "summary": f"Found {len(items)} evidence items",
        }

    if name == "get_control_status":
        assessment = (
            db.query(ComplianceAssessment)
            .filter(ComplianceAssessment.ai_system_id == sid, ComplianceAssessment.org_id == org_id)
            .order_by(ComplianceAssessment.created_at.desc())
            .first()
        )
        if not assessment:
            return {"summary": "No compliance assessment found. Run a check first.", "results": []}

        rows = (
            db.query(ControlAssessment, Control)
            .join(Control, ControlAssessment.control_id == Control.id)
            .filter(ControlAssessment.assessment_id == assessment.id)
            .all()
        )
        results = [
            {
                "control_code": control.code,
                "control_title": control.title,
                "framework": control.framework,
                "status": control_assessment.status,
                "notes": control_assessment.notes,
            }
            for control_assessment, control in rows
        ]
        failing = [row for row in results if row["status"] in {"non_compliant", "fail", "failed"}]
        return {
            "assessment_id": assessment.id,
            "score": float(assessment.score or 0),
            "total": len(results),
            "failing": len(failing),
            "results": results,
            "summary": f"Score: {assessment.score}% — {len(failing)} controls failing",
        }

    if name == "create_task":
        task = Task(
            id=f"task_{uuid.uuid4().hex[:20]}",
            tenant_id=org_id,
            org_id=org_id,
            ai_system_id=params.get("ai_system_id", sid),
            title=params["title"],
            task_type=params.get("task_type", "remediation"),
            priority=params.get("priority", "medium"),
            status="open",
            form_data={"agent_created": True, "description": params.get("description", "")},
        )
        db.add(task)
        db.commit()
        db.refresh(task)
        return {"task_id": task.id, "summary": f"Created task: {task.title}"}

    if name == "attach_evidence_draft":
        evidence = Evidence(
            id=f"evidence_{uuid.uuid4().hex[:20]}",
            tenant_id=org_id,
            org_id=org_id,
            ai_system_id=params.get("ai_system_id", sid),
            title=f"[DRAFT] {params['title']}",
            description="Agent-generated draft — review before locking",
            evidence_type=params.get("evidence_type", "document"),
            source="agent",
            payload={"draft_content": params["content"]},
            metadata_={"inferred_tags": ["agent_draft", "pending_review"]},
            is_locked=False,
        )
        db.add(evidence)
        db.commit()
        db.refresh(evidence)
        return {"evidence_id": evidence.id, "summary": f"Draft saved: {params['title']}"}

    if name == "search_controls":
        query_text = params["query"].lower()
        framework_filter = params.get("framework")

        query_stmt = db.query(Control).filter(Control.is_active.is_(True))
        if framework_filter:
            query_stmt = query_stmt.filter(Control.framework == framework_filter)

        controls = query_stmt.limit(100).all()
        matching = [
            control
            for control in controls
            if query_text in (control.title or "").lower() or query_text in (control.description or "").lower()
        ][:5]

        return {
            "count": len(matching),
            "controls": [
                {"code": control.code, "title": control.title, "framework": control.framework}
                for control in matching
            ],
            "summary": f"Found {len(matching)} matching controls",
        }

    if name == "run_compliance_check":
        yaml_control = """
control:
  id: AGENT-001
  title: Monitoring should be enabled
  framework: INTERNAL

tests:
  - type: metadata_check
    field: monitoring_enabled
    operator: equals
    value: true
"""
        context = build_policy_context(db, sid)
        result = evaluate_control(yaml_control, context)
        return {
            "passed": result.passed,
            "details": result.details,
            "summary": "Compliance check triggered through policy engine",
        }

    if name == "generate_document":
        from app.services.document_service import DocumentAIService
        service = DocumentAIService(db)
        doc = await service.generate_document(
            org_id=org_id,
            template_code=params["template_code"],
            user_inputs=params["inputs"]
        )
        return {
            "document_id": doc.id,
            "file_url": doc.file_url,
            "summary": f"Artifact {params['template_code']} generated successfully. View it in the Vault."
        }

    return {"error": f"Unknown tool: {name}"}
