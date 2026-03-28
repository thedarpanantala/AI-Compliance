"""Database base classes and mixins."""
from datetime import datetime
from sqlalchemy.orm import DeclarativeBase, mapped_column, Mapped
from sqlalchemy import DateTime, String


class Base(DeclarativeBase):
    """Declarative base for all ORM models."""


class TenantTimestampMixin:
    """Shared columns for tenant isolation and auditing."""

    tenant_id: Mapped[str] = mapped_column(String(64), index=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )
