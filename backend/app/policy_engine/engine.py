"""YAML policy-as-code evaluation engine."""
from dataclasses import dataclass
from typing import Any
import yaml


@dataclass
class PolicyResult:
    control_id: str
    passed: bool
    details: list[str]


def evaluate_control(yaml_text: str, metadata: dict[str, Any], evidence: list[dict[str, Any]]) -> PolicyResult:
    """Evaluate a control YAML against metadata and evidence payloads."""
    doc = yaml.safe_load(yaml_text)
    control_id = doc["control"]["id"]
    details: list[str] = []
    passed = True

    for test in doc.get("tests", []):
        if test["type"] == "metadata_check":
            actual = metadata.get(test["field"])
            expected = test["value"]
            if test["operator"] == "equals" and actual != expected:
                passed = False
                details.append(f"metadata {test['field']} expected {expected} got {actual}")
        if test["type"] == "evidence_exists":
            match = any(e.get("evidence_type") == test["evidence_type"] for e in evidence)
            if not match:
                passed = False
                details.append(f"missing evidence type {test['evidence_type']}")

    if passed:
        details.append("all policy tests passed")
    return PolicyResult(control_id=control_id, passed=passed, details=details)
