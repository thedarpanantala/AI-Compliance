# Competitive Landscape & Moat Analysis
## AI Compliance Platform — Updated March 2026

---

## What You Have Built vs What Competitors Have

### Feature Comparison Matrix

| Feature | OneTrust | Vanta | Drata | Scruti | Sprinto | ServiceNow GRC | **Your Platform** |
|---|---|---|---|---|---|---|---|
| EU AI Act controls | Partial | ❌ | ❌ | ❌ | ❌ | Partial | ✅ Full |
| NIST AI RMF | ❌ | ❌ | ❌ | ❌ | ❌ | Partial | ✅ Full |
| India DPDPA 2023 | ❌ | ❌ | ❌ | Partial | Partial | ❌ | ✅ Full |
| ABDM / NDHM | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ Full |
| CDSCO SaMD | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ Full |
| CPCB/SPCB norms | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ Full |
| EU CBAM / CS3D | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ Full |
| Healthcare AI vertical | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ Deep |
| MSME manufacturing vertical | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ Deep |
| Policy-as-code engine | ❌ | Partial | Partial | ❌ | ❌ | Partial | ✅ Full |
| Compliance agent / chatbot | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ Built |
| Auto document generation | Partial | ❌ | ❌ | ❌ | ❌ | Partial | ✅ Built |
| Monthly auto-scheduler | ❌ | Partial | Partial | ❌ | ❌ | ✅ | 🔶 Partial |
| Mobile / desktop app | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🔶 Planned |
| SOC2 automation | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ Not focus |
| ISO 27001 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | Partial |
| Pricing (India SME) | ❌ Too expensive | ❌ USD only | ❌ USD only | ✅ | ✅ | ❌ ₹2Cr+ | ✅ Affordable |
| India support | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ | ✅ |

---

## Pricing Reality Check

```
OneTrust:        $50,000 – $500,000/year    (enterprise only)
Vanta:           $7,500 – $40,000/year      (USD, US-focused)
Drata:           $10,000 – $50,000/year     (USD, US-focused)
ServiceNow GRC:  ₹1.5Cr – ₹5Cr+/year       (large enterprise)
Scruti:          ₹3L – ₹15L/year            (India SaaS focus)
Sprinto:         ₹2L – ₹10L/year            (India SaaS focus)

YOUR PLATFORM:
  MSME / Small clinic:  ₹25k one-time + ₹8k/year
  Hospital (200 beds):  ₹15k – ₹40k/month
  Hospital chain:       ₹1.2L – ₹5L/month
  Enterprise:           Custom
```

Scruti and Sprinto are your closest Indian competitors but they target
SaaS startups needing SOC2/ISO27001. Neither serves hospitals or factories.

---

## Your 4 Confirmed Moats

### Moat 1: India Regulatory Stack (nobody else has this)
You are the ONLY platform with all of these in one product:
DPDPA + ABDM + CDSCO + CPCB + NABH + Labour laws + CBAM for exporters.
Western platforms ignore India. Indian platforms ignore AI governance.
You sit in the gap between both.

### Moat 2: Policy-as-Code Engine (12-18 months to replicate)
Your YAML-based control evaluation engine that auto-checks systems
against regulations is technically non-trivial. Competitors use
checklists. You use machine-readable rules that re-evaluate automatically
when system metadata changes. This is the infrastructure moat.

### Moat 3: Vertical Depth (healthcare + manufacturing)
Clinical AI systems with CDSCO/ABDM/SAHI controls, validation studies,
consent record tracking. MSME factories with pollution category routing,
CTO/CTE expiry tracking, GPCB monthly evidence. No competitor has
modelled these domains at this depth.

### Moat 4: Data Moat (builds over time)
Every compliance check, every evidence upload, every agent conversation
builds a dataset of how Indian regulated organisations fail compliance.
After 2-3 years: "Hospital AI systems in India fail clinical validation
controls 68% of the time on first assessment." Competitors cannot buy
this data. It only comes from running the platform.

---

## What You Are Still NOT Doing — Honest Gaps

### Gap 1: Automated Evidence Collection (biggest gap)
**What you have:** Manual evidence upload (user clicks, uploads PDF)
**What you need:** Connectors that PULL evidence automatically

```
GitHub connector    → pulls test reports, CI results, model cards
MLflow connector    → pulls model metrics, validation runs
NABH portal        → scrapes licence status (if API available)
MCA portal         → pulls company registration status
AERB portal        → pulls radiation licence status
Email inbox        → parses lab reports sent via email
WhatsApp Business  → factory uploads photo of lab report via WhatsApp
```

Without this, you are a "compliance database" not a "compliance automation."
The automation is what justifies the price to a hospital.

**Impact:** Medium-high. This is what makes "very little human touch" real.

---

