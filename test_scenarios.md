# AI Compliance Platform — Test Scenarios & Dummy Data
## Real-World Problem Statements + Complete Test Cases

---

# SCENARIO 1: Indian Hospital — Healthcare AI

## Problem Statement

**Organisation:** Sahyadri Hospitals, Pune
**Problem:** Sahyadri has deployed 3 AI systems across their hospital network
over the last 18 months — a radiology AI for chest X-ray analysis, a
sepsis prediction model in ICU, and a triage chatbot in their telemedicine
app. Their NABH accreditation audit is in 6 weeks. The CDSCO inspector
visited last month and asked for SaMD documentation they don't have.
Their IT team just discovered the telemedicine app sends patient data
to a US-based model API without an explicit DPDPA consent mechanism.
The compliance officer has no idea which documents are missing, which
AI systems are high-risk, or where to start.

**What the platform must do:**
- Register all 3 AI systems with correct risk classification
- Run compliance checks against CDSCO, DPDPA, ABDM, and clinical AI controls
- Identify missing documents for each system
- Generate the compliance gap report
- Let the agent answer specific questions about what to do next

---

## Dummy Data — Sahyadri Hospital

### Organisation
```json
{
  "id": "org-sahyadri-pune-001",
  "name": "Sahyadri Hospitals Pvt Ltd",
  "industry": "healthcare",
  "data_region": "in"
}
```

### AI System 1 — Chest X-Ray AI (highest risk)
```json
{
  "id": "sys-cxr-001",
  "org_id": "org-sahyadri-pune-001",
  "name": "ChestScan AI v3.1",
  "description": "Automated detection of pneumonia, TB, and pleural effusion from chest X-rays. Used by radiologists in 4 hospital branches.",
  "system_type": "predictive_model",
  "risk_tier": "high",
  "monitoring_enabled": true,
  "metadata": {
    "clinical_type": "diagnosis",
    "intended_setting": "hospital",
    "target_population": "Adults 18+, inpatient and outpatient",
    "clinical_risk_class": "class_ii",
    "abdm_integrated": false,
    "consent_framework": "informed_digital",
    "fallback_procedure": "Manual radiologist review without AI assistance",
    "human_oversight_enabled": true,
    "vendor": "RadAI Technologies Bangalore",
    "deployment_date": "2023-06-15",
    "last_validation_date": null,
    "cdsco_registered": false,
    "training_data_source": "AIIMS Delhi dataset + proprietary data",
    "training_data_deidentified": true
  }
}
```

### AI System 2 — ICU Sepsis Predictor (critical risk)
```json
{
  "id": "sys-sepsis-001",
  "org_id": "org-sahyadri-pune-001",
  "name": "SepsisAlert ICU Model",
  "description": "Real-time sepsis risk prediction using vitals, lab values, and nursing notes. Alerts ICU nurses when sepsis probability exceeds 70%.",
  "system_type": "predictive_model",
  "risk_tier": "high",
  "monitoring_enabled": false,
  "metadata": {
    "clinical_type": "risk_stratification",
    "intended_setting": "hospital",
    "target_population": "ICU patients, all ages",
    "clinical_risk_class": "class_iii",
    "abdm_integrated": false,
    "consent_framework": null,
    "fallback_procedure": null,
    "human_oversight_enabled": false,
    "vendor": "Internal ML team",
    "deployment_date": "2024-01-10",
    "last_validation_date": null,
    "cdsco_registered": false,
    "phi_used": true,
    "training_data_source": "Sahyadri ICU records 2019-2023",
    "training_data_deidentified": false,
    "irb_approval": false
  }
}
```

