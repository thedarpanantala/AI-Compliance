import os
import uuid
import logging
from datetime import datetime
from jinja2 import Environment, FileSystemLoader, Template
from weasyprint import HTML
from typing import Dict, Any, Optional
from sqlalchemy.orm import Session
from app.models.entities import DocumentTemplate, GeneratedDocument, Organization

logger = logging.getLogger(__name__)

class DocumentAIService:
    """
    AI-Powered Document Orchestration & Generation Service.
    Uses WeasyPrint for PDF rendering and AI agents for content expansion.
    """

    def __init__(self, db: Session):
        self.db = db
        # Configurable paths for templates
        self.template_dir = os.path.join(os.getcwd(), "templates")
        if not os.path.exists(self.template_dir):
            os.makedirs(self.template_dir)

    async def generate_document(self, org_id: str, template_code: str, user_inputs: Dict[str, Any]) -> GeneratedDocument:
        """
        Main entry point for generating a compliance artifact.
        """
        # 1. Fetch Template & Organization Data
        template = self.db.query(DocumentTemplate).filter(DocumentTemplate.template_code == template_code).first()
        org = self.db.query(Organization).filter(Organization.id == org_id).first()
        
        if not template:
            # Fallback for demo
            template_content = self._get_fallback_template(template_code)
        else:
            template_content = template.template_content

        # 2. AI Content Expansion (Stub)
        # In production, this would call 'ComplianceAgent.generate_content()'
        expanded_content = await self._run_ai_expansion(template_content, org, user_inputs)

        # 3. Render HTML with Jinja2
        jinja_template = Template(expanded_content)
        rendered_html = jinja_template.render(
            org_name=org.name,
            industry=org.industry,
            date=datetime.now().strftime("%Y-%m-%d"),
            **user_inputs
        )

        # 4. Generate PDF using WeasyPrint
        pdf_filename = f"{template_code}_{org_id}_{uuid.uuid4().hex[:8]}.pdf"
        output_path = os.path.join(os.getcwd(), "storage", "documents", pdf_filename)
        
        if not os.path.exists(os.path.dirname(output_path)):
            os.makedirs(os.path.dirname(output_path))

        # PDF Rendering
        HTML(string=rendered_html).write_pdf(output_path)

        # 5. Store Metadata
        doc = GeneratedDocument(
            id=str(uuid.uuid4()),
            org_id=org_id,
            template_id=template.id if template else None,
            status="completed",
            input_data=user_inputs,
            raw_content=rendered_html,
            generated_at=datetime.now(),
            file_url=f"/storage/documents/{pdf_filename}"
        )
        self.db.add(doc)
        self.db.commit()

        logger.info(f"Generated PDF artifact {pdf_filename} for org {org_id}")
        return doc

    async def _run_ai_expansion(self, template_text: str, org: Organization, inputs: Dict) -> str:
        """
        Simulates AI-driven 'Gap Filling' for technical sections.
        """
        # Mocking AI expansion which would normally use Anthropic/OpenAI
        ai_note = f"\n\n<!-- AI GENERATED SECTION: PROPRIETARY RISK MITIGATION -->\n" \
                  f"Based on the {org.industry} industry profile, the system has identified specific " \
                  f"data localization requirements under DPDPA Section 13. Mitigations applied: " \
                  f"Encrypted Sharding + Local Backup Residency.\n"
        return template_text + ai_note

    def _get_fallback_template(self, code: str) -> str:
        """
        Fallback Markdown/HTML templates if not in DB.
        """
        templates = {
            "DPDPA_NOTICE": """
                <html>
                <head><style>body { font-family: sans-serif; }</style></head>
                <body>
                    <h1>Data Privacy Notice - {{ org_name }}</h1>
                    <p>This document specifies compliance with the Digital Personal Data Protection Act 2023.</p>
                    <h3>1. Purpose of Collection</h3>
                    <p>{{ purpose | default('Service orchestration and compliance tracking.') }}</p>
                    <h3>2. Data Localization</h3>
                    <p>All data is hosted in the {{ data_region | default('India') }} region.</p>
                </body>
                </html>
            """,
            "NABH_PROTOCOL": """
                <h1>NABH Clinical Safety Protocol</h1>
                <p>System: {{ system_name }}</p>
                <p>Status: {{ validation_status }}</p>
            """
        }
        return templates.get(code, "<h1>Compliance Report</h1>")
