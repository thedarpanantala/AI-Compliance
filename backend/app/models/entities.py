"""Core and vertical domain entities for compliance platform."""
from __future__ import annotations

from sqlalchemy import Boolean, Date, DateTime, ForeignKey, Integer, JSON, Numeric, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base, TenantTimestampMixin


class Organization(Base, TenantTimestampMixin):
    __tablename__ = "organizations"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    name: Mapped[str] = mapped_column(String(255))
    slug: Mapped[str | None] = mapped_column(String(100), unique=True, nullable=True)
    industry: Mapped[str] = mapped_column(String(100))
    plan: Mapped[str] = mapped_column(String(50), default="starter")
    data_region: Mapped[str] = mapped_column(String(10), default="in")
    settings: Mapped[dict] = mapped_column(JSON, default=dict)


class User(Base, TenantTimestampMixin):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    organization_id: Mapped[str] = mapped_column(ForeignKey("organizations.id"))
    email: Mapped[str] = mapped_column(String(255), unique=True)
    hashed_password: Mapped[str | None] = mapped_column(String(255), nullable=True)
    role: Mapped[str] = mapped_column(String(100))
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    last_login_at: Mapped[DateTime | None] = mapped_column(DateTime, nullable=True)


class AISystem(Base, TenantTimestampMixin):
    __tablename__ = "ai_systems"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    org_id: Mapped[str] = mapped_column(ForeignKey("organizations.id"), index=True, default="demo-org")
    name: Mapped[str] = mapped_column(String(255))
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    system_type: Mapped[str | None] = mapped_column(String(100), nullable=True)
    status: Mapped[str] = mapped_column(String(50), default="draft")
    risk_tier: Mapped[str | None] = mapped_column(String(50), nullable=True)
    version: Mapped[str | None] = mapped_column(String(64), nullable=True)
    owner_user_id: Mapped[str | None] = mapped_column(ForeignKey("users.id"), nullable=True)
    team: Mapped[str | None] = mapped_column(String(255), nullable=True)
    external_id: Mapped[str | None] = mapped_column(String(255), nullable=True)
    framework_mappings: Mapped[dict] = mapped_column(JSON, default=dict)
    monitoring_enabled: Mapped[bool] = mapped_column(Boolean, default=False)
    metadata_: Mapped[dict] = mapped_column("metadata", JSON, default=dict)


class Dataset(Base, TenantTimestampMixin):
    __tablename__ = "datasets"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    org_id: Mapped[str] = mapped_column(ForeignKey("organizations.id"), index=True, default="demo-org")
    ai_system_id: Mapped[str] = mapped_column(ForeignKey("ai_systems.id"))
    name: Mapped[str] = mapped_column(String(255))
    asset_type: Mapped[str | None] = mapped_column(String(100), nullable=True)
    contains_pii: Mapped[bool] = mapped_column(Boolean, default=False)
    contains_phi: Mapped[bool] = mapped_column(Boolean, default=False)
    jurisdiction: Mapped[str | None] = mapped_column(String(50), nullable=True)
    deidentification_method: Mapped[str | None] = mapped_column(String(100), nullable=True)
    consent_tracking_enabled: Mapped[bool] = mapped_column(Boolean, default=False)
    sensitivity: Mapped[str] = mapped_column(String(50), default="internal")


class ModelVersion(Base, TenantTimestampMixin):
    __tablename__ = "model_versions"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    ai_system_id: Mapped[str] = mapped_column(ForeignKey("ai_systems.id"))
    version: Mapped[str] = mapped_column(String(64))
    framework: Mapped[str | None] = mapped_column(String(100), nullable=True)
    algorithm: Mapped[str | None] = mapped_column(String(100), nullable=True)
    registry_ref: Mapped[str | None] = mapped_column(String(255), nullable=True)
    git_sha: Mapped[str | None] = mapped_column(String(64), nullable=True)
    artifact_uri: Mapped[str | None] = mapped_column(Text, nullable=True)
    parameters: Mapped[dict] = mapped_column(JSON, default=dict)
    metrics: Mapped[dict] = mapped_column(JSON, default=dict)
    metadata_: Mapped[dict] = mapped_column("metadata", JSON, default=dict)


