"""Add assessment and vertical support tables.

Revision ID: 003_add_compliance_assessments
"""
from alembic import op
import sqlalchemy as sa


revision = "003_add_compliance_assessments"
down_revision = "002_add_tenant_and_compliance_fields"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "compliance_assessments",
        sa.Column("id", sa.String(length=64), primary_key=True),
        sa.Column("tenant_id", sa.String(length=64), nullable=False),
        sa.Column("org_id", sa.String(length=64), nullable=False),
        sa.Column("ai_system_id", sa.String(length=64), nullable=False),
        sa.Column("framework", sa.String(length=100), nullable=True),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.Column("status", sa.String(length=50), server_default="in_progress"),
        sa.Column("score", sa.Numeric(5, 2), nullable=True),
        sa.Column("created_at", sa.DateTime(), server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(), server_default=sa.func.now()),
    )

    op.create_table(
        "control_assessments",
        sa.Column("id", sa.String(length=64), primary_key=True),
        sa.Column("tenant_id", sa.String(length=64), nullable=False),
        sa.Column("assessment_id", sa.String(length=64), nullable=False),
        sa.Column("control_id", sa.String(length=64), nullable=False),
        sa.Column("status", sa.String(length=50), server_default="not_assessed"),
        sa.Column("auto_status", sa.String(length=50), nullable=True),
        sa.Column("notes", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(), server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(), server_default=sa.func.now()),
    )

    op.create_table(
        "evidence_control_links",
        sa.Column("id", sa.String(length=64), primary_key=True),
        sa.Column("tenant_id", sa.String(length=64), nullable=False),
        sa.Column("evidence_id", sa.String(length=64), nullable=False),
        sa.Column("control_id", sa.String(length=64), nullable=False),
        sa.Column("relevance", sa.String(length=50), server_default="supports"),
        sa.Column("created_at", sa.DateTime(), server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(), server_default=sa.func.now()),
    )


def downgrade() -> None:
    op.drop_table("evidence_control_links")
    op.drop_table("control_assessments")
    op.drop_table("compliance_assessments")
