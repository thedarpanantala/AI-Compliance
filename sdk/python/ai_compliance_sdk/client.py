"""Simple Python SDK client."""
import httpx


class AIComplianceClient:
    """API client for compliance workflows."""

    def __init__(self, base_url: str, token: str):
        self.base_url = base_url.rstrip("/")
        self.headers = {"Authorization": f"Bearer {token}"}

    def list_ai_systems(self) -> list[dict]:
        response = httpx.get(f"{self.base_url}/api/ai-systems", headers=self.headers, timeout=15)
        response.raise_for_status()
        return response.json()
