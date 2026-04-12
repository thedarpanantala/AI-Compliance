# Frontend Design & Development Brief
## AI Compliance Platform — Full UI Specification
### For: Antigravity Development Team

---

## DESIGN REFERENCE

Build the UI in the style of the attached AIC / EQS Privacy Cockpit screenshots:
- Clean white background, no gradients
- Thin 0.5px borders, generous whitespace
- Left sidebar navigation with section groupings
- Tab-based content areas at top of each page
- Status badges (pill-shaped, colour-coded)
- Table views with sortable column headers
- Floating AI assistant button (bottom-right, always visible)
- Breadcrumb navigation (Home / Section / Sub-section)
- Top bar: global search, notification bell with count badge, user avatar

---

## TECH STACK (match existing project)

- Next.js 14 + TypeScript
- Tailwind CSS (utility classes only)
- shadcn/ui component library
- API base URL: configured via `NEXT_PUBLIC_API_URL` env var
- All API calls via `frontend/services/api.ts`
- Auth: JWT Bearer token stored in localStorage or httpOnly cookie

---

## GLOBAL LAYOUT

### Top Navigation Bar
```
[Logo: "aiC" wordmark]  [Module name dropdown ▼]  [Org name dropdown ▼]
        [─────────── Global Search ───────────]
[Notification bell 🔔 with unread count badge]  [User avatar / initials]
```

### Left Sidebar
Fixed width 240px. Two grouped sections per module.
Active item has left accent border in brand colour.
Collapsible sub-items (as shown in screenshots for "AI systems").

### Main Content Area
Full remaining width. Each page has:
1. Breadcrumb row (Home / Module / Page)
2. Page title + action buttons (top right)
3. Tab bar (horizontal tabs, active tab has underline)
4. Tab content area

### Floating Compliance Assistant
Fixed bottom-right. Blue pill button:
`[🤖 icon] Compliance Assistant`
Click opens a chat drawer (400px wide, slides in from right).
Always visible on every page.

---

## MODULE 1: COMPLIANCE COCKPIT (Home Dashboard)

### Left Sidebar Items
```
COMPLIANCE
  📋 Processings
  🛡️  Privacy by Design
  📊 Impact Assessments
  🔴 Incidents & Breaches
  🤖 AI Systems
      ↳ AI Record
      ↳ AI Assessment
      ↳ Documentation
  📁 Data Subject Requests

MANAGEMENT
  ✅ Actions
  📖 Record
  📊 Analytics
```

### Page: Compliance Cockpit (Overview Tab)

**Tab bar:** Overview | Cases (54) | Reporting | Audit Trail | Configuration

**Overview Tab Content:**
```
Row 1 — 4 metric cards:
  [Total AI Systems: 12]  [Compliant: 7]  [At Risk: 3]  [Overdue Actions: 8]

Row 2 — 2 column layout:
  Left (60%): Compliance Score Trend — line chart, last 6 months,
              one line per active framework (EU AI Act, DPDPA, ISO 42001)

  Right (40%): Framework Status — vertical list
    EU AI Act      [████████░░] 82%  🟡 Partial
    DPDPA 2023     [██████░░░░] 61%  🔴 At Risk
    ISO 42001      [█████████░] 91%  🟢 Compliant
    NIST AI RMF    [███████░░░] 70%  🟡 Partial
    CDSCO SaMD     [████░░░░░░] 40%  🔴 At Risk

Row 3 — 2 column layout:
  Left: Recent Incidents (last 5, table with severity badge + date)
  Right: Upcoming Deadlines (next 5 licence expiries or evidence due dates)
```

**Cases Tab Content:**
Table view exactly matching aIC screenshot:
Columns: CASE ID & DATE | STATUS | SEVERITY | DESCRIPTION | CLASSIFICATION | STATE/REGION | ASSIGNED TO | MODIFIED

Status badges: New (blue) | In Progress (purple) | Closed (grey) | Escalated (red)
Severity badges: Critical (red) | High (orange) | Medium (yellow) | Low (grey) | Undefined (light grey)
Classification tags: DPDPA Breach | CDSCO Non-compliance | GPCB Violation | AI Incident | Consent Issue | Data Leak

Top of table: Search bar | Filter dropdown | + New Case button | Grid/List view toggle