### AI System 3 — Telemedicine Triage Bot (moderate risk)
```json
{
  "id": "sys-triage-001",
  "org_id": "org-sahyadri-pune-001",
  "name": "Sahyadri TeleHealth Triage Bot",
  "description": "WhatsApp and app-based symptom checker and triage bot for outpatient telemedicine. Routes patients to appropriate care level.",
  "system_type": "decision_support",
  "risk_tier": "limited",
  "monitoring_enabled": true,
  "metadata": {
    "clinical_type": "triage",
    "intended_setting": "telemedicine",
    "target_population": "General population, all ages including minors",
    "clinical_risk_class": "class_i",
    "abdm_integrated": true,
    "abha_id_handling": "hashed_ref",
    "consent_framework": "informed_digital",
    "fallback_procedure": "Direct call to hospital helpline",
    "human_oversight_enabled": true,
    "vendor": "HealthBot Solutions Mumbai",
    "deployment_date": "2023-11-20",
    "data_sent_to": "US-based GPT API",
    "dpdpa_consent_for_cross_border": false,
    "languages_supported": ["English", "Hindi", "Marathi"]
  }
}
```

### Evidence Items (what they HAVE — intentionally incomplete)
```json
[
  {
    "id": "ev-001",
    "org_id": "org-sahyadri-pune-001",
    "ai_system_id": "sys-cxr-001",
    "title": "Vendor Technical Specification Sheet",
    "evidence_type": "document",
    "source": "manual",
    "payload": {"tags": ["technical_spec", "vendor_doc"]}
  },
  {
    "id": "ev-002",
    "org_id": "org-sahyadri-pune-001",
    "ai_system_id": "sys-cxr-001",
    "title": "Internal Pilot Study Report — 200 cases",
    "evidence_type": "test_result",
    "source": "manual",
    "payload": {
      "tags": ["validation_study", "internal_only"],
      "n_patients": 200,
      "auc_roc": 0.87,
      "external_validation": false
    }
  },
  {
    "id": "ev-003",
    "org_id": "org-sahyadri-pune-001",
    "ai_system_id": "sys-triage-001",
    "title": "ABDM Integration Certificate",
    "evidence_type": "document",
    "source": "manual",
    "payload": {"tags": ["abdm", "integration_cert"]}
  },
  {
    "id": "ev-004",
    "org_id": "org-sahyadri-pune-001",
    "ai_system_id": "sys-sepsis-001",
    "title": "Model Training Notebook",
    "evidence_type": "document",
    "source": "github",
    "payload": {"tags": ["training_code", "internal"]}
  }
]
```

### What Is MISSING (the gap — this is what the platform should find)
```
ChestScan AI (sys-cxr-001):
  ❌ CDSCO SaMD registration certificate
  ❌ External/prospective clinical validation study
  ❌ IRB/Ethics committee approval
  ❌ Clinical Risk Assessment document
  ❌ Model card / AI datasheet
  ❌ Bias evaluation across demographics (age, gender, TB prevalence by region)
  ❌ Incident reporting mechanism documented
  ❌ Post-market surveillance plan

SepsisAlert (sys-sepsis-001):
  ❌ DPDPA consent mechanism (uses raw PHI with no consent)
  ❌ De-identification documentation (training on raw patient data)
  ❌ IRB approval
  ❌ ANY clinical validation study
  ❌ Fallback procedure when AI unavailable
  ❌ Human oversight declaration
  ❌ CDSCO registration
  ❌ Clinical Risk Assessment
  ❌ Data retention policy

TeleHealth Bot (sys-triage-001):
  ❌ DPDPA cross-border transfer consent (data sent to US without consent)
  ❌ Data Processing Agreement with US vendor
  ❌ Minor patient handling policy (bot used by all ages)
  ❌ Clinical validation for triage accuracy
  ❌ Incident log for wrong triage decisions
```

---

## Test Cases — Sahyadri Hospital

### TC-01: Agent identifies highest priority compliance gap

**Input to agent:**
```json
{
  "message": "Which of our 3 AI systems has the most urgent compliance issue that needs to be fixed before our NABH audit in 6 weeks?",
  "org_id": "org-sahyadri-pune-001",
  "system_id": null,
  "history": []
}
```

