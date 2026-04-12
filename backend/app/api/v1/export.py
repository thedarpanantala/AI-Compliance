import uuid
from typing import List, Optional, Dict, Any
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.services.export_rules import ExportRulesService
from app.models.entities import ExportRecord, RequirementChecklist

router = APIRouter()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic Models for API
class CreateShipmentRequest(BaseModel):
    country_code: str # US, UK, EU
    value: float
    invoice_no: str

class ExportStatusResponse(BaseModel):
    id: str
    destination_country: str
    shipment_value: float
    status: str
    compliance_score: float

@router.post("/shipments", response_model=ExportStatusResponse)
async def create_export_shipment(payload: CreateShipmentRequest, db: Session = Depends(get_db)):
    """Initializes a new global export shipment record for an MSME."""
    try:
        shipment_id = str(uuid.uuid4())
        shipment = ExportRecord(
            id=shipment_id,
            invoice_no=payload.invoice_no,
            destination_country=payload.country_code,
            shipment_value=payload.value,
            status="pre_shipment"
        )
        db.add(shipment)
        
        # Initialize the requirement checklist as a placeholder
        service = ExportRulesService(db)
        rules = service.get_rules_for_country(payload.country_code)
        for r in rules:
            checklist_item = RequirementChecklist(
                id=str(uuid.uuid4()),
                export_record_id=shipment_id,
                document_type=r["type"],
                is_completed=False
            )
            db.add(checklist_item)
            
        db.commit()
        return {
            "id": shipment_id,
            "destination_country": payload.country_code,
            "shipment_value": payload.value,
            "status": "pre_shipment",
            "compliance_score": 0.0
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Export shipment creation failed: {str(e)}")

@router.get("/shipments/{shipment_id}/validate")
async def validate_export_shipment(shipment_id: str, db: Session = Depends(get_db)):
    """Runs global regulatory intelligence rules against shipment documents."""
    service = ExportRulesService(db)
    validation = await service.validate_shipment_completeness(shipment_id)
    if "error" in validation:
        raise HTTPException(status_code=404, detail=validation["error"])
    return validation

@router.get("/calendar")
async def get_compliance_calendar(db: Session = Depends(get_db)):
    """Retrieves MSME-specific renewal dates (FSSAI/RCMC/GST)."""
    service = ExportRulesService(db)
    return service.get_msme_compliance_calendar("demo-org")
