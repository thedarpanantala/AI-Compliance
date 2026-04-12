import os
import re
import json
import logging
from typing import Dict, Any, List
from datetime import datetime
import uuid

# Mocking OCR and Layout Extraction for Demo
# In production, this would use LayoutLMv3, Donut, or AWS Textract

logger = logging.getLogger(__name__)

class IDPLogic:
    """Advanced Intelligent Document Processing logic for aic Privacy Cockpit."""

    @staticmethod
    def identify_document_type(text: str) -> str:
        """Heuristic-based document classification."""
        text = text.lower()
        if "invoice" in text or "bill to" in text:
            return "invoice"
        if "packing list" in text or "contents" in text:
            return "packing_list"
        if "fssai" in text or "license number" in text:
            return "fssai_license"
        if "bill of lading" in text:
            return "bill_of_lading"
        return "generic_compliance_doc"

    @staticmethod
    def extract_key_value_pairs(text: str, doc_type: str) -> Dict[str, Any]:
        """Extracts structured data based on document type patterns."""
        extracted = {}
        
        # Regex patterns for demo
        patterns = {
            "invoice_number": r"(?:invoice|inv)\s*(?:no|#)?[:\s]*([A-Z0-9-]+)",
            "date": r"(\d{1,2}[/-]\d{1,2}[/-]\d{2,4})",
            "amount": r"(?:total|amount|usd|inr)\s*[:\s]*([0-9,.]+)",
            "fssai_no": r"(?:fssai|license)\s*(?:no|#)?[:\s]*(\d{14})",
            "iec_code": r"iec\s*[:\s]*([A-Z0-9]{10})"
        }

        for key, pattern in patterns.items():
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                extracted[key] = match.group(1)

        # Confidence scores simulation
        return {
            "fields": extracted,
            "confidence": 0.92 if extracted else 0.45,
            "doc_type": doc_type,
            "processed_at": datetime.now().isoformat()
        }

    @staticmethod
    def redact_pii(text: str) -> str:
        """Redacts sensitive information like Aadhaar, PAN, and specific IDs."""
        # Aadhaar: 12 digits
        text = re.sub(r"\b\d{4}\s\d{4}\s\d{4}\b", "XXXX XXXX XXXX", text)
        # PAN: 5 letters, 4 digits, 1 letter
        text = re.sub(r"\b[A-Z]{5}\d{4}[A-Z]\b", "XXXXX0000X", text, flags=re.IGNORECASE)
        # Masking specific sensitive values
        return text

    async def full_pipeline(self, raw_text: str, filename: str) -> Dict[str, Any]:
        """Executes the end-to-end IDP pipeline."""
        doc_type = self.identify_document_type(raw_text)
        extracted = self.extract_key_value_pairs(raw_text, doc_type)
        redacted_text = self.redact_pii(raw_text)
        
        return {
            "doc_id": str(uuid.uuid4()),
            "filename": filename,
            "doc_type": doc_type,
            "data": extracted,
            "redacted_text": redacted_text,
            "status": "success"
        }