**Expected agent response should mention:**
- SepsisAlert is most critical — Class III device, no DPDPA consent, raw PHI in training, no IRB
- Cross-border data transfer in triage bot is an immediate DPDPA violation
- Specific regulation citations: DPDPA Section 7, CDSCO SaMD guidance 2022

---

### TC-02: Agent drafts DPDPA consent notice

**Input:**
```json
{
  "message": "Draft a DPDPA-compliant consent notice for patients whose data is processed by our SepsisAlert ICU model",
  "org_id": "org-sahyadri-pune-001",
  "system_id": "sys-sepsis-001",
  "history": []
}
```

**Expected:** A complete consent notice document mentioning:
- Purpose of processing (sepsis risk prediction)
- Data categories collected (vitals, lab values, nursing notes)
- Retention period
- Patient rights under DPDPA (access, correction, erasure)
- Contact details of Data Fiduciary
- Option to withdraw consent

---

### TC-03: Compliance check finds missing CDSCO registration

**API call:**
```
POST /api/compliance/run
{
  "ai_system_id": "sys-cxr-001",
  "framework": "HEALTH_AI_IN_v1"
}
```

**Expected result:**
```json
{
  "passed": false,
  "details": [
    {"control": "HLTAI-IN-CDSCO-001", "status": "non_compliant", "reason": "No CDSCO SaMD registration evidence found"},
    {"control": "HLTAI-GLOBAL-002", "status": "non_compliant", "reason": "No external validation study. Only internal pilot (200 cases) found"},
    {"control": "HLTAI-DATA-004", "status": "partially_compliant", "reason": "Training data deidentified but no method documented"}
  ]
}
```

---

### TC-04: Agent generates clinical risk assessment document

**Input:**
```json
{
  "message": "Generate a complete clinical risk assessment document for ChestScan AI that I can submit to NABH auditors",
  "org_id": "org-sahyadri-pune-001",
  "system_id": "sys-cxr-001",
  "history": []
}
```

**Expected:** Full document with sections:
1. System identification and purpose
2. Clinical indication and target population
3. Risk classification (Class II SaMD under CDSCO)
4. Failure mode analysis
5. Existing controls and mitigations
6. Residual risk assessment
7. Required additional evidence before production use
8. Sign-off declaration

---

### TC-05: Agent explains cross-border transfer violation

**Input:**
```json
{
  "message": "Our triage bot sends patient symptom data to a US-based API. Is this a problem under Indian law?",
  "org_id": "org-sahyadri-pune-001",
  "system_id": "sys-triage-001",
  "history": []
}
```

**Expected response mentions:**
- DPDPA Section 16 — cross-border data transfer restrictions
- Need for explicit consent specifically for cross-border transfer
- Data Processing Agreement required with US vendor
- MeitY notification requirements
- Immediate remediation steps: get DPA signed, add consent layer

---

---

# SCENARIO 2: MSME Textile Factory — Manufacturing

## Problem Statement

**Organisation:** Rajlakshmi Textiles, Surat, Gujarat
**Problem:** Rajlakshmi is a 450-employee textile dyeing and printing unit
supplying to H&M, Zara, and Decathlon. Their GPCB (Gujarat Pollution
Control Board) consent to operate expires in 3 months. They have
installed an AI-based effluent treatment monitoring system last year
but have no documentation for it. H&M's sustainability team just sent
a 40-question ESG questionnaire asking for Scope 1/2 emissions data,
chemical inventory, and wastewater parameters — they have 30 days to
respond or lose the contract. Their ETP has been showing elevated COD
levels for 2 months but no formal incident has been logged.

**What the platform must do:**
- Register factory site with Red category pollution status
- Register AI monitoring system
- Run environmental compliance checks
- Identify overdue evidence uploads
- Generate GPCB compliance snapshot
- Help answer H&M ESG questionnaire

