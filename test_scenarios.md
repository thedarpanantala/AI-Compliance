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



TECHNICAL IMPLEMENTATION PROMPT: Missing Core Modules
Context: The aic Privacy Cockpit platform has core navigation and onboarding completed. Now implement the three critical backend systems that deliver the "automation" value proposition: (1) Export Certification Intelligence, (2) Industry-Specific Workflow Automation, and (3) AI-Powered Document Generation.
MODULE 1: EXPORT & TRADE INTELLIGENCE SYSTEM ("Global Bridge")
1.1 Database Schema Expansion
sql
Copy
-- New Table: export_certifications
CREATE TABLE export_certifications (
    id UUID PRIMARY KEY,
    certification_code VARCHAR(50) UNIQUE, -- e.g., "CE-MDR-2017", "FDA-510k", "BIS-ISI"
    name VARCHAR(255), -- "CE Marking (Medical Devices)", "FDA 510(k) Clearance"
    issuing_authority VARCHAR(100), -- "European Commission", "US FDA"
    jurisdiction VARCHAR(100), -- "EU", "USA", "UK", "Australia"
    industry_scope JSONB, -- ["Medical Device", "Textile", "Food Processing"]
    risk_classification_required BOOLEAN,
    mandatory_for_ai BOOLEAN DEFAULT false,
    renewal_period_months INT,
    estimated_cost_usd_range JSONB, -- {"min": 5000, "max": 50000}
    documentation_checklist JSONB, -- Array of required doc IDs
    created_at TIMESTAMP
);

-- New Table: organization_export_profiles
CREATE TABLE organization_export_profiles (
    id UUID PRIMARY KEY,
    org_id UUID REFERENCES organizations(id),
    target_markets JSONB, -- ["EU", "USA", "UK", "Australia", "ASEAN"]
    product_categories JSONB, -- ["SaMD", "Textile-Garments", "Processed-Foods"]
    active_certifications JSONB, -- Array of certification IDs with expiry dates
    compliance_gaps JSONB, -- AI-generated gap analysis
    next_renewal_date DATE,
    global_bridge_status VARCHAR(50) -- "Compliant", "Action Required", "Not Started"
);

-- New Table: jurisdiction_requirements
CREATE TABLE jurisdiction_requirements (
    id UUID PRIMARY KEY,
    country_code VARCHAR(2),
    regulation_name VARCHAR(255), -- "EU AI Act", "FDA AI/ML Guidance"
    ai_system_scope TEXT, -- Description of what qualifies
    mandatory_registration BOOLEAN,
    data_localization_required BOOLEAN,
    third_party_audit_required BOOLEAN,
    timeline_to_comply_days INT,
    penalty_for_non_compliance TEXT
);
1.2 Logic Implementation: "Global Bridge" Assessment Engine
Feature: When user selects target export markets in onboarding (Step 1) or settings,系统自动计算合规路径。
Algorithm:
Python
Copy
def calculate_export_compliance_path(org_id, target_markets, product_categories):
    """
    Returns compliance roadmap for exporting AI-enabled products
    """
    gaps = []
    required_certs = []
    
    for market in target_markets:
        # EU Logic
        if market == "EU":
            if "Medical" in product_categories:
                required_certs.append({
                    "cert": "CE-MDR-2017",
                    "mandatory": True,
                    "prerequisite": "ISO-13485",
                    "ai_specific_addendum": "EU AI Act Article 6 High-Risk"
                })
            if "Textile" in product_categories:
                required_certs.append({
                    "cert": "CE-Textile-Regulation",
                    "mandatory": True,
                    "ai_component": "Chemical compliance labeling"
                })
        
        # USA Logic
        elif market == "USA":
            if "Medical-AI" in product_categories:
                required_certs.append({
                    "cert": "FDA-510k",
                    "pathway": "Software as Medical Device (SaMD)",
                    "ai_addendum": "FDA AI/ML-Based Software as Medical Device Guidance"
                })
        
        # UK Logic (Post-Brexit)
        elif market == "UK":
            required_certs.append({
                "cert": "UKCA-Marking",
                "transitional_note": "CE marking accepted until June 2023"
            })
    
    # Cross-reference with existing India licenses
    india_licenses = get_org_india_licenses(org_id)
    gaps = identify_recognition_gaps(india_licenses, required_certs)
    
    return {
        "target_markets": target_markets,
        "required_certifications": required_certs,
        "gaps": gaps,
        "estimated_timeline_days": sum([cert['estimated_days'] for cert in required_certs]),
        "estimated_cost_usd": calculate_cost(required_certs),
        "action_items": generate_action_items(gaps)
    }
