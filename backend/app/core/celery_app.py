import os
from celery import Celery
from celery.schedules import crontab

# Configure Redis as the broker and backend
REDIS_URL = os.getenv("CELERY_BROKER_URL", "redis://localhost:6379/0")

celery_app = Celery(
    "compliance_worker",
    broker=REDIS_URL,
    backend=REDIS_URL,
    include=["app.workers.monthly_scheduler"]
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="Asia/Kolkata",
    enable_utc=True,
    task_track_started=True,
)

# Scheduled Jobs definitions
celery_app.conf.beat_schedule = {
    "daily-licence-expiry-check": {
        "task": "app.workers.monthly_scheduler.check_licence_expiries",
        "schedule": crontab(hour=23, minute=0),  # 11:00 PM daily
        "args": ()
    },
    "weekly-compliance-summary": {
        "task": "app.workers.monthly_scheduler.compile_weekly_summary",
        "schedule": crontab(day_of_week="mon", hour=9, minute=0),  # Monday 9:00 AM
        "args": ()
    },
    "monthly-compliance-scan": {
        "task": "app.workers.monthly_scheduler.run_monthly_scan",
        "schedule": crontab(day_of_month="1", hour=6, minute=0),   # 1st of month 6:00 AM
        "args": ()
    }
}
