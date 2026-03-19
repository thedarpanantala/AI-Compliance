from datetime import date, timedelta
import asyncio

COMPLIANCE_CATEGORIES = {
    "hospital": [
        # Licences
        {"name": "NABH Accreditation",           "type": "licence",    "freq": "annual"},
        {"name": "AERB Radiation Safety Licence", "type": "licence",    "freq": "annual"},
        {"name": "Clinical Establishment Licence","type": "licence",    "freq": "annual"},
        {"name": "Blood Bank Licence",            "type": "licence",    "freq": "annual"},
        {"name": "PCPNDT Registration",           "type": "licence",    "freq": "annual"},
        {"name": "Pharmacy Licence (Form 20/21)", "type": "licence",    "freq": "annual"},
        {"name": "Bio-Medical Waste Auth Letter", "type": "licence",    "freq": "annual"},
        {"name": "Fire NOC",                      "type": "licence",    "freq": "annual"},
        {"name": "Lift Inspection Certificate",   "type": "inspection", "freq": "annual"},
        {"name": "Boiler Certificate",            "type": "inspection", "freq": "annual"},
        # Monthly compliance
        {"name": "BMW Disposal Records",          "type": "evidence",   "freq": "monthly"},
        {"name": "Infection Control Audit",       "type": "evidence",   "freq": "monthly"},
        {"name": "Drug Expiry Check Records",     "type": "evidence",   "freq": "monthly"},
        {"name": "Emergency Equipment Log",       "type": "evidence",   "freq": "monthly"},
        # AI systems
        {"name": "AI System Incident Log Review", "type": "ai_check",  "freq": "monthly"},
        {"name": "Clinical AI Validation Status", "type": "ai_check",  "freq": "quarterly"},
    ],
    "textile": [
        {"name": "GPCB Consent to Operate",       "type": "licence",   "freq": "annual"},
        {"name": "Factory Licence",               "type": "licence",   "freq": "annual"},
        {"name": "ETP Effluent Lab Report",       "type": "evidence",  "freq": "monthly"},
        {"name": "Stack Emission Report",         "type": "evidence",  "freq": "monthly"},
        {"name": "Hazardous Waste Manifest",      "type": "evidence",  "freq": "monthly"},
        {"name": "Safety Drill Record",           "type": "evidence",  "freq": "monthly"},
        {"name": "Worker Wage Register",          "type": "evidence",  "freq": "monthly"},
        {"name": "ESG Disclosure Update",         "type": "evidence",  "freq": "quarterly"},
    ]
}

# Assume these helpers exist in a core service library
async def check_item_status(org_id: str, item: dict, check_date: date, db):
    # Stub: Randomly return statuses for demonstration
    import random
    return random.choice(["ok", "due_soon", "overdue"])

async def run_monthly_check(org_id: str, industry: str, db):
    """
    Runs on 1st of every month automatically via a top-level Cron process.
    Checks all licences, creates inbox items, sends alerts to the assigned Compliance Officer.
    """
    # Prevent circular imports
    from app.services.notifications import send_monthly_alert_email
    
    today = date.today()
    categories = COMPLIANCE_CATEGORIES.get(industry, [])
    alerts = []

    for item in categories:
        # Check if evidence uploaded for this month
        status = await check_item_status(org_id, item, today, db)

        if status == "overdue":
            alerts.append({
                "severity": "critical",
                "item":     item["name"],
                "message":  f"{item['name']} is overdue",
            })
        elif status == "due_soon":
            alerts.append({
                "severity": "warning",
                "item":     item["name"],
                "message":  f"{item['name']} due within 30 days",
            })

    # Send email summary to compliance officer
    if alerts:
        await send_monthly_alert_email(org_id, alerts, db)

    return {"checked": len(categories), "alerts": len(alerts)}
