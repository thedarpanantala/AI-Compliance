import uuid
from datetime import datetime
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.entities import ConsentRecord, DataBreachLog

router = APIRouter()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic Models for API
class ConsentCollectRequest(BaseModel):
    data_principal_id: str
    purpose: str # marketing, analytics, ai_training, medical_records
    metadata: Optional[dict] = {}

class BreachReportRequest(BaseModel):
    severity_score: int
    impact_summary: str
    affected_systems: List[str]

@router.post("/consent/collect")
async def collect_consent(payload: ConsentCollectRequest, db: Session = Depends(get_db)):
    """
    DPDPA Section 6: Notice and Consent Management.
    """
    consent_id = str(uuid.uuid4())
    new_record = ConsentRecord(
        id=consent_id,
        data_principal_id=payload.data_principal_id,
        purpose=payload.purpose,
        status="active"
    )
    db.add(new_record)
    db.commit()
    return {"status": "success", "consent_id": consent_id}

@router.post("/consent/withdraw")
async def withdraw_consent(consent_id: str, db: Session = Depends(get_db)):
    """
    DPDPA Section 12: Right to withdraw consent.
    """
    record = db.query(ConsentRecord).filter(ConsentRecord.id == consent_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Consent record not found")
        
    record.status = "withdrawn"
    record.withdrawn_at = datetime.now()
    db.commit()
    return {"status": "success", "message": "Consent withdrawn successfully"}

@router.get("/dp/request-status/{request_id}")
async def get_dp_request_status(request_id: str):
    """
    DSR Automation: Check status of Data Principal request.
    """
    # Stub: Normally query DSR tables
    return {
        "request_id": request_id,
        "status": "processing",
        "days_remaining": 24, # DPDPA 30-day mandate
        "type": "Erasure"
    }

@router.post("/breach/report")
async def report_breach(payload: BreachReportRequest, db: Session = Depends(get_db)):
    """
    Breach Management: Automated reporting for DPDPA 72-hour mandate.
    """
    breach_id = str(uuid.uuid4())
    new_breach = DataBreachLog(
        id=breach_id,
        severity_score=payload.severity_score,
        impact_summary=payload.impact_summary,
        remediation_status="investigating"
    )
    db.add(new_breach)
    db.commit()
    return {"status": "success", "breach_id": breach_id, "reporting_deadline": "72 hours"}

@router.get("/reports/dpdpa-readiness")
async def get_dpdpa_readiness():
    """
    DPDPA Assessment Template.
    """
    return {
        "readiness_score": 76.5,
        "sections": {
            "Notice and Consent (Sec 6)": "Compliant",
            "Data Minimization (Sec 7)": "Needs Review",
            "Rights of Data Principals (Sec 11-14)": "Action Required",
            "Duties of Data Fiduciaries (Sec 8-10)": "Compliant"
        }
    }
