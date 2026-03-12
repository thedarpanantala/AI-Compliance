"""SageMaker evidence connector implementation."""

def collect_training_job(job_name: str) -> list[dict]:
    """Collect training job logs and approval status."""
    return [{"source": "sagemaker", "job_name": job_name, "evidence_type": "pipeline_logs"}]
