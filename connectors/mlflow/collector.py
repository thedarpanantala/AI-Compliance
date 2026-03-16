"""MLflow evidence connector implementation."""

def collect_run_evidence(run_id: str) -> list[dict]:
    """Collect metrics and model artifacts from MLflow run metadata."""
    return [{"source": "mlflow", "run_id": run_id, "evidence_type": "test_results"}]
