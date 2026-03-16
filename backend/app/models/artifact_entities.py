"""Artifact Engine and jurisdiction bridge entities."""
from __future__ import annotations

from sqlalchemy import Boolean, Float, ForeignKey, JSON, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base, TenantTimestampMixin


class ArtifactTemplate(Base, TenantTimestampMixin):
    __tablename__ = "artifact_templates"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    org_id: Mapped[str | None] = mapped_column(ForeignKey("organizations.id"), nullable=True)
    template_id: Mapped[str] = mapped_column(String(120), unique=True, index=True)
    name: Mapped[str] = mapped_column(String(255))
    jurisdiction: Mapped[str] = mapped_column(String(120))
    target_audience: Mapped[str] = mapped_column(String(64), default="regulator")
    required_fields: Mapped[dict] = mapped_column(JSON, default=dict)
    template_path: Mapped[str] = mapped_column(String(255))
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)


class GeneratedArtifact(Base, TenantTimestampMixin):
    __tablename__ = "generated_artifacts"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    org_id: Mapped[str] = mapped_column(ForeignKey("organizations.id"), index=True)
    template_id: Mapped[str] = mapped_column(String(120), index=True)
    system_id: Mapped[str] = mapped_column(String(120), index=True)
    evidence_bundle_id: Mapped[str] = mapped_column(String(120))
    jurisdiction: Mapped[str] = mapped_column(String(120))
    audience: Mapped[str] = mapped_column(String(64))
    status: Mapped[str] = mapped_column(String(64), default="draft")
    llm_provider: Mapped[str] = mapped_column(String(64), default="claude-3.5-sonnet")
    output_format: Mapped[str] = mapped_column(String(32), default="json")
    output_payload: Mapped[dict] = mapped_column(JSON, default=dict)
    validation_result: Mapped[dict] = mapped_column(JSON, default=dict)
    audit_embed: Mapped[dict] = mapped_column(JSON, default=dict)


class ControlMapping(Base, TenantTimestampMixin):
    __tablename__ = "control_mappings"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    org_id: Mapped[str | None] = mapped_column(ForeignKey("organizations.id"), nullable=True)
    indian_control: Mapped[str] = mapped_column(String(160), index=True)
    eu_equivalent: Mapped[list] = mapped_column(JSON, default=list)
    us_equivalent: Mapped[list] = mapped_column(JSON, default=list)
    confidence_score: Mapped[float] = mapped_column(Float, default=0.5)
    evidence_transform: Mapped[str] = mapped_column(Text)
    transformation_steps: Mapped[dict] = mapped_column(JSON, default=dict)
