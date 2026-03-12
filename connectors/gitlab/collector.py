"""GitLab evidence connector."""

def collect_pipeline(project: str) -> list[dict]:
    return [{"source": "gitlab", "project": project, "evidence_type": "pipeline_logs"}]