**Reporting Tab Content:**
```
3 sections:
1. Scheduled Reports — table: Report Name | Framework | Frequency | Last Generated | Status | Download
   Examples:
   - Monthly DPDPA Compliance Report (Monthly, last: 1 Mar 2025)
   - NABH AI Audit Readiness Report (Quarterly)
   - GPCB Monthly Compliance Snapshot (Monthly)
   - EU AI Act Annex IV Documentation (On-demand)

2. Generate Report — form:
   Select Template: [dropdown]
   Select AI System: [dropdown]
   Period: [date range picker]
   Output Format: PDF | Excel | JSON
   [Generate Report button]

3. Past Reports — table with download links, generated date, size
```

**Audit Trail Tab Content:**
Chronological log table:
Columns: TIMESTAMP | USER | ACTION | RESOURCE TYPE | RESOURCE ID | CHANGE SUMMARY | IP ADDRESS

Filter by: Date range | User | Action type | Resource type
Each row expandable to show Before / After JSON diff.
Export button: Download as CSV.

**Configuration Tab Content:**
```
4 sub-sections (vertical cards):

1. Organisation Settings
   Name, Industry, State/Region, GST Number, Pollution Category (for MSME),
   Data Region (IN/EU/US), Active Frameworks (multi-select checkboxes)

2. User Management
   Table: Name | Email | Role | Last Login | Status | Actions
   Roles: Owner | Admin | Risk Manager | Contributor | Viewer | Auditor
   + Invite User button

3. Notification Settings
   Toggle on/off per event type:
   - Licence expiring (30/7/1 days)
   - Compliance score drop
   - Evidence overdue
   - New task assigned
   - Monthly report ready
   Channels: Email | WhatsApp | In-app

4. Integrations
   Cards for each connector:
   [GitHub] [GitLab] [MLflow] [SageMaker] [Jira] [Datadog] [ABDM API]
   Each card: Connected (green) / Not connected (grey) + Configure button
```

---

## MODULE 2: AI SYSTEMS

### Page: AI Record

**Tab bar:** Overview | All Systems | Add New | Import

**All Systems Tab:**
Table with:
Columns: SYSTEM NAME | TYPE | RISK TIER | STATUS | FRAMEWORK SCORE | OWNER | LAST ASSESSED | ACTIONS

Status badges: Draft | Active | Deprecated | Retired
Risk tier badges: High (red) | Limited (orange) | Minimal (green) | Unacceptable (dark red)
Framework score: coloured progress pill (0-100%)

Clicking a row opens the AI System Detail page (see below).

Filter bar above table:
`[Search by name] [Risk Tier ▼] [Status ▼] [Sector ▼] [Framework ▼]`

**AI System Detail Page (drill-down on row click):**
```
Breadcrumb: AI Systems / ChestScan AI v3.1
Header: [System name + risk badge] [Edit] [Run Compliance Check]

Tab bar:
Overview | Controls | Evidence | Validation | Incidents | Tasks | Documents
```

**Overview Sub-tab:**
```
2 columns:
Left: System metadata card
  Purpose / Clinical type / Intended setting / Target population /
  Vendor / Deployment date / Owner / Version
  Metadata tags

Right: Compliance score ring (large, 0-100%)
  Per-framework breakdown below ring:
  EU AI Act: 72% 🟡
  DPDPA: 45% 🔴
  CDSCO: 30% 🔴
  ISO 42001: 88% 🟢
```

**Controls Sub-tab:**
Table matching EQS "Audits and controls" style:
Columns: CONTROL CODE | TITLE | FRAMEWORK | STATUS | EVIDENCE COUNT | LAST CHECKED

Status: Compliant ✅ | Non-Compliant ❌ | Partial ⚠️ | Not Assessed ○ | N/A —

Click on a control row → side drawer opens showing:
  Control description | Obligation text | Regulation citation |
  Test procedure | Evidence linked | Auto-check result | Manual override option

**Evidence Sub-tab:**
Timeline view + table toggle.
Timeline shows evidence items chronologically with type icons:
📄 Document | 🧪 Test Result | 🔧 CI Run | 🔗 Link | 📸 Screenshot

Upload button top right: opens modal with:
  Title | Type (dropdown) | Tags (multi-select) | File upload area |
  Source URL (if link) | Notes

Each evidence item shows: locked 🔒 badge if frozen for audit.

**Validation Sub-tab:**
Cards for each validation study:
  Study name | Type | n patients | Primary metric (AUC/F1/etc) |
  External validation (yes/no) | IRB reference | Status badge
+ Add Validation Study button (opens form modal)

