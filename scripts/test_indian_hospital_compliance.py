import os
import sys

# Add backend directory to sys.path so we can import app
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'backend')))

from app.policy_engine.engine import evaluate_control

def main():
    policy_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'policy_library', 'india_dpdpa', 'dpdpa_consent.yaml'))
    with open(policy_path, "r") as f:
        control_yaml = f.read()

    print("Testing Compliance for an Indian Hospital against DPDPA rules...")

    # Test 1: Compliant Hospital
    compliant_metadata = {
        "ai_system": {"consent_recorded": True},
        "evidence": [{"evidence_type": "abdm_token_audit"}]
    }
    result_compliant = evaluate_control(control_yaml, compliant_metadata)
    print(f"[TEST 1] Compliant Hospital Passed: {result_compliant.passed}")
    if not result_compliant.passed:
        print(f"Details: {result_compliant.details}")

    # Test 2: Non-compliant Hospital (Missing abdm_token_audit evidence)
    non_compliant_metadata = {
        "ai_system": {"consent_recorded": True},
        "evidence": [{"evidence_type": "general_logging"}]
    }
    result_non_compliant = evaluate_control(control_yaml, non_compliant_metadata)
    print(f"[TEST 2] Non-compliant Hospital (missing evidence) Passed: {result_non_compliant.passed}")
    if not result_non_compliant.passed:
        print(f"Details: {result_non_compliant.details}")
        
    # Test 3: Non-compliant Hospital (consent_recorded is False)
    non_compliant_metadata2 = {
        "ai_system": {"consent_recorded": False},
        "evidence": [{"evidence_type": "abdm_token_audit"}]
    }
    result_non_compliant2 = evaluate_control(control_yaml, non_compliant_metadata2)
    print(f"[TEST 3] Non-compliant Hospital (failed metadata check) Passed: {result_non_compliant2.passed}")
    if not result_non_compliant2.passed:
        print(f"Details: {result_non_compliant2.details}")

    assert result_compliant.passed is True, "Compliant hospital should pass."
    assert result_non_compliant.passed is False, "Hospital missing evidence should fail."
    assert result_non_compliant2.passed is False, "Hospital with consent_recorded=False should fail."
    
    print("\nAll Hospital Compliance Tests Passed Successfully!")

if __name__ == "__main__":
    main()
