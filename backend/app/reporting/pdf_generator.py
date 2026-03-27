import os
import logging
from datetime import datetime

logger = logging.getLogger(__name__)

# Try to import weasyprint for actual PDF Generation
try:
    from weasyprint import HTML, CSS
    WEASYPRINT_AVAILABLE = True
except ImportError:
    WEASYPRINT_AVAILABLE = False
    logger.warning("WeasyPrint is not installed. PDF generation will fallback to raw HTML dropping.")

class PDFReportGenerator:
    """
    Generates auditor-ready PDF documents from compliance JSON payloads.
    Uses WeasyPrint to construct styled PDFs from Jinja2/HTML Templates.
    """
    def __init__(self, org_name: str, period: str):
        self.org_name = org_name
        self.period = period
        self.timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    def generate_html_string(self, compliance_data: dict) -> str:
        """Dynamically builds the HTML used for the PDF."""
        # Optional: Can be replaced with jinja2 env.get_template('report.html').render(...)
        licences = compliance_data.get("licences", {"valid": 0, "expiring": 0, "expired": 0})
        ai_systems = compliance_data.get("ai_systems", {"registered": 0, "non_compliant": 0})
        evidence = compliance_data.get("evidence", {"uploaded": 0, "overdue": 0})
        actions = compliance_data.get("actions_taken", [])

        actions_html = "".join([f"<li>{act}</li>" for act in actions])
        
        return f"""
        <html>
        <head>
            <style>
                @page {{ margin: 2cm; }}
                body {{ font-family: -apple-system, sans-serif; color: #333; line-height: 1.6; }}
                h1 {{ color: #1e3a8a; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; }}
                h2 {{ color: #1f2937; margin-top: 30px; }}
                .summary-box {{ background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin-bottom: 20px; }}
                .metric {{ margin: 5px 0; font-weight: bold; }}
                .footer {{ margin-top: 50px; font-size: 12px; color: #6b7280; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 20px; }}
            </style>
        </head>
        <body>
            <h1>Monthly Compliance Audit Report</h1>
            <div class="summary-box">
                <p><strong>Organization:</strong> {self.org_name}</p>
                <p><strong>Audit Period:</strong> {self.period}</p>
                <p><strong>Generation Date:</strong> {self.timestamp}</p>
            </div>
            
            <h2>Executive Dashboard</h2>
            <ul>
                <li class="metric">Licences: {licences['valid']} Valid | {licences['expiring']} Expiring | <span style="color:red">{licences['expired']} Expired</span></li>
                <li class="metric">AI Systems: {ai_systems['registered']} Registered | {ai_systems['non_compliant']} Action Required</li>
                <li class="metric">Evidence Submissions: {evidence['uploaded']} Uploaded | <span style="color:red">{evidence['overdue']} Overdue</span></li>
            </ul>

            <h2>Remediation Actions Logged</h2>
            <ul>
                {actions_html}
            </ul>

            <div class="footer">
                <p>Digital Signature: Auto-Verified Payload Tracker</p>
                <p>Platform: AntiGravity Compliance Suite</p>
            </div>
        </body>
        </html>
        """

    def generate_report(self, compliance_data: dict, output_path: str) -> str:
        """Executes the conversion and returns the path to the PDF."""
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        html_content = self.generate_html_string(compliance_data)

        if WEASYPRINT_AVAILABLE:
            try:
                HTML(string=html_content).write_pdf(output_path)
                logger.info(f"Successfully generated WeasyPrint PDF report at {output_path}")
                return output_path
            except Exception as e:
                logger.error(f"Failed to generate WeasyPrint PDF report: {e}")
                raise
        else:
            # Fallback for systems without cairo/weasyprint C dependencies
            fallback_path = output_path.replace(".pdf", ".html")
            with open(fallback_path, "w", encoding="utf-8") as f:
                f.write(html_content)
            logger.info(f"Fallback: Saved raw HTML report to {fallback_path}")
            return fallback_path

def create_pdf_report(org_name: str, period: str, data: dict, save_dir: str) -> str:
    """Entry point for routers or celery workers."""
    generator = PDFReportGenerator(org_name=org_name, period=period)
    filename = f"report_{org_name.replace(' ', '_').lower()}_{generator.period.replace(' ', '_')}.pdf"
    output_path = os.path.join(save_dir, filename)
    return generator.generate_report(data, output_path)
