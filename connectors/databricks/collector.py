"""Databricks evidence connector."""

def collect_job(job_id: str) -> list[dict]:
    return [{"source": "databricks", "job_id": job_id, "evidence_type": "notebook_validation"}]
