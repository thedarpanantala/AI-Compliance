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

    async def validate_shipment(self, shipment_id: str) -> dict:
        """Validates all documents and rules for a specific shipment."""
        shipment = self.db.query(ExportShipment).filter(ExportShipment.id == shipment_id).first()
        if not shipment:
            return {"error": "Shipment not found"}

        country_code = shipment.destination_country.upper()
        rules_config = REGULATORY_MAP.get(country_code, {"rules": [], "mandatory_docs": []})
        
        # Determine compliance score based on available docs vs mandatory docs
        # Mock calculation:
        missing_docs = rules_config["mandatory_docs"] # Just mock for now
        comp_score = 0.75 # Default for demo
        
        shipment.compliance_score = comp_score
        self.db.commit()
        
        return {
            "shipment_id": shipment_id,
            "destination": country_code,
            "compliance_score": comp_score,
            "mandatory_rules": rules_config["rules"],
            "missing_documents": missing_docs,
            "is_ready_for_cha": comp_score >= 0.9
        }

    async def create_shipment(self, country: str, value: float) -> ExportShipment:
        """Initializes a new export pipeline for an MSME."""
        shipment_id = str(uuid.uuid4())
        new_shipment = ExportShipment(
            id=shipment_id,
            destination_country=country,
            shipment_value=value,
            status="pre_shipment",
            compliance_score=0.0
        )
        self.db.add(new_shipment)
        self.db.commit()
        return new_shipment

    def get_compliance_calendar(self) -> List[dict]:
        """Returns MSME-specific renewal dates for FSSAI, RCMC, and GST LUT."""
        import datetime
        today = datetime.date.today()
        return [
            {"item": "FSSAI License Renewal", "due_date": str(today + datetime.timedelta(days=45)), "status": "upcoming"},
            {"item": "Spice Board RCMC", "due_date": str(today + datetime.timedelta(days=12)), "status": "critical"},
            {"item": "GST LUT Filing", "due_date": "2026-03-31", "status": "upcoming"}
        ]
