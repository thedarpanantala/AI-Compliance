import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import logging

logger = logging.getLogger(__name__)

async def get_compliance_officer_email(org_id: str, db) -> str:
    # Stub: Query DB for the officer's email
    return f"compliance-officer@{org_id}.com"

async def send_email(to: str, subject: str, html: str):
    # Stub standard email sender (in prod use SES or SendGrid integration)
    logger.info(f"Sending Email to {to} | Subject: {subject}")
    # Uncomment to test locally via a debug SMTP server 
    # e.g.: python -m smtpd -n -c DebuggingServer localhost:1025
    """
    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From'] = "alerts@aicompliance.com"
    msg['To'] = to
    msg.attach(MIMEText(html, 'html'))
    try:
        with smtplib.SMTP('localhost', 1025) as server:
            server.sendmail("alerts@aicompliance.com", to, msg.as_string())
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
    """
    pass

async def send_monthly_alert_email(org_id: str, alerts: list, db):
    critical = [a for a in alerts if a["severity"] == "critical"]
    warnings = [a for a in alerts if a["severity"] == "warning"]

    subject = f"⚠️ {len(critical)} Critical Compliance Items Need Attention"

    html = f"""
    <h2>Monthly Compliance Review — Action Required</h2>
    <p>Your automated compliance check found {len(alerts)} items needing attention.</p>

    <h3 style="color:red">Critical ({len(critical)} items)</h3>
    <ul>
    {"".join(f'<li>{a["item"]}: {a["message"]}</li>' for a in critical)}
    </ul>

    <h3 style="color:orange">Warnings ({len(warnings)} items)</h3>
    <ul>
    {"".join(f'<li>{a["item"]}: {a["message"]}</li>' for a in warnings)}
    </ul>

    <a href="https://yourplatform.com/monthly-review"
       style="background:#2563eb;color:white;padding:12px 24px;
              border-radius:8px;text-decoration:none">
      Review and Approve →
    </a>

    <p style="color:gray;font-size:12px">
      Estimated review time: {len(alerts) * 2} minutes
    </p>
    """

    # Send via SMTP
    target_email = await get_compliance_officer_email(org_id, db)
    await send_email(
        to=target_email,
        subject=subject,
        html=html,
    )
