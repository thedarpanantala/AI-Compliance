"""Add agent usage logs table.

Revision ID: 005_add_agent_usage_logs
"""
from alembic import op
import sqlalchemy as sa


revision = "005_add_agent_usage_logs"
down_revision = "004_add_artifact_engine_tables"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "agent_usage_logs",
        sa.Column("id", sa.String(length=64), primary_key=True),
        sa.Column("tenant_id", sa.String(length=64), nullable=False),
        sa.Column("org_id", sa.String(length=64), nullable=False),
        sa.Column("user_id", sa.String(length=64), nullable=True),
        sa.Column("model", sa.String(length=100), nullable=False),
        sa.Column("input_tokens", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("output_tokens", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("cost_usd", sa.Numeric(10, 6), nullable=False, server_default="0"),
        sa.Column("turns", sa.Integer(), nullable=False, server_default="1"),
        sa.Column("logged_at", sa.DateTime(), nullable=False),
        sa.Column("created_at", sa.DateTime(), server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(), server_default=sa.func.now()),
    )


def downgrade() -> None:
    op.drop_table("agent_usage_logs")
