import uuid
import logging
from datetime import datetime
from typing import List, Dict, Any, Optional
from sqlalchemy.orm import Session
from app.models.entities import Workflow, Task, WorkflowTemplate, Organization

logger = logging.getLogger(__name__)

class WorkflowEngine:
    """
    Core Automation Engine for Industry-Specific Compliance Workflows.
    Handles template orchestration, task generation, and automated decisioning.
    """

    def __init__(self, db: Session):
        self.db = db

    async def trigger_workflow(self, org_id: str, template_code: str, context: Optional[Dict] = None) -> Workflow:
        """
        Kicks off a workflow instance based on a template code.
        """
        template = self.db.query(WorkflowTemplate).filter(WorkflowTemplate.template_code == template_code).first()
        if not template:
            # Fallback to default presets if not found in DB
            template = self._get_preset_template(template_code)
            if not template:
                raise ValueError(f"Workflow template {template_code} not found.")

        # Create Workflow Instance
        workflow_id = str(uuid.uuid4())
        workflow = Workflow(
            id=workflow_id,
            org_id=org_id,
            name=f"{template['name']} - {datetime.now().strftime('%b %Y')}",
            status="active"
        )
        self.db.add(workflow)

        # Generate Tasks for the first step
        first_step = template['steps'][0] if template['steps'] else None
        if first_step:
            await self._create_task_for_step(org_id, workflow_id, first_step, context)

        self.db.commit()
        logger.info(f"Triggered workflow {workflow_id} for org {org_id} using template {template_code}")
        return workflow

    async def _create_task_for_step(self, org_id: str, workflow_id: str, step: Dict, context: Optional[Dict] = None):
        """
        Internal helper to create a Task entity from a workflow step definition.
        """
        task = Task(
            id=str(uuid.uuid4()),
            org_id=org_id,
            workflow_id=workflow_id,
            title=step['title'],
            task_type=step.get('type', 'manual'),
            status="open",
            priority=step.get('priority', 'medium'),
            form_data={
                "instructions": step.get('description', ''),
                "required_fields": step.get('fields', []),
                "context": context or {}
            }
        )
        self.db.add(task)

    def _get_preset_template(self, code: str) -> Optional[Dict]:
        """
        Industry-specific workflow blueprints (Presets).
        """
        presets = {
            "TEXTILE_MONTHLY": {
                "name": "Textile Monthly Environmental Review",
                "industry": "Textile",
                "steps": [
                    {"title": "Verify Chemical Inventory (ZDHC)", "type": "checklist", "priority": "high"},
                    {"title": "Upload ETP Logbook (Pollution Control)", "type": "upload", "priority": "high"},
                    {"title": "Run AI Anomaly Detection on Water Discharge", "type": "automated", "priority": "medium"}
                ]
            },
            "HEALH_CLINICAL_VAL": {
                "name": "Healthcare AI Clinical Validation",
                "industry": "Healthcare",
                "steps": [
                    {"title": "Determine IRB Requirement", "type": "form", "priority": "high"},
                    {"title": "N-Patient Bias Assessment", "type": "automated", "priority": "critical"},
                    {"title": "Generate Performance Summary (for CDSCO)", "type": "document_gen", "priority": "high"}
                ]
            },
            "CHEM_SPILL_RESPONSE": {
                "name": "Chemical Spill Emergency Response",
                "industry": "Chemical",
                "steps": [
                    {"title": "Identify Substance (MSDS Check)", "type": "form", "priority": "critical"},
                    {"title": "Notify State Pollution Board", "type": "automated_email", "priority": "critical"},
                    {"title": "Evidence Collection (Photo/Log)", "type": "upload", "priority": "high"}
                ]
            }
        }
        return presets.get(code)

    async def progress_workflow(self, task_id: str):
        """
        Logic to move to the next step when a task is completed.
        """
        task = self.db.query(Task).filter(Task.id == task_id).first()
        if not task or not task.workflow_id:
            return

        # Check if all tasks for the current step are done
        # (Simplified: one task per step for now)
        workflow = self.db.query(Workflow).filter(Workflow.id == task.workflow_id).first()
        # Find next step logic here...
        pass