1.3 UI Components to Build
A. Export Intelligence Dashboard
Map Visualization: World map showing target markets (green = compliant, yellow = in-progress, red = blocked)
Certification Timeline: Gantt chart showing application → review → approval → renewal dates
Cost Calculator: Running total of estimated certification costs based on selected markets
Document Checklist per Market:
EU: Technical Documentation, Clinical Evaluation, Post-Market Surveillance plan
USA: 510(k) Submission, Predicative Determination, Software Documentation
UK: UKCA Technical File, UK Responsible Person appointment letter
B. "Global Bridge" Wizard (New Onboarding Step 3.5)
plain
Copy
Step 3.5: Export Markets Selection
├─ Select Target Markets: [Multi-select dropdown: EU, USA, UK, Australia, ASEAN, Middle East]
├─ Product Categories: [Auto-populated from Step 1 industry selection]
├─ AI Component Type: [Standalone AI, AI-Enabled Hardware, AI-as-a-Service]
└─ Auto-Generated Output:
    ├─ "To export to EU + USA, you need:"
    ├─ 1. CE Marking (Medical Devices) + EU AI Act compliance
    ├─ 2. FDA 510(k) clearance + Algorithm Change Control Plan
    ├─ 3. Gap Analysis: Your current BIS license is not recognized in EU
    └─ [Generate Export Roadmap] [Schedule Consultation]
1.4 Integration Points
Connect with existing India License Database: Map BIS/FSSAI/CDSCO licenses to international equivalents (e.g., BIS-ISI → CE marking equivalence agreements)
AI Agent Integration: Prompt: "Given this organization's Textile industry + EU export goal, what additional certifications are needed beyond their current BIS licenses?"
MODULE 2: INDUSTRY-SPECIFIC WORKFLOW ENGINE
2.1 Workflow Template Database
sql
Copy
-- New Table: workflow_templates
CREATE TABLE workflow_templates (
    id UUID PRIMARY KEY,
    template_code VARCHAR(50) UNIQUE,
    name VARCHAR(255),
    description TEXT,
    industry VARCHAR(100), -- "Textile", "Chemical", "Healthcare", "Food Processing"
    compliance_framework VARCHAR(100), -- "DPDPA", "EU AI Act", "NABH", "FSSAI"
    trigger_type VARCHAR(50), -- "Scheduled", "Event-Based", "Manual"
    trigger_config JSONB, -- {"frequency": "monthly", "day": 1} or {"event": "new_ai_system"}
    steps JSONB, -- Array of step objects
    approval_required BOOLEAN,
    auto_execute BOOLEAN DEFAULT false,
    created_by UUID REFERENCES users(id)
);

