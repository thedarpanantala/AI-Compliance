import uuid
import logging
import random
from datetime import datetime
from sqlalchemy.orm import Session
from app.models.entities import ProcessingDocument

logger = logging.getLogger(__name__)

class IDPEngine:
    """Intelligent Document Processing (IDP) Engine for aic Privacy Cockpit."""
    
    def __init__(self, db: Session):
        self.db = db

    async def process_document(self, file_content: bytes, filename: str) -> ProcessingDocument:
        """Processes an incoming document using OCR and AI extraction."""
        doc_id = str(uuid.uuid4())
        
        # Determine file type based on simple rule for demo
        file_type = "invoice" if "inv" in filename.lower() else "packing_list"
        if "fssai" in filename.lower(): file_type = "fssai"
        
        logger.info(f"Processing {file_type} document: {filename}")
        
        # Simulate OCR and PII Redaction
        extracted_data = self._simulate_ocr_extraction(file_type)
        ocr_confidence = round(random.uniform(0.85, 0.98), 2)
        
        doc = ProcessingDocument(
            id=doc_id,
            filename=filename,
            file_type=file_type,
            status="completed",
            ocr_confidence=ocr_confidence,
            extracted_data=extracted_data,
            pii_redacted=True
        )
        
        self.db.add(doc)
        self.db.commit()
        return doc

    def _simulate_ocr_extraction(self, file_type: str) -> dict:
        """Simulates extraction from LayoutLMv3 or Donut models."""
        base_data = {
            "vendor_name": "Apex Global Traders",
            "date": datetime.now().strftime("%Y-%m-%d"),
            "license_no": "FSSAI-1234567890",
        }
        
        if file_type == "invoice":
            base_data.update({
                "invoice_no": f"INV-{random.randint(1000, 9999)}",
                "amount": round(random.uniform(5000, 15000), 2),
                "currency": "USD"
            })
        elif file_type == "fssai":
            base_data.update({
                "expiry_date": "2027-12-31",
                "authority": "FSSAI Board"
            })
            
        return base_data

    async def redact_pii(self, doc_id: str):
        """Masks sensitive information like Aadhaar/PAN in extracted data."""
        doc = self.db.query(ProcessingDocument).filter(ProcessingDocument.id == doc_id).first()
        if doc and doc.extracted_data:
            # Simple simulation of masking
            if "aadhaar" in doc.extracted_data:
                doc.extracted_data["aadhaar"] = "XXXX-XXXX-XXXX"
            doc.pii_redacted = True
            self.db.commit()
