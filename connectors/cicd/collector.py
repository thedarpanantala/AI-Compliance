"""Generic CI/CD evidence connector."""

def collect_build(build_id: str) -> list[dict]:
    return [{"source": "cicd", "build_id": build_id, "evidence_type": "test_results"}]