-- Example Template Data:
-- "Textile_Monthly_Compliance_Review"
-- "Chemical_Incident_Response"
-- "Healthcare_DSR_Fulfillment"
-- "Food_Processing_Label_Update"
2.2 Industry-Specific Workflow Logic
A. Textile Industry Workflows
JSON
Copy
{
  "template_code": "TEXTILE_MONTHLY_REVIEW",
  "name": "Monthly Textile Compliance Review",
  "industry": "Textile",
  "trigger": "Scheduled (1st of month)",
  "steps": [
    {
      "step_order": 1,
      "title": "BIS License Status Check",
      "action": "api_call",
      "api_endpoint": "/api/v1/india-licenses/status",
      "condition": "check_expiry_within_days(30)",
      "auto_execute": true,
      "output_variable": "expiring_licenses"
    },
    {
      "step_order": 2,
      "title": "Chemical Inventory Compliance",
      "action": "form_submission",
      "form_id": "chemical_usage_log",
      "assignee_role": "Factory_Manager",
      "condition": "if_chemical_usage > threshold",
      "due_hours": 72
    },
    {
      "step_order": 3,
      "title": "Export Shipment Documentation",
      "action": "document_generation",
      "template": "textile_export_certificate",
      "condition": "pending_shipments > 0",
      "auto_execute": true
    },
    {
      "step_order": 4,
      "title": "Human Review & Approval",
      "action": "human_approval",
      "assignee_role": "Compliance_Officer",
      "condition": "always",
      "escalation_hours": 48
    }
  ]
}
B. Chemical Industry Workflows
JSON
Copy
{
  "template_code": "CHEMICAL_SPILL_RESPONSE",
  "name": "Chemical Spill/Incident Response",
  "industry": "Chemical",
  "trigger": "Event-Based (Incident Logged)",
  "steps": [
    {
      "step_order": 1,
      "title": "Immediate Containment Verification",
      "action": "checklist",
      "items": ["Spill contained", "Area evacuated", "PPE donned"],
      "assignee_role": "Safety_Officer",
      "due_hours": 1
    },
    {
      "step_order": 2,
      "title": "Regulatory Notification Assessment",
      "action": "ai_decision",
      "logic": "if spill_volume > 100L OR chemical_tier == 'hazardous_a' then notify_pcb = true",
      "auto_execute": true
    },
    {
      "step_order": 3,
      "title": "PCB/SPCB Filing",
      "action": "document_generation",
      "template": "pcb_incident_report",
      "condition": "notify_pcb == true",
      "jurisdiction_variable": "state_location"
    },
    {
      "step_order": 4,
      "title": "Root Cause Analysis",
      "action": "form_submission",
      "form_id": "rca_form",
      "assignee_role": "Plant_Manager",
      "due_hours": 72
    }
  ]
}
C. Healthcare AI Workflows (NABH/CDSCO)
JSON
Copy
{
  "template_code": "CLINICAL_AI_VALIDATION",
  "name": "Clinical AI Validation Protocol",
  "industry": "Healthcare",
  "trigger": "Manual (New AI System Registration)",
  "steps": [
    {
      "step_order": 1,
      "title": "Algorithm Validation Documentation",
      "action": "document_upload",
      "required_docs": ["Validation_Report", "Clinical_Performance_Data", "Bias_Assessment"],
      "assignee_role": "Clinical_Lead"
    },
    {
      "step_order": 2,
      "title": "Ethics Committee Approval",
      "action": "approval_workflow",
      "approver_role": "Ethics_Committee_Chair",
      "escalation_days": 14
    },
    {
      "step_order": 3,
      "title": "NABH AI Addendum Generation",
      "action": "ai_document_generation",
      "template": "nabh_ai_validation_protocol",
      "input_variables": ["system_name", "risk_class", "clinical_domain"]
    },
    {
      "step_order": 4,
      "title": "Post-Implementation Monitoring Setup",
      "action": "api_call",
      "api_endpoint": "/api/v1/monitoring/activate",
      "parameters": {"alert_threshold": "accuracy_drop_5_percent"}
    }
  ]
}
2.3 Workflow Builder UI
Interface Requirements:
Visual Workflow Builder: Drag-and-drop interface (similar to Zapier/Make) with nodes for:
Triggers (Schedule, Webhook, Manual, AI Detection)
Actions (Send Email, Generate Doc, API Call, Human Task)
Conditions (If/Else logic based on data fields)
Delays (Wait X days/hours)
Template Library: Pre-built templates per industry (Textile, Chemical, Healthcare, Food, Electronics)
Testing Mode: "Simulate Workflow" button that runs with mock data to test logic
Execution Logs: Audit trail showing which step ran when, by whom, with what result
MODULE 3: AI-POWERED DOCUMENT ARTIFACT GENERATION
3.1 Document Template System
sql
Copy
-- New Table: document_templates
CREATE TABLE document_templates (
    id UUID PRIMARY KEY,
    template_code VARCHAR(50),
    name VARCHAR(255), -- "NABH AI Validation Protocol", "DPDPA Privacy Notice"
    description TEXT,
    applicable_frameworks JSONB, -- ["NABH", "EU AI Act", "DPDPA"]
    applicable_industries JSONB, -- ["Healthcare", "Textile", "All"]
    document_type VARCHAR(50), -- "Policy", "Procedure", "Report", "Checklist"
    file_format VARCHAR(20), -- "PDF", "DOCX", "HTML"
    template_content TEXT, -- HTML/Markdown with {{variables}}
    required_inputs JSONB, -- Schema of required data fields
    ai_generation_prompt TEXT, -- Prompt for LLM to fill gaps
    version INT DEFAULT 1,
    is_active BOOLEAN DEFAULT true
);