---

## Dummy Data — Rajlakshmi Textiles

### Organisation
```json
{
  "id": "org-rajlakshmi-surat-001",
  "name": "Rajlakshmi Textiles Pvt Ltd",
  "industry": "textile_manufacturing",
  "data_region": "in"
}
```

### Factory Site
```json
{
  "id": "site-rajlakshmi-surat-001",
  "org_id": "org-rajlakshmi-surat-001",
  "name": "Rajlakshmi Dyeing Unit — Surat Main Plant",
  "location": "GIDC Sachin, Surat, Gujarat 394230",
  "state": "Gujarat",
  "district": "Surat",
  "gst_number": "24AABCR1234F1Z5",
  "pollution_category": "red",
  "primary_sector": "textile",
  "sub_sector": "dyeing_and_printing",
  "employee_count": 450,
  "is_export_oriented": true,
  "export_markets": ["EU", "UK", "US"],
  "certifications": ["GOTS", "OekoTex_100"],
  "metadata": {
    "etp_capacity_kld": 500,
    "water_consumption_kld": 450,
    "chemical_storage_tonnes": 85,
    "annual_turnover_cr": 42,
    "cto_valid_until": "2025-06-30",
    "cte_number": "GPCB/CTE/2019/04521",
    "cto_number": "GPCB/CTO/2022/08834"
  }
}
```

### AI System — ETP Monitoring
```json
{
  "id": "sys-etp-monitor-001",
  "org_id": "org-rajlakshmi-surat-001",
  "name": "ETP Smart Monitor v2",
  "description": "IoT + ML system monitoring effluent treatment plant parameters in real-time. Predicts COD/BOD breaches 4 hours in advance and alerts operators.",
  "system_type": "predictive_model",
  "risk_tier": "high",
  "monitoring_enabled": true,
  "metadata": {
    "use_case_type": "ehs_monitoring",
    "controls_process": true,
    "safety_critical": true,
    "vendor_name": "GreenTech Analytics Ahmedabad",
    "parameters_monitored": ["COD", "BOD", "pH", "TSS", "TDS", "colour"],
    "alert_threshold_cod": 250,
    "deployment_date": "2023-09-01",
    "human_oversight_enabled": true,
    "override_logging_enabled": false,
    "incident_log_active": false
  }
}
```

### Emission Sources
```json
[
  {
    "id": "src-etp-001",
    "site_id": "site-rajlakshmi-surat-001",
    "source_type": "effluent_point",
    "source_name": "ETP Final Outlet",
    "regulatory_id": "GPCB-ETP-2022-08834-01",
    "parameters": ["COD", "BOD", "pH", "TSS", "TDS", "colour", "temperature"],
    "monitoring_freq": "daily",
    "threshold_exceeded": true,
    "last_reading": {"COD": 312, "BOD": 48, "pH": 8.2, "TSS": 98}
  },
  {
    "id": "src-stack-001",
    "site_id": "site-rajlakshmi-surat-001",
    "source_type": "stack_emission",
    "source_name": "Boiler Stack — 4 TPH",
    "regulatory_id": "GPCB-STACK-2022-08834-01",
    "parameters": ["PM", "SO2", "NOx"],
    "monitoring_freq": "monthly",
    "threshold_exceeded": false
  }
]
```

### Hazardous Chemicals
```json
[
  {"chemical_name": "Reactive Blue 19 (dye)", "cas_number": "2580-78-1", "quantity_kg": 2400, "hazard_class": "environmental_hazard", "msds_on_file": true},
  {"chemical_name": "Sodium Hydrosulphite", "cas_number": "7775-14-6", "quantity_kg": 800, "hazard_class": "flammable_solid", "msds_on_file": true},
  {"chemical_name": "Acetic Acid 98%", "cas_number": "64-19-7", "quantity_kg": 1200, "hazard_class": "corrosive_flammable", "msds_on_file": true},
  {"chemical_name": "Hydrogen Peroxide 35%", "cas_number": "7722-84-1", "quantity_kg": 600, "hazard_class": "oxidizer", "msds_on_file": false},
  {"chemical_name": "Caustic Soda Flakes", "cas_number": "1310-73-2", "quantity_kg": 3500, "hazard_class": "corrosive", "msds_on_file": true}
]
```

