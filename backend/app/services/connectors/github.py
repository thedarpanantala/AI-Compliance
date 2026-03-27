import requests
from typing import List, Dict, Any
from .base import BaseConnector

class GitHubConnector(BaseConnector):
    def __init__(self, config: Dict[str, Any], credentials: Dict[str, Any]):
        super().__init__(config, credentials)
        self.repo = config.get("repository", "")
        self.branch = config.get("branch", "main")
        self.token = credentials.get("personal_access_token", "")
        
        self.headers = {
            "Authorization": f"token {self.token}",
            "Accept": "application/vnd.github.v3+json"
        }
        self.base_url = f"https://api.github.com/repos/{self.repo}"

    def test_connection(self) -> bool:
        if not self.repo or not self.token:
            return False
            
        try:
            response = requests.get(self.base_url, headers=self.headers, timeout=10)
            return response.status_code == 200
        except Exception:
            return False

    def fetch_evidence(self) -> List[Dict[str, Any]]:
        # Fetching commits for traceability
        commits_url = f"{self.base_url}/commits?sha={self.branch}"
        evidence_items = []
        try:
            response = requests.get(commits_url, headers=self.headers, timeout=10)
            if response.status_code == 200:
                commits = response.json()
                for commit in commits[:10]: # Limit for demonstration
                    evidence_items.append({
                        "evidence_type": "commit_log",
                        "source_identifier": commit["sha"],
                        "raw_content": commit["commit"]["message"],
                        "metadata": {
                            "author": commit["commit"]["author"]["name"],
                            "timestamp": commit["commit"]["author"]["date"]
                        }
                    })
        except Exception as e:
            print(f"Failed to fetch GitHub evidence: {str(e)}")
            
        return evidence_items