class Control(Base, TenantTimestampMixin):
    __tablename__ = "controls"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    org_id: Mapped[str | None] = mapped_column(ForeignKey("organizations.id"), nullable=True)
    framework: Mapped[str] = mapped_column(String(64))
    code: Mapped[str | None] = mapped_column(String(100), nullable=True)
    title: Mapped[str] = mapped_column(String(255))
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    obligation_type: Mapped[str] = mapped_column(String(50), default="mandatory")
    applicability: Mapped[dict] = mapped_column(JSON, default=dict)
    yaml_definition: Mapped[dict] = mapped_column(JSON, default=dict)
    version: Mapped[int] = mapped_column(Integer, default=1)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    superseded_by: Mapped[str | None] = mapped_column(ForeignKey("controls.id"), nullable=True)


class Evidence(Base, TenantTimestampMixin):
    __tablename__ = "evidence"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    org_id: Mapped[str] = mapped_column(ForeignKey("organizations.id"), index=True, default="demo-org")
    ai_system_id: Mapped[str | None] = mapped_column(ForeignKey("ai_systems.id"), nullable=True)
    title: Mapped[str | None] = mapped_column(String(255), nullable=True)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    source: Mapped[str] = mapped_column(String(100))
    evidence_type: Mapped[str] = mapped_column(String(100))
    source_ref: Mapped[str | None] = mapped_column(Text, nullable=True)
    file_key: Mapped[str | None] = mapped_column(Text, nullable=True)
    file_name: Mapped[str | None] = mapped_column(String(255), nullable=True)
    mime_type: Mapped[str | None] = mapped_column(String(100), nullable=True)
    content_hash: Mapped[str | None] = mapped_column(String(128), nullable=True)
    is_locked: Mapped[bool] = mapped_column(Boolean, default=False)
    payload: Mapped[dict] = mapped_column(JSON, default=dict)
    metadata_: Mapped[dict] = mapped_column("metadata", JSON, default=dict)


class Workflow(Base, TenantTimestampMixin):
    __tablename__ = "workflows"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    org_id: Mapped[str] = mapped_column(ForeignKey("organizations.id"), index=True, default="demo-org")
    name: Mapped[str] = mapped_column(String(255))
    status: Mapped[str] = mapped_column(String(100))
    ai_system_id: Mapped[str | None] = mapped_column(ForeignKey("ai_systems.id"), nullable=True)
    assessment_id: Mapped[str | None] = mapped_column(String(64), nullable=True)


class Task(Base, TenantTimestampMixin):
    __tablename__ = "tasks"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    org_id: Mapped[str] = mapped_column(ForeignKey("organizations.id"), index=True, default="demo-org")
    workflow_id: Mapped[str | None] = mapped_column(ForeignKey("workflows.id"), nullable=True)
    ai_system_id: Mapped[str | None] = mapped_column(ForeignKey("ai_systems.id"), nullable=True)
    assessment_id: Mapped[str | None] = mapped_column(String(64), nullable=True)
    task_type: Mapped[str | None] = mapped_column(String(100), nullable=True)
    title: Mapped[str] = mapped_column(String(255))
    assignee_id: Mapped[str | None] = mapped_column(ForeignKey("users.id"), nullable=True)
    status: Mapped[str] = mapped_column(String(100), default="open")
    priority: Mapped[str] = mapped_column(String(50), default="medium")
    due_date: Mapped[Date | None] = mapped_column(Date, nullable=True)
    form_data: Mapped[dict] = mapped_column(JSON, default=dict)


