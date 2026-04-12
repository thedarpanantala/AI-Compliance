import uuid
import logging
from typing import List, Optional
from sqlalchemy.orm import Session
from app.models.entities import ExportShipment, ComplianceRule

logger = logging.getLogger(__name__)

# Regulatory benchmarks for MSME Exports
REGULATORY_MAP = {
    "UK": {
        "rules": ["UKCA marking verification", "Commercial Invoice matching"],
        "mandatory_docs": ["Commercial Invoice", "Packing List", "Bill of Lading", "Certificate of Origin"]
    },
    "US": {
        "rules": ["FDA Registration check", "Customs Bond validation"],
        "mandatory_docs": ["Commercial Invoice", "Packing List", "FDA-2877", "Bill of Lading"]
    },
    "EU": {
        "rules": ["CE Marking check", "VAT Moss compliance"],
        "mandatory_docs": ["Commercial Invoice", "Packing List", "EUR.1 Certificate", "Bill of Lading"]
    }
}

class ExportComplianceAgent:
    """Export Compliance Automation Agent for Manufacturing MSMEs."""
    
    def __init__(self, db: Session):
        self.db = db

    def calculate_export_compliance_path(self, org_id: str, target_country: str) -> dict:
        """
        Calculates the mandatory steps to transition from Indian domestic compliance 
        to international market standards (Global Bridge).
        """
        # 1. Load Organization Industry and current Licenses
        org_licences = self.db.query(OrganizationLicence).filter(OrganizationLicence.organization_id == org_id).all()
        org = self.db.query(Organization).filter(Organization.id == org_id).first()
        
        # 2. Map Indian License -> International Equivalent
        # Placeholder for complex recursive logic defined in test_scenarios.md
        mapping_logic = {
            "Medical Device": {
                "IN": ["CDSCO Manufacturing Licence"],
                "EU": ["CE MDR (Regulation 2017/745)", "ISO 13485:2016"],
                "US": ["FDA 510(k) Clearance", "FDA QSR (21 CFR 820)"]
            },
            "Manufacturing": {
                "IN": ["BIS Certification"],
                "EU": ["CE Marking (Relevant Directives)"],
                "US": ["UL Certification", "OSHA Compliance"]
            }
        }

        industry_rules = mapping_logic.get(org.industry, {})
        requirements = industry_rules.get(target_country.upper(), [])
        
        # 3. Calculate Gaps
        steps = []
        for req in requirements:
            steps.append({
                "requirement": req,
                "status": "pending",
                "estimated_time": "3-6 months",
                "estimated_cost": "$2,000 - $15,000",
                "priority": "Critical"
            })

        return {
            "target_country": target_country,
            "industry": org.industry,
            "bridge_steps": steps,
            "readiness_score": 0.15 if steps else 1.0,
            "automated_next_step": steps[0]["requirement"] if steps else "Ready for Export"
        }

    async def validate_shipment(self, shipment_id: str) -> dict:
        """Validates all documents and rules for a specific shipment."""
        shipment = self.db.query(ExportRecord).filter(ExportRecord.id == shipment_id).first()
        if not shipment:
            return {"error": "Shipment not found"}

        country_code = shipment.destination_country.upper()
        
        # Determine compliance score based on available docs vs mandatory docs
        checklist = self.db.query(RequirementChecklist).filter(RequirementChecklist.export_record_id == shipment_id).all()
        if not checklist:
            return {"error": "No checklist found for shipment"}

        completed_count = sum(1 for item in checklist if item.is_completed)
        comp_score = completed_count / len(checklist)
        
        shipment.compliance_score = comp_score
        self.db.commit()
        
        return {
            "shipment_id": shipment_id,
            "destination": country_code,
            "compliance_score": round(comp_score, 2),
            "is_ready_for_cha": comp_score >= 0.9,
            "missing_docs": [item.document_type for item in checklist if not item.is_completed]
        }

    async def create_shipment(self, org_id: str, country: str, value: float, invoice_no: str) -> ExportRecord:
        """Initializes a new export pipeline for an MSME."""
        shipment_id = str(uuid.uuid4())
        new_shipment = ExportRecord(
            id=shipment_id,
            org_id=org_id,
            destination_country=country,
            shipment_value=value,
            invoice_no=invoice_no,
            status="pre_shipment",
            compliance_score=0.0
        )
        self.db.add(new_shipment)
        
        # Initialize requirements based on destination
        # logic moved from export_rules.py for consolidation
        mandatory_docs = {
            "UK": ["Commercial Invoice", "Packing List", "Bill of Lading", "UKCA"],
            "US": ["Commercial Invoice", "Packing List", "FDA-2877", "Bill of Lading"],
            "EU": ["Commercial Invoice", "Packing List", "EUR.1", "Bill of Lading"]
        }
        
        docs = mandatory_docs.get(country.upper(), ["Commercial Invoice", "Packing List"])
        for doc in docs:
            checklist_item = RequirementChecklist(
                id=str(uuid.uuid4()),
                export_record_id=shipment_id,
                document_type=doc,
                is_completed=False
            )
            self.db.add(checklist_item)

        self.db.commit()
        return new_shipment

    def get_compliance_calendar(self, org_id: str) -> List[dict]:
        """Returns MSME-specific renewal dates for export-related licenses."""
        import datetime
        today = datetime.date.today()
        # In production, this would query organization_licences
        return [
            {"item": "Spice Board RCMC Renewal", "due_date": str(today + datetime.timedelta(days=12)), "status": "critical"},
            {"item": "GST LUT Filing", "due_date": "2026-03-31", "status": "upcoming"},
            {"item": "FSSAI Export Licence", "due_date": str(today + datetime.timedelta(days=45)), "status": "upcoming"}
        ]