**Incidents Sub-tab:**
Table: DATE | SEVERITY | TYPE | DESCRIPTION | PATIENT HARM | REPORTED TO REGULATOR | STATUS

Severity: Critical | Serious | Moderate | Minor | Near Miss
+ Log Incident button → opens 5-field form:
  Date/time | Severity | Type | Description | Corrective action planned

**Tasks Sub-tab:**
Kanban board: Open | In Progress | Blocked | Completed
Each card: Task title | Priority badge | Assignee avatar | Due date
+ Create Task button → opens form modal

**Documents Sub-tab:**
Generated document cards with:
  Document type | Generated date | Framework | Status (Draft/Final/Locked)
  [Preview] [Download] [Lock for Audit] buttons
+ Generate Document button → opens template selector modal

---

## MODULE 3: AI ASSESSMENT

**Page design matches EQS AI ACT questionnaire screenshot exactly.**

**Tab bar:** Form Builder | Translations | History | Settings

**Form Builder Tab:**
Questionnaire builder for AI Act classification assessment.
Sections visible (matching EQS screenshot):

Section 1: AI System main information
  Q1: What is the intended purpose of the AI System? [text area]
  Q2: What is the name of the AI System provider? [text input]
  Q3: Which sector does this AI system operate in? [dropdown]
  Q4: Who is the deployer organisation? [text input]

Section 2: Qualification — EU AI Act Art. 2(3) Exclusions
  Q5: Is the AI system used exclusively for military/national security? [yes/no]
  Q6: Is it a general-purpose AI model? [yes/no]
  Q7: Is it used solely for scientific research? [yes/no]
  → Recommendation block (conditional): "System is excluded from EU AI Act scope"

Section 3: Risk Classification (Annex III check)
  Q8: Does the system make or assist decisions about: [multi-select]
      Credit scoring | Insurance | Employment | Education |
      Law enforcement | Migration | Critical infrastructure |
      Medical diagnosis | Biometric identification
  → Auto-classification result: Unacceptable / High / Limited / Minimal

Section 4: India-specific Classification
  Q9: Is this system used in healthcare (CDSCO SaMD)?  [yes/no]
  Q10: Does it process personal health data (DPDPA / ABDM)? [yes/no]
  Q11: Is it deployed in a factory controlling a physical process? [yes/no]
  Q12: Does it send data outside India? [yes/no]
  → India risk classification output

Section 5: Data Governance
  Q13: What data does the system use? [multi-select: PHI, PII, Biometric, Financial, etc.]
  Q14: Is the training data de-identified? [yes/no/partial]
  Q15: What consent mechanism is in place? [dropdown]
  Q16: Is ABDM consent manager integrated? [yes/no]

Section 6: Human Oversight
  Q17: Is there a human override mechanism? [yes/no]
  Q18: Describe the fallback procedure [text area]
  Q19: Is incident logging enabled? [yes/no]
  Q20: Who is the designated human overseer? [user picker]

→ Final output block: Assessment Summary Card
  Shows: EU AI Act Risk Tier | India Risk Classification |
         Key obligations | Recommended next steps | Create Assessment button

**Translations Tab:**
Side-by-side table matching EQS screenshot:
Left column: English (default) labels
Right column: target language (Hindi / Marathi / Tamil / Telugu / etc.)
Language selector on left.
Export / Import buttons for CSV translation files.

---

## MODULE 4: PROCESSINGS (Data Processing Records)

**Matches EQS "Create a processing" modal with AI-assisted creation.**

**Tab bar:** All Processings | Add New | Templates | Import/Export

**All Processings Tab:**
Table: PROCESSING NAME | DATA CONTROLLER | LEGAL BASIS | CATEGORY | STATUS | RISK | UPDATED

Filter by: Legal basis | Category | Status | Risk level

