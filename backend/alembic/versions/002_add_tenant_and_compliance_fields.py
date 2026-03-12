"""Add additive tenant and compliance fields.

Revision ID: 002_add_tenant_and_compliance_fields
"""
from alembic import op
import sqlalchemy as sa


revision = "002_add_tenant_and_compliance_fields"
down_revision = None
branch_labels = None
depends_on = None


TABLES = ["ai_systems", "datasets", "evidence", "workflows", "tasks"]


def upgrade() -> None:
    for table in TABLES:
        op.add_column(table, sa.Column("org_id", sa.String(length=64), nullable=True))

    op.add_column("ai_systems", sa.Column("status", sa.String(length=50), server_default="draft"))
    op.add_column("ai_systems", sa.Column("risk_tier", sa.String(length=50), nullable=True))
    op.add_column("ai_systems", sa.Column("system_type", sa.String(length=100), nullable=True))
    op.add_column("ai_systems", sa.Column("owner_user_id", sa.String(length=64), nullable=True))
    op.add_column("ai_systems", sa.Column("version", sa.String(length=64), nullable=True))
    op.add_column("ai_systems", sa.Column("external_id", sa.String(length=255), nullable=True))

    op.add_column("organizations", sa.Column("slug", sa.String(length=100), nullable=True))
    op.add_column("organizations", sa.Column("plan", sa.String(length=50), server_default="starter"))
    op.add_column("organizations", sa.Column("data_region", sa.String(length=10), server_default="in"))

    op.add_column("controls", sa.Column("code", sa.String(length=100), nullable=True))
    op.add_column("controls", sa.Column("obligation_type", sa.String(length=50), server_default="mandatory"))
    op.add_column("controls", sa.Column("version", sa.Integer(), server_default="1"))
    op.add_column("controls", sa.Column("is_active", sa.Boolean(), server_default=sa.true()))
    op.add_column("controls", sa.Column("applicability", sa.JSON(), server_default="{}"))

    op.add_column("evidence", sa.Column("title", sa.String(length=255), nullable=True))
    op.add_column("evidence", sa.Column("content_hash", sa.String(length=128), nullable=True))
    op.add_column("evidence", sa.Column("is_locked", sa.Boolean(), server_default=sa.false()))
    op.add_column("evidence", sa.Column("source_ref", sa.Text(), nullable=True))
    op.add_column("evidence", sa.Column("file_key", sa.Text(), nullable=True))
    op.add_column("evidence", sa.Column("mime_type", sa.String(length=100), nullable=True))


def downgrade() -> None:
    raise NotImplementedError("Data-additive migration is irreversible by design")