### ESG Disclosure Data (incomplete — H&M questionnaire)
```json
{
  "site_id": "site-rajlakshmi-surat-001",
  "reporting_period": "FY2024-25",
  "disclosure_type": "buyer_esg",
  "framework_ref": "HM_Higg_FEM_v3",
  "data_payload": {
    "scope1_emissions_tco2": null,
    "scope2_emissions_tco2": null,
    "water_consumption_kl": 142000,
    "wastewater_recycled_pct": 35,
    "chemical_intensity_kg_per_kg_fabric": null,
    "zero_liquid_discharge": false,
    "renewable_energy_pct": 0,
    "worker_wages_above_minimum": true,
    "overtime_hours_avg_monthly": 28,
    "safety_incidents_fy": 2,
    "training_hours_per_worker": 12
  },
  "verified": false
}
```

### Evidence Inbox — What's Overdue
```json
[
  {"period": "2025-01", "category": "environment", "item_name": "ETP Effluent Lab Report January 2025", "status": "pending", "due_date": "2025-01-31"},
  {"period": "2025-01", "category": "environment", "item_name": "Stack Emission Report January 2025", "status": "pending", "due_date": "2025-01-31"},
  {"period": "2025-02", "category": "environment", "item_name": "ETP Effluent Lab Report February 2025", "status": "pending", "due_date": "2025-02-28"},
  {"period": "2025-02", "category": "environment", "item_name": "Stack Emission Report February 2025", "status": "uploaded", "due_date": "2025-02-28"},
  {"period": "2025-03", "category": "environment", "item_name": "ETP Effluent Lab Report March 2025", "status": "pending", "due_date": "2025-03-31"},
  {"period": "2025-01", "category": "safety", "item_name": "Monthly Safety Drill Record", "status": "pending", "due_date": "2025-01-31"},
  {"period": "2025-02", "category": "safety", "item_name": "Monthly Safety Drill Record", "status": "pending", "due_date": "2025-02-28"},
  {"period": "2024-25", "category": "clearances", "item_name": "GPCB Consent to Operate Renewal Application", "status": "pending", "due_date": "2025-03-31"},
  {"period": "2024-25", "category": "esg", "item_name": "H&M ESG Questionnaire FY2024-25", "status": "pending", "due_date": "2025-04-15"}
]
```

---

## Test Cases — Rajlakshmi Textiles

### TC-06: Platform detects CTO expiry risk

**API call:**
```
GET /api/msme/factory-sites/site-rajlakshmi-surat-001/compliance-snapshot
```

**Expected response includes:**
```json
{
  "clearance_alerts": [
    {
      "clearance_type": "consent_to_operate",
      "issuing_authority": "GPCB",
      "valid_until": "2025-06-30",
      "days_remaining": 90,
      "status": "renewal_required"
    }
  ],
  "inbox_overdue": 6,
  "domains": [
    {"domain": "environment", "status": "non_compliant", "score": 22},
    {"domain": "safety", "status": "partial", "score": 45},
    {"domain": "esg", "status": "not_assessed", "score": 0}
  ]
}
```

---

### TC-07: Agent identifies COD breach as compliance incident

**Input:**
```json
{
  "message": "Our ETP outlet COD reading is 312 mg/L. The GPCB limit is 250 mg/L. What do we need to do?",
  "org_id": "org-rajlakshmi-surat-001",
  "system_id": "sys-etp-monitor-001",
  "history": []
}
```

