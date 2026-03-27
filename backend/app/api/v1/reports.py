from typing import Any, Dict
import os
import uuid
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel
from app.core.security import require_roles
from app.reporting.pdf_generator import create_pdf_report

router = APIRouter()

class ReportRequest(BaseModel):
    org_name: str
    period: str
    compliance_data: Dict[str, Any]

class ReportResponse(BaseModel):
    report_id: str
    download_url: str
    status: str

@router.post("/generate", response_model=ReportResponse)
async def generate_compliance_report(
    payload: ReportRequest,
    claims: dict = Depends(require_roles("owner", "admin", "risk_manager", "auditor"))
):
    """
    Takes arbitrary compliance data and synchronously generates a PDF report.
    """
    report_id = str(uuid.uuid4())
    save_dir = os.path.join(os.getcwd(), "backend", "app", "artifacts", "reports")
    
    try:
        report_path = create_pdf_report(
            org_name=payload.org_name,
            period=payload.period,
            data=payload.compliance_data,
            save_dir=save_dir
        )
        
        # Determine actual extension generated (fallback support tracking)
        is_html = report_path.endswith(".html")
        download_id = os.path.basename(report_path)
        
        return {
            "report_id": report_id,
            "download_url": f"/api/reports/download/{download_id}",
            "status": "success"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Report generation failed: {str(e)}")


@router.get("/download/{filename}")
async def download_report(
    filename: str,
    # In production, secure this with claims.
):
    """
    Serves the generated PDF file.
    """
    save_dir = os.path.join(os.getcwd(), "backend", "app", "artifacts", "reports")
    file_path = os.path.join(save_dir, filename)
    
    if os.path.exists(file_path):
        return FileResponse(path=file_path, filename=filename)
    else:
        raise HTTPException(status_code=404, detail="Report file not found")
