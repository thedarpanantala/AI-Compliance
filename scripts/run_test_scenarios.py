import os
import sys
import json

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'backend')))
os.environ["JWT_SECRET"] = "test-secret-key"
os.environ["SUPABASE_URL"] = "http://localhost:8000"
os.environ["SUPABASE_KEY"] = "mock"

from fastapi.testclient import TestClient
from app.main import app

def run():
    client = TestClient(app)
    results = []

    print("Running SCENARIO 3: Cross-Sector Quick API Test Sequence...")
    
    # 1. Health check
    r1 = client.get("/health")
    results.append({"step": "1. Health check", "status": r1.status_code, "resp": r1.json() if r1.content else "no-content"})

    headers = {"Authorization": "Bearer TOKEN"}

    # 2. Register hospital AI system
    payload2 = {"id":"sys-cxr-001","org_id":"demo-org","name":"ChestScan AI v3.1","description":"Chest X-ray AI for pneumonia and TB detection","system_type":"predictive_model","risk_tier":"high","monitoring_enabled":True}
    r2 = client.post("/api/ai-systems", json=payload2, headers=headers)
    results.append({"step": "2. Register system", "status": r2.status_code, "resp": r2.json() if r2.content else "no-content"})

    # 3. Attach evidence
    payload3 = {"id":"ev-001","org_id":"demo-org","ai_system_id":"sys-cxr-001","title":"Internal Pilot Study 200 cases","source":"manual","evidence_type":"test_result","payload":{"tags":["validation_study","internal_only"],"auc_roc":0.87}}
    r3 = client.post("/api/evidence", json=payload3, headers=headers)
    results.append({"step": "3. Attach evidence", "status": r3.status_code, "resp": r3.json() if r3.content else "no-content"})

    # 4. Create compliance assessment
    payload4 = {"id":"asmt-001","org_id":"demo-org","ai_system_id":"sys-cxr-001","framework":"HEALTH_AI_IN_v1","name":"NABH Audit Prep Assessment"}
    r4 = client.post("/api/compliance/assessments", json=payload4, headers=headers)
    results.append({"step": "4. Create assessment", "status": r4.status_code, "resp": r4.json() if r4.content else "no-content"})

    # 5. Run compliance scan
    payload5 = {"ai_system_id":"sys-cxr-001","framework":"EU_AI_ACT"}
    r5 = client.post("/api/compliance/run", json=payload5, headers=headers)
    results.append({"step": "5. Run scan", "status": r5.status_code, "resp": r5.json() if r5.content else "no-content"})

    # 6. Ask agent about gaps
    payload6 = {"message":"ChestScan AI is a Class II diagnostic AI for TB and pneumonia detection in a Pune hospital. What are the 5 most urgent compliance gaps?","history":[]}
    r6 = client.post("/api/agent/standalone", json=payload6)
    results.append({"step": "6. Ask agent", "status": r6.status_code, "resp": r6.json() if r6.content else "no-content"})

    # 7. Generate artifact
    payload7 = {"template_id":"clinical_risk_assessment","system_id":"sys-cxr-001","evidence_bundle_id":"ev-001","jurisdiction":"IN","target_audience":"NABH_auditor"}
    r7 = client.post("/api/generate-artifact", json=payload7, headers=headers)
    results.append({"step": "7. Generate artifact", "status": r7.status_code, "resp": r7.json() if r7.content else "no-content"})

    # 8. Map controls
    payload8 = {"indian_control":"CDSCO SaMD registration requirement for Class II AI diagnostic device","evidence":{"system_id":"sys-cxr-001","risk_tier":"high"},"target_jurisdiction":"EU"}
    r8 = client.post("/api/map-controls", json=payload8, headers=headers)
    results.append({"step": "8. Map controls", "status": r8.status_code, "resp": r8.json() if r8.content else "no-content"})

    # 9. ABDM consent bridge
    payload9 = {"system_id":"sys-cxr-001","patient_abha_id":"test-hashed-id","purpose":"diagnostic_ai_screening","org_id":"demo-org"}
    r9 = client.post("/api/abdm-consent-bridge", json=payload9)
    results.append({"step": "9. ABDM consent bridge", "status": r9.status_code, "resp": r9.json() if r9.content else "no-content"})

    # 10. List all systems
    r10 = client.get("/api/ai-systems", headers=headers)
    results.append({"step": "10. List systems", "status": r10.status_code, "resp": r10.json() if r10.content else "no-content"})

    out_path = os.path.join(os.path.dirname(__file__), '..', "test_results.json")
    with open(out_path, "w") as f:
        json.dump(results, f, indent=2)

    print("Finished running sequence. Results written to test_results.json")

if __name__ == "__main__":
    run()