**Expected response mentions:**
- This is a GPCB consent condition violation
- Must be reported to GPCB within 48 hours (EP Act Section 7)
- Document corrective action taken
- Check if AI monitoring system logged this breach
- Risk of show cause notice and CTO suspension if repeated
- Immediate steps: shut down or reduce dyeing load, check ETP chemicals

---

### TC-08: Agent helps answer H&M ESG questionnaire

**Input:**
```json
{
  "message": "H&M is asking for our Scope 1 and Scope 2 emissions data. We have never calculated this before. How do we calculate it and what data do we need to collect from our factory?",
  "org_id": "org-rajlakshmi-surat-001",
  "history": []
}
```

**Expected response includes:**
- Scope 1: direct emissions from boiler (natural gas/coal consumption × emission factor)
- Scope 2: indirect from purchased electricity (units × grid emission factor for Gujarat = 0.82 kg CO2/kWh)
- Data needed: monthly electricity bills, fuel consumption records, diesel generator usage
- GHG Protocol methodology reference
- CBAM implications for EU textile exports
- Tool suggestion: GHG Protocol Excel calculator (free)

---

### TC-09: Compliance check finds missing AI override logging

**API call:**
```
POST /api/compliance/run
{
  "ai_system_id": "sys-etp-monitor-001",
  "framework": "MSME_AI_IN_v1"
}
```

**Expected:**
```json
{
  "passed": false,
  "details": [
    {
      "control": "MSME-AI-001",
      "status": "non_compliant",
      "reason": "Process-control AI has no override logging evidence. override_logging_enabled=false in metadata"
    },
    {
      "control": "MSME-AI-001b",
      "status": "non_compliant",
      "reason": "Incident log not active. COD breach not formally recorded"
    }
  ]
}
```

---

### TC-10: Agent generates GPCB monthly compliance report

**Input:**
```json
{
  "message": "Generate our GPCB monthly compliance summary for March 2025 that we can submit to the pollution control board",
  "org_id": "org-rajlakshmi-surat-001",
  "system_id": "sys-etp-monitor-001",
  "history": []
}
```

**Expected document includes:**
- Factory identification (name, CTO number, GPCB ID)
- ETP performance parameters for March 2025
- Stack emission readings
- Deviations from consent conditions (COD breach flagged)
- Corrective actions taken
- Water consumption data
- Chemical consumption summary
- Declaration by authorised signatory
- Note: COD breach must be separately reported

---

---

# SCENARIO 3: Cross-Sector — Quick API Test Sequence

## Complete Test Sequence Using curl

Run these commands one after another to test all platform features.
Replace `TOKEN` with your JWT token each time.