### Gap 2: Monthly Auto-Scheduler (half built)
**What you have:** Manual compliance check via API call
**What you need:** Cron job that runs automatically

```python
# This needs to run WITHOUT anyone pressing a button:
# Every night at 11 PM → check all licence expiry dates
# 1st of month → run full compliance scan for all orgs
# 30 days before expiry → send renewal reminder
# Day of expiry → send critical alert to compliance officer
```

Without this, the hospital compliance officer must remember to log in.
With this, the platform comes to them.

**Impact:** High. This is the core automation promise.

---

### Gap 3: Email / WhatsApp Notifications (not built)
**What you have:** Dashboard that shows status
**What you need:** Push alerts that reach users where they are

For a 2000-bed hospital compliance officer — they are not sitting
at your dashboard all day. They need:
- Email: "3 licences expiring in 30 days"
- WhatsApp: "NABH accreditation expires in 7 days — click to upload renewal"
- SMS for factory managers who don't use email

**Impact:** High. Without notifications, adoption drops to near zero.

---

### Gap 4: Auto PDF Report Generation (not built)
**What you have:** Compliance scan results as JSON
**What you need:** One-click PDF that a compliance officer
can sign and submit to auditors

```
Monthly Compliance Report — Sahyadri Hospital — March 2025
  Executive Summary
  Licences: 12 valid, 2 expiring, 1 expired
  AI Systems: 3 registered, 1 non-compliant
  Evidence: 45 items uploaded, 8 overdue
  Actions taken this month: [list]
  Sign-off: [digital signature block]
```

NABH auditors, CDSCO inspectors, and GPCB officers ask for
a document — not a dashboard URL. This is the deliverable.

**Impact:** High. Directly answers "what do I hand to the auditor?"

---

### Gap 5: Licence Expiry Database (not built)
**What you have:** Manual entry of licence dates
**What you need:** Pre-populated templates per industry

```
When a hospital registers → auto-create 25 licence records
with standard renewal frequencies:
  NABH: 3-year cycle
  AERB: annual
  BMW Auth: annual
  Fire NOC: annual
  Clinical Establishment: varies by state
  etc.

When a textile factory registers → auto-create:
  GPCB CTO: 5-year (renewable)
  Factory Licence: annual
  Hazmat licence: annual
  etc.
```

Right now users have to manually create every licence record.
This kills adoption for small teams.

**Impact:** Medium-high. Reduces onboarding time from days to minutes.

---

### Gap 6: Regulatory Update Feed (not built)
**What you have:** Static YAML control packs
**What you need:** System that detects when regulations change

```
Monitor: MeitY website, CDSCO portal, CPCB circulars,
         EU Official Journal, Ministry of Labour
         
When detected: "DPDPA Amendment published — 3 controls affected"
               → Notify all customers → Update control packs
               → Re-run affected assessments automatically
```

This is a Phase 2 feature but it is your strongest
long-term moat. Competitors update a PDF. You push a YAML update.

**Impact:** Medium now, very high at scale.

---

### Gap 7: Onboarding Flow (not built)
**What you have:** Raw API endpoints
**What you need:** Guided setup wizard

```
Step 1: "What type of organisation are you?"
        → Hospital / Factory / Clinic / Consultant

Step 2: "Which state are you in?"
        → Sets correct SPCB, labour laws, etc.

Step 3: "Which AI systems do you use?"
        → Pre-fill templates based on common systems

Step 4: "Upload your existing licences"
        → Agent reads PDFs and extracts dates automatically

Done: Dashboard shows first compliance score in < 15 minutes
```

Right now a new customer faces blank forms and raw API calls.
This kills self-serve adoption.

**Impact:** Critical for growth. Without this, every customer
needs hands-on onboarding from you.

---

## Priority Order — What to Build Next

```
Priority 1 (build this month):
  □ Monthly auto-scheduler (cron job)
  □ Email notifications (licence expiry + overdue evidence)
  □ Auto PDF report generation

Priority 2 (next 2 months):
  □ Licence expiry database with industry templates
  □ Guided onboarding wizard
  □ WhatsApp notification for MSME factory managers

Priority 3 (months 3-6):
  □ GitHub / MLflow connectors (auto evidence pull)
  □ Electron desktop app
  □ Regulatory update feed (basic version)

Priority 4 (6+ months):
  □ NABH / CDSCO portal connectors
  □ Full regulatory intelligence engine
  □ Marketplace for control packs
```

---

## Your Defensible Position (one sentence)

"The only compliance automation platform purpose-built for
India's AI governance stack — covering DPDPA, ABDM, CDSCO,
and CPCB in one product, with vertical depth for hospitals
and MSME factories that no Western or Indian competitor has."

That is what you own. Build the automation layer on top of it
and it becomes very hard to displace.
