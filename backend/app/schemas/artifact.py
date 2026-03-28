"""Artifact Engine schemas."""
from typing import Any

from pydantic import BaseModel


class GenerateArtifactRequest(BaseModel):
    template_id: str
    system_id: str
    evidence_bundle_id: str
    jurisdiction: str
    target_audience: str


class MapControlsRequest(BaseModel):
    indian_control: str
    evidence: dict[str, Any]
    target_jurisdiction: str = "EU"


class GPCBSnapshotRequest(BaseModel):
    system_id: str
    evidence_bundle_id: str
    month: str
    factory_site_id: str