**Add New Processing Modal (matches EQS screenshot exactly):**
3 creation modes as cards:
  [✏️ From scratch] — blank form
  [🤖 Assisted by AI] — purple highlighted, "New" badge
      Text area: "Example: Patient management with Epic EMR software (0/300 chars)"
      Disclaimer text
      [Let's go →] button
  [📋 From a template] — pre-filled templates

**AI-Assisted Creation Flow (5 steps, matches EQS notification wizard):**
Step 1: Set Processing Data (name, controller, purpose)
Step 2: Data Categories (what personal data)
Step 3: Legal Basis (DPDPA consent / legitimate interest / contract / etc.)
Step 4: Recipients & Transfers (including cross-border — flags DPDPA Section 16)
Step 5: Retention & Security

Each step: progress bar at top, Previous / Next buttons.

**Processing Detail Page:**
Tab bar: Overview | Data Map | Controls | DPIA | History

Overview: all form fields displayed in read-only cards, Edit button.
Data Map: visual flow diagram: Data Source → Processing Activity → Recipients → Storage
Controls: which DPDPA/GDPR controls apply, compliance status.
DPIA: Data Protection Impact Assessment form — pre-populated, generate PDF button.

---

## MODULE 5: PRIVACY BY DESIGN

**Page design matches EQS Privacy by Design Assessment.**

**Tab bar:** Assessments | Templates | Translations | Settings

**Assessments Tab:**
Table: PROJECT NAME | DEPARTMENT | CREATED BY | STATUS | RISK SCORE | UPDATED

**Assessment Form (multi-section, collapsible):**

Section 1: Project overall information
  What project is involved? | Project description | Department | Start date

Section 2: Purposes & legal basis
  Processing purposes | Data life cycle | Applicable legal bases

Section 3: Personal data & retention
  Categories of data subjects | Personal data collected |
  Retention period | Deletion mechanism

Section 4: Data transfers
  International transfers? | Destination countries | Transfer mechanism |
  Cross-border: flags DPDPA Section 16 if India data going abroad

Section 5: Security measures
  Technical measures (encryption, access control, etc.)
  Organisational measures (training, policies, etc.)

Section 6: Data subject rights
  How are DPDPA rights handled? (access, correction, erasure, grievance)
  Grievance officer name + contact details

**Final recommendation block** (auto-generated by AI agent):
Green / Yellow / Red recommendation card + action items.

---

## MODULE 6: IMPACT ASSESSMENTS

**Tab bar:** All Assessments | Create New | Templates

**Assessment Types (shown as cards on Create New):**
  🏥 Clinical AI Risk Assessment (healthcare)
  🏭 Process AI Safety Assessment (MSME manufacturing)
  🔐 DPDPA Data Protection Impact Assessment
  🤖 EU AI Act Conformity Assessment
  🌿 Environmental AI Impact (for MSME)

**Clinical AI Risk Assessment Form (5-step wizard matching earlier design):**

Step 1: Clinical Context
  Clinical indication | Intended setting | Target population |
  Decision type (screening/diagnostic/triage/monitoring/treatment) |
  Failure mode description | Fallback procedure

Step 2: Data & Consent
  Data sources (multi-select checkboxes: EHR, PACS, Lab, Wearables, ABDM, etc.) |
  Consent / Lawful basis (dropdown) |
  De-identification method |
  ABDM integration toggle |
  Cross-border data transfer (yes/no — flags if yes)

Step 3: Risk Analysis
  Bias/equity risk (1-5 slider) |
  Safety risk (1-5 slider) |
  Privacy risk (1-5 slider) |
  Over-reliance risk (1-5 slider) |
  Highest-risk scenario (text area) |
  Vulnerable populations (chip multi-select)

Step 4: Mitigations
  Human oversight mechanism (text area) |
  Fallback when AI unavailable (text area) |
  Existing controls (checkbox list) |
  Next clinical validation date

Step 5: Sign-off
  Warning banner: "This assessment will be locked after approval"
  Next review date | Declaration checkbox | Submit for approval

Progress bar at top across all steps (matches EQS notification wizard style).

---

## MODULE 7: INCIDENTS & BREACHES

**Tab bar:** Overview | Incidents | Breaches | Reporting | Configuration

**Overview Tab:**
4 metric cards: Total this month | Critical open | Reported to regulator | Resolved

Trend chart: incidents over last 12 months, stacked by severity.

**Incidents Tab:**
Table matching aIC Cases screenshot exactly:
Columns: INCIDENT ID & DATE | STATUS | SEVERITY | DESCRIPTION | CLASSIFICATION | SYSTEM | ASSIGNED TO | MODIFIED

Classification types:
Clinical AI Error | False Negative | False Positive | System Outage |
Data Breach | Unauthorised Access | Environmental Threshold Breach |
DPDPA Violation | Consent Failure | Cross-border Violation

Status: New | Under Review | Escalated | Reported to Regulator | Resolved | Closed

**Create Incident (button top-right):**
Modal with 3 creation options (matches EQS Create Processing):
  From scratch | AI-assisted (describe incident, agent fills form) | From template

**Incident Detail Page:**
Tab bar: Details | Timeline | Evidence | Regulatory Reporting | Comments

Details: all fields in card layout.
Timeline: chronological log of all actions on this incident.
Regulatory Reporting: which regulators to notify, templates per regulator:
  CDSCO (for medical AI) | DPDP Board (for data breach) | GPCB (for emissions AI) |
  AERB (for radiation AI) | NABH (for clinical AI)
  Generate notification letter button → agent drafts, human reviews, locks and sends.

---

## MODULE 8: DATA SUBJECT REQUESTS

**Tab bar:** All Requests | Create | Settings

**All Requests Tab:**
Table: REQUEST ID | TYPE | SUBJECT | DATE | STATUS | DEADLINE | ASSIGNED | ACTIONS

Request types: Access | Correction | Erasure | Nomination | Grievance
Status: Received | In Progress | Fulfilled | Rejected | Escalated

**Request Detail Page:**
Tab bar: Details | Response | Audit Trail

Details: request form filled by data principal.
Response: template auto-filled by agent, human edits and sends.
DPDPA compliance timer visible (must respond within 30 days per DPDPA).

---

## MODULE 9: FRAMEWORKS & CONTROLS

**Tab bar:** Active Frameworks | Control Library | Mappings | Policy Packs

**Active Frameworks Tab:**
Cards for each active framework:
  [Framework name] [Version] [Coverage: 85%] [Controls: 47/52 assessed]
  [View Controls] [Run Assessment] buttons

Available framework packs to add:
  EU AI Act 2024 | ISO 42001 | NIST AI RMF | DPDPA 2023 | GDPR |
  HIPAA | CDSCO SaMD | NABH | AERB | CPCB/SPCB | CBAM | CS3D |
  ISO 27001 | SOC 2 (via third-party)

**Control Library Tab:**
Table with search + filter:
Columns: CODE | TITLE | FRAMEWORK | OBLIGATION | STATUS | EVIDENCE COUNT | TAGS

Filter by framework, obligation type (mandatory/recommended/conditional), status.

Click on control → side drawer with:
  Full description | Regulation citation | Test procedure |
  Linked evidence | AI systems affected | Linked tasks

**Mappings Tab:**
Cross-framework mapping table:
Shows where one control maps to equivalent in another framework.
Example: DPDPA Section 7 ↔ GDPR Article 6 ↔ HIPAA 164.508

Visual: matrix grid showing coverage overlap between frameworks.

---

## MODULE 10: HEALTHCARE VERTICAL

**Left sidebar sub-items under AI Systems > Healthcare:**
  Clinical AI Systems | Validation Studies | Consent Records |
  ABDM Integration | CDSCO Registry | NABH Checklist

**Clinical AI Systems Page:**
Card grid view (matching earlier design brief):
Each card: System name | Clinical type badge | Risk class badge |
  Validation status | Compliance score pill | ABDM integrated badge

Click card → AI System Detail page (Module 2).

**NABH Checklist Page:**
Accordion sections matching NABH AI-related standards:
Each item: Standard code | Description | Status (✅/❌/⚠️) | Evidence | Actions

Monthly auto-check runs on 1st of month and updates status.

**ABDM Integration Page:**
Status card for ABDM API connection.
Consent record references table:
  System name | Consent source | Purpose codes | Expires | Count | Verified

---

## MODULE 11: MSME / MANUFACTURING VERTICAL

**Left sidebar sub-items:**
  Factory Sites | Emission Sources | Clearances | Evidence Inbox |
  ESG Disclosures | Buyer Profiles | GPCB Reports

**Factory Sites Page:**
Card view per site:
  Site name | Location | Pollution category badge (Red/Orange/Green/White) |
  Sector | Export markets chips | Compliance score ring |
  [View] [Run Check] buttons

**Factory Detail Page:**
Tab bar: Overview | Compliance Heatmap | Evidence Inbox | Clearances | ESG | AI Systems

**Compliance Heatmap Tab:**
Domain tiles matching earlier design:
  🌿 Environment | 👷 Labour | 🦺 Safety | 🤖 AI Governance | 📊 ESG/Export

Each tile: status colour (red/yellow/green) | score % | progress bar |
  critical issues count | open tasks count

Clearance expiry alerts below tiles.

**Evidence Inbox Tab:**
Month picker at top.
Summary bar: Total | Done | Overdue counts.
Category accordion (Environment | Labour | Safety | ESG | Clearances | AI Oversight).
Each item: item name | due date | status icon | Upload button (if pending).

**ESG Disclosures Tab:**
Table: Period | Type (CBAM/CS3D/Buyer ESG/Scope1-2) | Completion % | Verified | Download

**Buyer Profiles Tab:**
Per buyer (H&M, Zara, Decathlon etc.):
  Required framework | Completion % | Requirements checklist with fix links

---

## MODULE 12: REPORTING & ARTIFACTS

**Tab bar:** Generate | Scheduled | Archive | Templates

**Generate Tab:**
Template cards in a grid (4 columns):
  [🏥 Clinical Risk Assessment]
  [📋 EU AI Act Annex IV Technical Doc]
  [🔐 DPDPA Impact Assessment]
  [🌿 GPCB Monthly Compliance Report]
  [🏭 MSME Compliance Snapshot]
  [📊 ESG Disclosure Report]
  [🎯 Board-Level Risk Summary]
  [🔍 Auditor Evidence Bundle]

Click a template → 3-step flow:
  Step 1: Select AI System / Factory Site + period
  Step 2: AI agent pre-fills content from DB, shows preview sections
  Step 3: Human reviews, edits flagged sections, generates PDF

Output: PDF download + locked evidence bundle with SHA-256 hash.

**Scheduled Tab:**
Table: Report name | Template | Frequency | Next run | Recipients | Status
Toggle on/off. Edit recipients. Change frequency.

---

## MODULE 13: ACTIONS / TASKS

**Tab bar:** My Tasks | All Tasks | Approvals | Workflows

**My Tasks Tab:**
Kanban board: Open | In Progress | Blocked | Completed | Overdue
Task card: title | priority badge | system name | due date | [Complete] button

**Approvals Tab:**
Table of items awaiting sign-off from current user:
  [Assessment name] [System] [Submitted by] [Date] [Preview] [Approve] [Reject]

**Workflows Tab:**
Active workflow instances:
  Workflow name | Template | Started | Current step | Progress bar | Owner

Click → workflow detail: step-by-step visual, current step highlighted.

---

## MODULE 14: ANALYTICS

**Tab bar:** Overview | Compliance Trends | Risk Heatmap | Agent Usage

**Overview Tab:**
- Organisation-wide compliance score over time
- Controls assessed vs total, pass rate
- Evidence upload volume by month
- Open vs closed tasks over time

**Risk Heatmap Tab:**
2D heatmap: X-axis = frameworks, Y-axis = AI systems
Cell colour = compliance score (red to green)
Click cell → drill down to control list.

**Agent Usage Tab:**
- Conversations per day chart
- Top questions asked (word cloud or table)
- Cost tracking: tokens used / cost this month / by org plan limit

---

## COMPLIANCE ASSISTANT CHAT DRAWER

Slide-in from right, 400px wide, full height.
Always accessible via floating button on every page.

**Header:**
[🤖] Compliance Assistant
Subtitle: EU AI Act · DPDPA · ABDM · CPCB · CDSCO

**Context awareness:**
If user is viewing a specific AI system, show:
  "Context: ChestScan AI v3.1 (Class II, High Risk)" — dismissible tag

**Message thread:**
User messages: right-aligned, blue bubble
Agent messages: left-aligned, grey bubble
Agent actions (tasks created, drafts saved): small green action chips below message
  ✅ Created task: Upload IRB approval
  ✅ Draft saved: DPDPA Consent Notice

**Suggested prompts (before first message):**
  "What am I missing for EU AI Act?"
  "Draft my clinical risk assessment"
  "Which controls are failing?"
  "What does DPDPA require for this system?"
  "When does our NABH accreditation expire?"
  "Help me respond to the H&M ESG questionnaire"

**Input bar:**
Text input + send button.
Paperclip icon: attach document (agent reads and advises).

---

## NOTIFICATION CENTRE

Bell icon in top bar. Click → dropdown panel (not a full page).

Tabs: All | Unread | Critical

Items grouped by type:
  🔴 NABH accreditation expires in 7 days — Sahyadri Hospital
  🟡 ETP effluent report overdue for March 2025 — Rajlakshmi Textiles
  ✅ Monthly compliance check completed — 3 critical items found
  📄 Compliance report ready to download — February 2025
  👤 New task assigned to you — Upload IRB approval for ChestScan AI
  ⚠️ Compliance score dropped below 60% — SepsisAlert ICU Model

Each item: icon | title | org/system name | timestamp | [Mark read] [Go to item]

Mark all read button at top.

---

## ONBOARDING WIZARD (shown on first login)

4-step full-screen overlay:

Step 1: Organisation type
  Cards: 🏥 Hospital / Clinic | 🏭 MSME Factory | 🔬 Diagnostic Lab |
         💊 Pharma | 🏛️ Government | 🔧 Tech Company

Step 2: State & sector details
  State picker | District | Pollution category (if factory) |
  Export markets (chips: EU, US, UK, UAE, etc.)

Step 3: Select active frameworks
  Checkbox cards: EU AI Act | DPDPA | CDSCO SaMD | NABH |
                  CPCB/SPCB | ISO 42001 | NIST AI RMF | CBAM/CS3D

Step 4: Register first AI system
  Quick form: name | type | risk tier | sector
  Skip option: "I'll add systems later"

Completion: confetti animation + redirect to dashboard.
Platform auto-creates standard licence checklist based on choices.

---

## DESIGN SYSTEM SUMMARY

### Colours
Primary blue: #2563EB (buttons, active states, links)
Success green: #16A34A
Warning orange: #EA580C
Danger red: #DC2626
Border: #E5E7EB (0.5px)
Background: #FFFFFF (main) / #F9FAFB (secondary)
Text primary: #111827
Text secondary: #6B7280

### Status Badges (pill-shaped, 12px font)
Compliant: bg #DCFCE7, text #166534
Non-compliant: bg #FEE2E2, text #991B1B
Partial: bg #FEF9C3, text #854D0E
Not assessed: bg #F3F4F6, text #374151
In progress: bg #EDE9FE, text #5B21B6
Critical: bg #FEE2E2, text #991B1B
High: bg #FFEDD5, text #9A3412

### Typography
Font: Inter (or system-ui fallback)
H1: 24px / 500
H2: 20px / 500
H3: 16px / 500
Body: 14px / 400
Small/labels: 12px / 400
Table headers: 11px / 500 / uppercase / letter-spacing 0.06em

### Component Patterns
- All tables: zebra striping on hover only, not default
- All modals: max-width 600px, backdrop blur
- All forms: labels above inputs, not inline
- All charts: no gridlines by default, minimal axis labels
- Empty states: illustration + helper text + primary action button
- Loading states: skeleton loaders (not spinners) for table rows

---

## API INTEGRATION NOTES FOR DEVELOPER

Base URL: `process.env.NEXT_PUBLIC_API_URL` (e.g. http://localhost:8000)

All authenticated requests: `Authorization: Bearer {token}` header.

Key endpoints already live:
```
POST /api/ai-systems          — register system
GET  /api/ai-systems          — list systems (org-scoped)
POST /api/evidence            — attach evidence
POST /api/compliance/run      — run compliance check
POST /api/agent/chat          — platform agent
POST /api/agent/standalone    — public agent (no auth)
POST /api/generate-artifact   — document generation
GET  /health                  — health check
```

Use `frontend/services/api.ts` for all fetch calls.
Use React Query (`@tanstack/react-query`) for data fetching and caching.
All mutations should invalidate relevant query keys.

---

## DELIVERABLES EXPECTED FROM ANTIGRAVITY

1. Figma design file with all screens (desktop first, mobile responsive)
2. Component library (shadcn/ui base, customised to design system above)
3. Next.js implementation of all pages listed above
4. Responsive breakpoints: 1440px (desktop), 1024px (laptop), 768px (tablet)
5. Storybook for all components
6. All API calls wired to real backend (not mocked)
7. Accessibility: WCAG 2.1 AA compliance

Priority order for development:
Phase 1 (Weeks 1-3):
  Layout, sidebar, top bar, notification centre, compliance assistant chat
Phase 2 (Weeks 4-6):
  Module 1 (Cockpit), Module 2 (AI Systems), Module 12 (Reports)
Phase 3 (Weeks 7-9):
  Module 3 (AI Assessment), Module 6 (Impact Assessments), Module 7 (Incidents)
Phase 4 (Weeks 10-12):
  Module 10 (Healthcare vertical), Module 11 (MSME vertical), Module 14 (Analytics)
Phase 5 (Weeks 13-14):
  Onboarding wizard, desktop app (Electron wrapper), mobile responsive polish
