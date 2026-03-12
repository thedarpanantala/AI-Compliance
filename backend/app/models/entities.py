"""Core and vertical domain entities for compliance platform."""
from sqlalchemy import String, Text, Boolean, ForeignKey, JSON
from sqlalchemy.orm import Mapped, mapped_column
from app.db.base import Base, TenantTimestampMixin


class Organization(Base, TenantTimestampMixin):
    __tablename__ = "organizations"
    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    name: Mapped[str] = mapped_column(String(255))
    industry: Mapped[str] = mapped_column(String(100))


class User(Base, TenantTimestampMixin):
    __tablename__ = "users"
    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    organization_id: Mapped[str] = mapped_column(ForeignKey("organizations.id"))
    email: Mapped[str] = mapped_column(String(255), unique=True)
    hashed_password: Mapped[str] = mapped_column(String(255))
    role: Mapped[str] = mapped_column(String(100))


class AISystem(Base, TenantTimestampMixin):
    __tablename__ = "ai_systems"
    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    name: Mapped[str] = mapped_column(String(255))
    description: Mapped[str] = mapped_column(Text)
    framework_mappings: Mapped[dict] = mapped_column(JSON, default=dict)
    monitoring_enabled: Mapped[bool] = mapped_column(Boolean, default=False)


class Dataset(Base, TenantTimestampMixin):
    __tablename__ = "datasets"
    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    ai_system_id: Mapped[str] = mapped_column(ForeignKey("ai_systems.id"))
    name: Mapped[str] = mapped_column(String(255))
    consent_tracking_enabled: Mapped[bool] = mapped_column(Boolean, default=False)


class ModelVersion(Base, TenantTimestampMixin):
    __tablename__ = "model_versions"
    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    ai_system_id: Mapped[str] = mapped_column(ForeignKey("ai_systems.id"))
    version: Mapped[str] = mapped_column(String(64))
    metadata: Mapped[dict] = mapped_column(JSON, default=dict)


class Control(Base, TenantTimestampMixin):
    __tablename__ = "controls"
    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    title: Mapped[str] = mapped_column(String(255))
    framework: Mapped[str] = mapped_column(String(64))
    yaml_definition: Mapped[dict] = mapped_column(JSON)


class Evidence(Base, TenantTimestampMixin):
    __tablename__ = "evidence"
    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    ai_system_id: Mapped[str] = mapped_column(ForeignKey("ai_systems.id"))
    source: Mapped[str] = mapped_column(String(100))
    evidence_type: Mapped[str] = mapped_column(String(100))
    payload: Mapped[dict] = mapped_column(JSON, default=dict)


class Workflow(Base, TenantTimestampMixin):
    __tablename__ = "workflows"
    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    name: Mapped[str] = mapped_column(String(255))
    status: Mapped[str] = mapped_column(String(100))


class Task(Base, TenantTimestampMixin):
    __tablename__ = "tasks"
    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    workflow_id: Mapped[str] = mapped_column(ForeignKey("workflows.id"))
    title: Mapped[str] = mapped_column(String(255))
    assignee_id: Mapped[str] = mapped_column(String(64), nullable=True)
    status: Mapped[str] = mapped_column(String(100), default="open")


class AuditLog(Base, TenantTimestampMixin):
    __tablename__ = "audit_logs"
    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    user_id: Mapped[str] = mapped_column(String(64))
    action: Mapped[str] = mapped_column(String(255))
    entity: Mapped[str] = mapped_column(String(255))
    change_set: Mapped[dict] = mapped_column(JSON, default=dict)
    immutable_hash: Mapped[str] = mapped_column(String(128))


class ClinicalDecisionSupportSystem(Base, TenantTimestampMixin):
    __tablename__ = "clinical_ai_systems"
    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    ai_system_id: Mapped[str] = mapped_column(ForeignKey("ai_systems.id"))
    intended_use: Mapped[str] = mapped_column(Text)
    validation_status: Mapped[str] = mapped_column(String(100))


class DiagnosticModel(Base, TenantTimestampMixin):
    __tablename__ = "diagnostic_models"
    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    clinical_system_id: Mapped[str] = mapped_column(ForeignKey("clinical_ai_systems.id"))
    diagnosis_domain: Mapped[str] = mapped_column(String(255))
    validation_studies: Mapped[dict] = mapped_column(JSON, default=dict)


class FactorySite(Base, TenantTimestampMixin):
    __tablename__ = "factory_sites"
    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    name: Mapped[str] = mapped_column(String(255))
    location: Mapped[str] = mapped_column(String(255))


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