class AuditLog(Base, TenantTimestampMixin):
    __tablename__ = "audit_logs"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    org_id: Mapped[str | None] = mapped_column(ForeignKey("organizations.id"), nullable=True)
    user_id: Mapped[str] = mapped_column(String(64))
    action: Mapped[str] = mapped_column(String(255))
    entity: Mapped[str] = mapped_column(String(255))
    resource_id: Mapped[str | None] = mapped_column(String(64), nullable=True)
    change_set: Mapped[dict] = mapped_column(JSON, default=dict)
    before_data: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    after_data: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    immutable_hash: Mapped[str] = mapped_column(String(128))
    ip_address: Mapped[str | None] = mapped_column(String(50), nullable=True)


class ComplianceAssessment(Base, TenantTimestampMixin):
    __tablename__ = "compliance_assessments"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    org_id: Mapped[str] = mapped_column(ForeignKey("organizations.id"), index=True, default="demo-org")
    ai_system_id: Mapped[str] = mapped_column(ForeignKey("ai_systems.id"))
    framework: Mapped[str | None] = mapped_column(String(100), nullable=True)
    name: Mapped[str] = mapped_column(String(255))
    status: Mapped[str] = mapped_column(String(50), default="in_progress")
    score: Mapped[float | None] = mapped_column(Numeric(5, 2), nullable=True)
    last_run_at: Mapped[DateTime | None] = mapped_column(DateTime, nullable=True)
    owner_id: Mapped[str | None] = mapped_column(ForeignKey("users.id"), nullable=True)


class ControlAssessment(Base, TenantTimestampMixin):
    __tablename__ = "control_assessments"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    assessment_id: Mapped[str] = mapped_column(ForeignKey("compliance_assessments.id"))
    control_id: Mapped[str] = mapped_column(ForeignKey("controls.id"))
    status: Mapped[str] = mapped_column(String(50), default="not_assessed")
    auto_status: Mapped[str | None] = mapped_column(String(50), nullable=True)
    auto_run_at: Mapped[DateTime | None] = mapped_column(DateTime, nullable=True)
    manual_override: Mapped[str | None] = mapped_column(String(50), nullable=True)
    override_reason: Mapped[str | None] = mapped_column(Text, nullable=True)
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)


class EvidenceControlLink(Base, TenantTimestampMixin):
    __tablename__ = "evidence_control_links"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    evidence_id: Mapped[str] = mapped_column(ForeignKey("evidence.id"))
    control_id: Mapped[str] = mapped_column(ForeignKey("controls.id"))
    relevance: Mapped[str] = mapped_column(String(50), default="supports")
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)


class ClinicalDecisionSupportSystem(Base, TenantTimestampMixin):
    __tablename__ = "clinical_ai_systems"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    ai_system_id: Mapped[str] = mapped_column(ForeignKey("ai_systems.id"), unique=True)
    intended_use: Mapped[str | None] = mapped_column(Text, nullable=True)
    clinical_type: Mapped[str | None] = mapped_column(String(100), nullable=True)
    clinical_risk_class: Mapped[str | None] = mapped_column(String(50), nullable=True)
    intended_setting: Mapped[str | None] = mapped_column(String(100), nullable=True)
    target_population: Mapped[str | None] = mapped_column(Text, nullable=True)
    failure_mode_desc: Mapped[str | None] = mapped_column(Text, nullable=True)
    fallback_procedure: Mapped[str | None] = mapped_column(Text, nullable=True)
    abdm_integrated: Mapped[bool] = mapped_column(Boolean, default=False)
    abha_id_handling: Mapped[str] = mapped_column(String(50), default="none")
    consent_framework: Mapped[str | None] = mapped_column(String(100), nullable=True)
    validation_status: Mapped[str] = mapped_column(String(100), default="not_validated")