-- New Table: generated_documents
CREATE TABLE generated_documents (
    id UUID PRIMARY KEY,
    template_id UUID REFERENCES document_templates(id),
    org_id UUID REFERENCES organizations(id),
    generated_by UUID REFERENCES users(id),
    status VARCHAR(50), -- "Draft", "Under Review", "Approved", "Archived"
    input_data JSONB, -- Data used to generate
    ai_generated_content TEXT,
    human_edited_content TEXT,
    final_pdf_url VARCHAR(500),
    approval_chain JSONB, -- Array of approvers and status
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
3.2 Document Templates Required (Minimum Viable Set)
Healthcare Sector:
NABH Clinical AI Validation Protocol (for ChestScan AI type systems)
DPDPA Data Processing Notice (for Patient Portals)
EU AI Act High-Risk System Record (Article 6 compliance)
Incident Response Plan (for Healthcare AI failures)
Algorithm Change Control Log (FDA/CDSCO requirement)
Textile Sector:
BIS Compliance Certificate Renewal Application (Auto-filled from license DB)
Chemical Usage Safety Report (Monthly for PCB compliance)
Export Textile Quality Certification (for EU/USA shipments)
Worker Safety Training Record (Factory compliance)
Chemical Sector:
Material Safety Data Sheet (MSDS) (AI-generated from chemical inventory)
Pollution Control Board Incident Report (Pre-filled with spill data)
Environmental Compliance Report (Quarterly for SPCB)
Cross-Industry:
DPDPA Data Subject Request Fulfillment Report (Auto-generated from DSR workflow)
EU AI Act Conformity Declaration (Based on risk classification)
Vendor Risk Assessment Questionnaire (AI-customized by vendor type)
Internal Audit Report Template (Framework-specific checklists)
3.3 Document Generation Engine Logic
Workflow:
Python
Copy
def generate_compliance_document(template_code, org_id, ai_system_id=None):
    # 1. Fetch Template
    template = get_template(template_code)
    
    # 2. Gather Input Data
    inputs = {}
    for field in template.required_inputs:
        if field.source == "database":
            inputs[field.name] = fetch_from_db(field.table, org_id)
        elif field.source == "ai_system":
            inputs[field.name] = fetch_ai_system_data(ai_system_id)
        elif field.source == "license_db":
            inputs[field.name] = fetch_license_data(org_id, field.license_type)
    
    # 3. Pre-process with AI (if content gaps exist)
    if template.ai_generation_prompt:
        llm_prompt = template.ai_generation_prompt.format(**inputs)
        ai_content = call_llm(llm_prompt)
        inputs['ai_generated_section'] = ai_content
    
    # 4. Render Template
    html_content = render_template(template.template_content, inputs)
    
    # 5. Convert to PDF/DOCX
    document_url = convert_to_pdf(html_content)
    
    # 6. Create Review Task
    create_approval_task(
        document_id=new_doc_id,
        assignee_role="Compliance_Officer",
        task_title=f"Review generated {template.name}"
    )
    
    return {
        "document_id": new_doc_id,
        "status": "Draft - Pending Review",
        "download_url": document_url,
        "preview_html": html_content[:500] + "..."
    }
3.4 UI for Document Generation
Interface: "Document Vault" Page
Layout:
Left Panel: Template library organized by Industry → Framework → Document Type
Center Panel: Template preview with variable placeholders highlighted {{Organization_Name}}
Right Panel: Input form (auto-populated from org profile), AI suggestions box
Key Features:
Smart Prefill: When generating "NABH AI Validation" for ChestScan AI v3.1, auto-pull:
System name, version, risk classification
Department (Radiology)
Owner (Dr. Sarah Chen)
Last assessment date
Existing control implementations
AI Gap Filler: If template asks for "Clinical Performance Metrics" and data is missing, show:
AI suggestion: "Based on similar diagnostic AI systems, expected sensitivity is 94-96%. Use 95% as placeholder?"
[Accept] [Edit] [Fetch from System]
Collaborative Editing: Google Docs-style commenting on generated documents
Compliance Officer can tag Legal team: "@legal review section 4.2"
Track changes between AI-generated and human-edited versions
Approval Workflow:
Draft → Review → Approved → Published (to Document Vault)
Digital signatures (eSign integration)
Version control (v1.0, v1.1 with change logs)
MODULE 4: INTEGRATION SPECIFICATIONS
4.1 API Endpoints to Implement
yaml
Copy
# Export & Trade
GET /api/v1/export/compliance-roadmap?org_id={}&markets={}
POST /api/v1/export/certifications/apply
GET /api/v1/jurisdictions/requirements?country={}&industry={}

# Workflows
GET /api/v1/workflows/templates?industry={}
POST /api/v1/workflows/instances (trigger workflow)
GET /api/v1/workflows/instances/{id}/status
PUT /api/v1/workflows/instances/{id}/approve-step

# Documents
POST /api/v1/documents/generate
GET /api/v1/documents/templates
GET /api/v1/documents/{id}/preview
POST /api/v1/documents/{id}/approve
GET /api/v1/documents/{id}/download?format=pdf
4.2 External Integrations Required
eSign Integration: DocuSign or SignEasy for document approvals
Cloud Storage: AWS S3 for generated PDF storage with retention policies
Email/Slack: Workflow notifications (SendGrid, Slack webhooks)
India License API: Integration with government portals for real-time license status (where available)
LLM Service: OpenAI GPT-4 or Claude for document content generation (with HIPAA/BAA if healthcare)
ACCEPTANCE CRITERIA
Export Module:
[ ] User can select 3 export markets and see correct certification requirements
[ ] System correctly identifies that BIS license ≠ CE marking (gap highlighted)
[ ] Cost calculator shows realistic estimates for CE + FDA certification
[ ] Map visualization updates as certifications are obtained
Workflow Module:
[ ] Textile factory manager receives monthly checklist on 1st of month
[ ] Chemical spill automatically triggers PCB notification if >100L
[ ] Healthcare AI validation workflow routes to Ethics Committee
[ ] Workflow builder allows creation of new template without code
Document Module:
[ ] NABH AI Validation Protocol generates in <10 seconds with 90% accurate prefills
[ ] Human review checkpoint blocks automatic finalization
[ ] Version control tracks changes between AI draft and final approved doc
[ ] All documents stored with encryption at rest and audit trail