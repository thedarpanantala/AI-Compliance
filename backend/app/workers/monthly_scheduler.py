import asyncio
import logging
from datetime import date
from celery import shared_task
from app.db.session import SessionLocal
from app.core.compliance_data import COMPLIANCE_DATA as COMPLIANCE_CATEGORIES

logger = logging.getLogger(__name__)

async def check_item_status(org_id: str, item: dict, check_date: date, db):
    # Stub: Randomly return statuses for demonstration
    import random
    return random.choice(["ok", "due_soon", "overdue"])

async def run_monthly_check_async(org_id: str, industry: str, db):
    """
    Core async logic for monthly checks
    """
    from app.services.notifications import send_monthly_alert_email
    
    today = date.today()
    categories = COMPLIANCE_CATEGORIES.get(industry, [])
    alerts = []

    for item in categories:
        status = await check_item_status(org_id, item, today, db)

        if status == "overdue":
            alerts.append({"severity": "critical", "item": item["name"], "message": f"{item['name']} is overdue"})
        elif status == "due_soon":
            alerts.append({"severity": "warning", "item": item["name"], "message": f"{item['name']} due within 30 days"})

    if alerts:
        await send_monthly_alert_email(org_id, alerts, db)

    return {"checked": len(categories), "alerts": len(alerts)}


# Celery Tracked Tasks
@shared_task(name="app.workers.monthly_scheduler.check_licence_expiries")
def check_licence_expiries():
    logger.info("Executing periodic daily task: check_licence_expiries")
    # In a full app, this would query orgs and run check for each org.
    # Placeholder execution
    return "Check completed"

@shared_task(name="app.workers.monthly_scheduler.compile_weekly_summary")
def compile_weekly_summary():
    logger.info("Executing periodic weekly task: compile_weekly_summary")
    return "Summary completed"

@shared_task(name="app.workers.monthly_scheduler.run_monthly_scan")
def run_monthly_scan():
    logger.info("Executing periodic monthly task: run_monthly_scan")
    # Wrap the async function in the synchronous celery task using asyncio
    db = SessionLocal()
    org_id = "demo-org" # Example execution for default tenant
    industry = "hospital"
    try:
        results = asyncio.run(run_monthly_check_async(org_id, industry, db))
        logger.info(f"Monthly scan completed for {org_id}: {results}")
    except Exception as e:
        logger.error(f"Failed monthly scan: {str(e)}")
    finally:
        db.close()
    return "Scan completed"
