"""GitHub evidence connector implementation."""
from dataclasses import dataclass


@dataclass
class GitHubCollector:
    token: str

    def collect(self, repo: str) -> list[dict]:
        """Collect pull request approval and workflow artifacts metadata."""
        return [{"source": "github", "repo": repo, "evidence_type": "deployment_approval"}]
