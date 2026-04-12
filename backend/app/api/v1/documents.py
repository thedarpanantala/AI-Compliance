import uuid
from typing import List, Optional, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.services.idp_logic import IDPLogic
from app.models.entities import ProcessingDocument, IDPField

router = APIRouter()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic Models for API
class ProcessDocumentResponse(BaseModel):
    id: str
    status: str
    ocr_confidence: float
    file_type: str
    extracted_data: dict

@router.post("/process", response_model=ProcessDocumentResponse)
async def process_document_api(file: UploadFile = File(...), db: Session = Depends(get_db)):
    """Async-ready endpoint for multi-modal IDP ingestion."""
    try:
        content = await file.read()
        raw_text = content.decode("utf-8", errors="ignore")
        
        logic = IDPLogic()
        pipeline_result = await logic.full_pipeline(raw_text, file.filename)
        
        doc_id = pipeline_result["doc_id"]
        doc = ProcessingDocument(
            id=doc_id,
            filename=file.filename,
            file_type=pipeline_result["doc_type"],
            status="completed",
            ocr_confidence=pipeline_result["data"]["confidence"],
            extracted_data=pipeline_result["data"]["fields"],
            pii_redacted=True
        )
        db.add(doc)

        # Store individual fields for verification
        for key, val in pipeline_result["data"]["fields"].items():
            field = IDPField(
                id=str(uuid.uuid4()),
                processing_document_id=doc_id,
                field_key=key,
                field_value=str(val),
                confidence_score=0.95,
                is_verified=False
            )
            db.add(field)

        db.commit()
        return doc
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"IDP Error: {str(e)}")

@router.get("/vault/search")
async def search_vault(q: str, db: Session = Depends(get_db)):
    """Full-text search over OCR'd document metadata."""
    results = db.query(ProcessingDocument).filter(
        ProcessingDocument.extracted_data.cast(String).ilike(f"%{q}%")
    ).all()
    return results

@router.get("/{doc_id}")
async def get_document_status(doc_id: str, db: Session = Depends(get_db)):
    """Detailed view of processing result and extracted fields."""
    doc = db.query(ProcessingDocument).filter(ProcessingDocument.id == doc_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    
    fields = db.query(IDPField).filter(IDPField.processing_document_id == doc_id).all()
    return {
        "document": doc,
        "fields": fields
    }
