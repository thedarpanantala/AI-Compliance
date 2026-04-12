import logging
from typing import List, Dict, Any
from datetime import datetime
from sqlalchemy.orm import Session
from app.models.entities import ExportRecord, RequirementChecklist, ComplianceRule

logger = logging.getLogger(__name__)

class ExportRulesService:
    """Regulatory Intelligence for Global Export Compliance."""

    def __init__(self, db: Session):
        self.db = db

    def get_rules_for_country(self, country_code: str) -> List[Dict[str, Any]]:
        """Retrieves mandatory document requirements for a specific destination."""
        rules = {
            "UK": [
                {"type": "UKCA", "name": "UK Conformity Assessed", "mandatory": True},
                {"type": "Commercial Invoice", "mandatory": True},
                {"type": "Packing List", "mandatory": True}
            ],
            "US": [
                {"type": "FDA Registration", "name": "US FDA Food Facility", "mandatory": True},
                {"type": "Prior Notice", "mandatory": True}
            ],
            "EU": [
                {"type": "CE Marking", "name": "Conformité Européenne", "mandatory": True},
                {"type": "EORI Number", "mandatory": True}
            ]
        }
        return rules.get(country_code.upper(), [])

    async def validate_shipment_completeness(self, shipment_id: str) -> Dict[str, Any]:
        """Checks if all mandatory documents are present and valid."""
        shipment = self.db.query(ExportRecord).filter(ExportRecord.id == shipment_id).first()
        if not shipment:
            return {"error": "Shipment not found"}

        rules = self.get_rules_for_country(shipment.destination_country)
        checklist = self.db.query(RequirementChecklist).filter(RequirementChecklist.export_record_id == shipment_id).all()
        
        completed_docs = [c.document_type for c in checklist if c.is_completed]
        missing_docs = [r["type"] for r in rules if r["type"] not in completed_docs]
        
        compliance_score = (len(completed_docs) / len(rules)) if rules else 1.0
        
        return {
            "shipment_id": shipment_id,
            "destination": shipment.destination_country,
            "compliance_score": round(compliance_score, 2),
            "missing_documents": missing_docs,
            "is_ready_for_export": len(missing_docs) == 0,
            "benefit_tracking": {
                "gst_refund_status": shipment.gst_status or "pending",
                "lut_active": True # Mocked validation
            }
        }

    def get_msme_compliance_calendar(self, org_id: str) -> List[Dict[str, Any]]:
        """Returns recurring renewal dates for MSME-specific export licenses."""
        return [
            {"item": "Spice Board RCMC Renewal", "due_date": "2026-04-01", "status": "critical"},
            {"item": "FSSAI Export Licence", "due_date": "2026-05-15", "status": "upcoming"},
            {"item": "GST LUT Filing (FY 2026-27)", "due_date": "2026-03-31", "status": "due_now"}
        ]