class ValidationStudy(Base, TenantTimestampMixin):
    __tablename__ = "validation_studies"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    org_id: Mapped[str] = mapped_column(ForeignKey("organizations.id"), index=True, default="demo-org")
    ai_system_id: Mapped[str] = mapped_column(ForeignKey("ai_systems.id"))
    study_type: Mapped[str | None] = mapped_column(String(100), nullable=True)
    study_name: Mapped[str] = mapped_column(String(255))
    n_patients: Mapped[int | None] = mapped_column(Integer, nullable=True)
    primary_metric: Mapped[str | None] = mapped_column(String(100), nullable=True)
    primary_metric_val: Mapped[float | None] = mapped_column(Numeric(8, 4), nullable=True)
    external_validation: Mapped[bool] = mapped_column(Boolean, default=False)
    irb_reference: Mapped[str | None] = mapped_column(String(255), nullable=True)


class ClinicalIncident(Base, TenantTimestampMixin):
    __tablename__ = "clinical_incidents"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    org_id: Mapped[str] = mapped_column(ForeignKey("organizations.id"), index=True, default="demo-org")
    ai_system_id: Mapped[str] = mapped_column(ForeignKey("ai_systems.id"))
    incident_date: Mapped[DateTime] = mapped_column(DateTime)
    severity: Mapped[str] = mapped_column(String(50))
    incident_type: Mapped[str] = mapped_column(String(100))
    description: Mapped[str] = mapped_column(Text)
    patient_harm: Mapped[bool] = mapped_column(Boolean, default=False)
    reported_to_regulator: Mapped[bool] = mapped_column(Boolean, default=False)


class FactorySite(Base, TenantTimestampMixin):
    __tablename__ = "factory_sites"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    org_id: Mapped[str] = mapped_column(ForeignKey("organizations.id"), index=True, default="demo-org")
    name: Mapped[str] = mapped_column(String(255))
    location: Mapped[str] = mapped_column(String(255))
    state: Mapped[str | None] = mapped_column(String(100), nullable=True)
    pollution_category: Mapped[str | None] = mapped_column(String(20), nullable=True)
    primary_sector: Mapped[str | None] = mapped_column(String(100), nullable=True)
    is_export_oriented: Mapped[bool] = mapped_column(Boolean, default=False)


class ProcessLine(Base, TenantTimestampMixin):
    __tablename__ = "process_lines"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    factory_site_id: Mapped[str] = mapped_column(ForeignKey("factory_sites.id"))
    name: Mapped[str] = mapped_column(String(255))


class EmissionSource(Base, TenantTimestampMixin):
    __tablename__ = "emission_sources"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    process_line_id: Mapped[str] = mapped_column(ForeignKey("process_lines.id"))
    emission_type: Mapped[str] = mapped_column(String(255))
    threshold_exceeded: Mapped[bool] = mapped_column(Boolean, default=False)


class SiteClearance(Base, TenantTimestampMixin):
    __tablename__ = "site_clearances"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    site_id: Mapped[str] = mapped_column(ForeignKey("factory_sites.id"))
    clearance_type: Mapped[str] = mapped_column(String(100))
    issuing_authority: Mapped[str | None] = mapped_column(String(255), nullable=True)
    reference_number: Mapped[str | None] = mapped_column(String(255), nullable=True)
    valid_until: Mapped[Date | None] = mapped_column(Date, nullable=True)
    status: Mapped[str] = mapped_column(String(50), default="active")


class MSMEEvidenceInbox(Base, TenantTimestampMixin):
    __tablename__ = "msme_evidence_inbox"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    site_id: Mapped[str] = mapped_column(ForeignKey("factory_sites.id"))
    period: Mapped[str] = mapped_column(String(20))
    category: Mapped[str] = mapped_column(String(100))
    item_name: Mapped[str] = mapped_column(String(255))
    due_date: Mapped[Date | None] = mapped_column(Date, nullable=True)
    status: Mapped[str] = mapped_column(String(50), default="pending")
    evidence_id: Mapped[str | None] = mapped_column(ForeignKey("evidence.id"), nullable=True)
