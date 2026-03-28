"""Add artifact engine tables.

Revision ID: 004_add_artifact_engine_tables
"""
from alembic import op
import sqlalchemy as sa


revision = "004_add_artifact_engine_tables"
down_revision = "003_add_compliance_assessments"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "artifact_templates",
        sa.Column("id", sa.String(length=64), primary_key=True),
        sa.Column("tenant_id", sa.String(length=64), nullable=False),
        sa.Column("org_id", sa.String(length=64), nullable=True),
        sa.Column("template_id", sa.String(length=120), nullable=False, unique=True),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.Column("jurisdiction", sa.String(length=120), nullable=False),
        sa.Column("target_audience", sa.String(length=64), nullable=False, server_default="regulator"),
        sa.Column("required_fields", sa.JSON(), nullable=False, server_default="{}"),
        sa.Column("template_path", sa.String(length=255), nullable=False),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column("created_at", sa.DateTime(), server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(), server_default=sa.func.now()),
    )

    op.create_table(
        "generated_artifacts",
        sa.Column("id", sa.String(length=64), primary_key=True),
        sa.Column("tenant_id", sa.String(length=64), nullable=False),
        sa.Column("org_id", sa.String(length=64), nullable=False),
        sa.Column("template_id", sa.String(length=120), nullable=False),
        sa.Column("system_id", sa.String(length=120), nullable=False),
        sa.Column("evidence_bundle_id", sa.String(length=120), nullable=False),
        sa.Column("jurisdiction", sa.String(length=120), nullable=False),
        sa.Column("audience", sa.String(length=64), nullable=False),
        sa.Column("status", sa.String(length=64), nullable=False, server_default="draft"),
        sa.Column("llm_provider", sa.String(length=64), nullable=False, server_default="claude-3.5-sonnet"),
        sa.Column("output_format", sa.String(length=32), nullable=False, server_default="json"),
        sa.Column("output_payload", sa.JSON(), nullable=False, server_default="{}"),
        sa.Column("validation_result", sa.JSON(), nullable=False, server_default="{}"),
        sa.Column("audit_embed", sa.JSON(), nullable=False, server_default="{}"),
        sa.Column("created_at", sa.DateTime(), server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(), server_default=sa.func.now()),
    )

    op.create_table(
        "control_mappings",
        sa.Column("id", sa.String(length=64), primary_key=True),
        sa.Column("tenant_id", sa.String(length=64), nullable=False),
        sa.Column("org_id", sa.String(length=64), nullable=True),
        sa.Column("indian_control", sa.String(length=160), nullable=False),
        sa.Column("eu_equivalent", sa.JSON(), nullable=False, server_default="[]"),
        sa.Column("us_equivalent", sa.JSON(), nullable=False, server_default="[]"),
        sa.Column("confidence_score", sa.Float(), nullable=False, server_default="0.5"),
        sa.Column("evidence_transform", sa.Text(), nullable=False),
        sa.Column("transformation_steps", sa.JSON(), nullable=False, server_default="{}"),
        sa.Column("created_at", sa.DateTime(), server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(), server_default=sa.func.now()),
    )


def downgrade() -> None:
    op.drop_table("control_mappings")
    op.drop_table("generated_artifacts")
    op.drop_table("artifact_templates")
