"""Policy engine unit tests."""

from app.policy_engine.engine import evaluate_control


def test_metadata_and_evidence_passes() -> None:
    control_yaml = """
control:
  id: TEST-001
tests:
  - type: metadata_check
    field: monitoring_enabled
    operator: equals
    value: true
  - type: evidence_exists
    evidence_type: validation_study
"""
    result = evaluate_control(
        control_yaml,
        {
            "ai_system": {"monitoring_enabled": True},
            "evidence": [{"evidence_type": "validation_study"}],
        },
    )
    assert result.passed is True