```bash
# 1. Health check
curl.exe http://localhost:8000/health

# 2. Register hospital AI system
curl.exe -X POST http://localhost:8000/api/ai-systems -H "Content-Type: application/json" -H "Authorization: Bearer TOKEN" -d "{\"id\":\"sys-cxr-001\",\"org_id\":\"demo-org\",\"name\":\"ChestScan AI v3.1\",\"description\":\"Chest X-ray AI for pneumonia and TB detection\",\"system_type\":\"predictive_model\",\"risk_tier\":\"high\",\"monitoring_enabled\":true}"

# 3. Attach evidence
curl.exe -X POST http://localhost:8000/api/evidence -H "Content-Type: application/json" -H "Authorization: Bearer TOKEN" -d "{\"id\":\"ev-001\",\"org_id\":\"demo-org\",\"ai_system_id\":\"sys-cxr-001\",\"title\":\"Internal Pilot Study 200 cases\",\"source\":\"manual\",\"evidence_type\":\"test_result\",\"payload\":{\"tags\":[\"validation_study\",\"internal_only\"],\"auc_roc\":0.87}}"

# 4. Create compliance assessment
curl.exe -X POST http://localhost:8000/api/compliance/assessments -H "Content-Type: application/json" -H "Authorization: Bearer TOKEN" -d "{\"id\":\"asmt-001\",\"org_id\":\"demo-org\",\"ai_system_id\":\"sys-cxr-001\",\"framework\":\"HEALTH_AI_IN_v1\",\"name\":\"NABH Audit Prep Assessment\"}"

# 5. Run compliance scan
curl.exe -X POST http://localhost:8000/api/compliance/run -H "Content-Type: application/json" -H "Authorization: Bearer TOKEN" -d "{\"ai_system_id\":\"sys-cxr-001\",\"framework\":\"EU_AI_ACT\"}"

# 6. Ask agent about gaps (no token needed)
curl.exe -X POST http://localhost:8000/api/agent/standalone -H "Content-Type: application/json" -d "{\"message\":\"ChestScan AI is a Class II diagnostic AI for TB and pneumonia detection in a Pune hospital. It has only an internal pilot study with 200 cases, no CDSCO registration, and no external validation. What are the 5 most urgent compliance gaps and what documents must be created first?\",\"history\":[]}"

# 7. Generate artifact
curl.exe -X POST http://localhost:8000/api/generate-artifact -H "Content-Type: application/json" -H "Authorization: Bearer TOKEN" -d "{\"template_id\":\"clinical_risk_assessment\",\"system_id\":\"sys-cxr-001\",\"evidence_bundle_id\":\"ev-001\",\"jurisdiction\":\"IN\",\"target_audience\":\"NABH_auditor\"}"

# 8. Map controls
curl.exe -X POST http://localhost:8000/api/map-controls -H "Content-Type: application/json" -H "Authorization: Bearer TOKEN" -d "{\"indian_control\":\"CDSCO SaMD registration requirement for Class II AI diagnostic device\",\"evidence\":{\"system_id\":\"sys-cxr-001\",\"risk_tier\":\"high\"},\"target_jurisdiction\":\"EU\"}"

# 9. ABDM consent bridge
curl.exe -X POST http://localhost:8000/api/abdm-consent-bridge -H "Content-Type: application/json" -d "{\"system_id\":\"sys-cxr-001\",\"patient_abha_id\":\"test-hashed-id\",\"purpose\":\"diagnostic_ai_screening\",\"org_id\":\"demo-org\"}"

# 10. List all systems
curl.exe http://localhost:8000/api/ai-systems -H "Authorization: Bearer TOKEN"
```

---

## What Each Test Proves

| Test | Feature Verified |
|---|---|
| TC-01 | Agent reasoning across multiple systems, priority ranking |
| TC-02 | Document generation — DPDPA consent notice |
| TC-03 | Policy engine — CDSCO + validation controls |
| TC-04 | Document generation — clinical risk assessment |
| TC-05 | Regulation-specific advice — cross-border transfer |
| TC-06 | MSME compliance snapshot — clearance expiry detection |
| TC-07 | Real-time compliance advice — environmental breach |
| TC-08 | ESG calculation guidance — Scope 1/2 emissions |
| TC-09 | Policy engine — MSME AI safety controls |
| TC-10 | Document generation — GPCB monthly report |

---

## Scoring: What Good Output Looks Like

### Agent response quality checklist
```
□ Cites specific regulation (DPDPA Section X, not just "DPDPA")
□ Mentions India-specific bodies (CDSCO, GPCB, ABDM, NABH)
□ Gives actionable next steps, not just descriptions
□ Prioritises by urgency and risk level
□ Generated documents have correct structure and headings
□ Does not hallucinate regulation names or section numbers
□ Acknowledges when data is missing rather than making assumptions
```

### Compliance check quality checklist
```
□ Returns specific control IDs (not generic pass/fail)
□ Explains WHY each control failed
□ Links failure to specific missing evidence
□ Score reflects actual gap severity (Class III with no consent = 0%, not 50%)
□ Distinguishes critical vs warning failures
```
