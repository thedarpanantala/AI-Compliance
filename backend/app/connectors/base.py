"""Connector abstraction for evidence ingestion."""
from abc import ABC, abstractmethod


class EvidenceConnector(ABC):
    """Base interface for third-party evidence sources."""

    @abstractmethod
    def collect(self, resource_id: str) -> list[dict]:
        """Collect evidence entries from a provider."""


class GitHubConnector(EvidenceConnector):
    """Collect CI and approval evidence from GitHub."""

    def collect(self, resource_id: str) -> list[dict]:
        return [{"resource_id": resource_id, "evidence_type": "deployment_approval", "source": "github"}]
