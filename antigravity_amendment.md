# Antigravity — AMENDMENT BRIEF
## Dashboard Redesign + Sidebar Rework + Missing Tab Content
### Supplement to: antigravity_design_prompt.md (read that first)

This document covers ONLY changes and additions to the existing brief.
Do NOT re-read the full spec — apply these on top of it.

---

## CONTEXT: WHAT WE SAW IN THE LIVE SCREENSHOTS

The current platform at localhost:3000 has:
- Sidebar structure that is correct but NOT context-aware per org type
- Several tabs showing empty placeholder text ("Content is part of the
  enterprise healthcare workflow", "Part of the enterprise admin workflow")
- Dashboard is cluttered — too much information density, no clear hierarchy
- AI Agent is only a floating button (bottom-right) — needs to also live
  in the top navigation like Vanta's new agent placement
- Sidebar groups are good but need tighter Vanta-style labels and ordering

---

## CHANGE 1: DASHBOARD — FULL REDESIGN

### Problem (current)
The dashboard shows too many widgets crammed together. Users cannot
scan it in under 5 seconds. There is no clear "what do I do today?"
answer.

### Solution: Vanta-style "Program at a Glance" layout

Take direct inspiration from the Vanta compliance report screenshot:
- Framework progress as a multi-line trend chart (one line per framework)
- Upcoming deadlines as a Gantt-style horizontal bar chart
- Task completion rates per team/department as stacked bar chart
- Tests/controls passing over time as a line chart

**New Dashboard layout (3 zones):**

```
┌──────────────────────────────────────────────────────────────┐
│  ZONE 1: My Work (top strip — 3 cards, always visible)       │
│  [Tasks assigned to me: 4]  [Approvals waiting: 2]           │
│  [Licences expiring < 30d: 3]                                │
│  → "View all my work" link                                   │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────┐  ┌───────────────────────────────────┐
│  ZONE 2a             │  │  ZONE 2b                          │
│  Framework Progress  │  │  Upcoming Deadlines               │
│  (line chart,        │  │  (horizontal Gantt bars)          │
│   last 6 months,     │  │                                   │
│   one line per       │  │  NABH Accreditation  [████░░]     │
│   active framework)  │  │  GPCB CTO           [██████░]    │
│                      │  │  DPDPA Review       [████████░]  │
│  EU AI Act  ──────   │  │  AERB Licence       [█░░░░░░░]  │
│  DPDPA      ─ ─ ─    │  │                                   │
│  CDSCO      ......   │  │  Today    +30d    +60d    +90d   │
└──────────────────────┘  └───────────────────────────────────┘

┌──────────────────────┐  ┌───────────────────────────────────┐
│  ZONE 3a             │  │  ZONE 3b                          │
│  Control Health      │  │  Agent Activity Feed              │
│  (by framework)      │  │                                   │
│  Passing: 42 ✅      │  │  🤖 Agent created 3 tasks         │
│  Failing:  8 ❌      │  │     for ChestScan AI  — 2h ago   │
│  Partial:  12 ⚠️     │  │  🤖 DPDPA consent gap found      │
│  Not assessed: 6 ○   │  │     in SepsisAlert — 5h ago      │
│                      │  │  🤖 GPCB report generated        │
│  [Run full scan]     │  │     for Rajlakshmi — yesterday   │
└──────────────────────┘  └───────────────────────────────────┘
```

**Key rules:**
- Zone 1 is a sticky bar — always shows "my work" regardless of scroll
- Charts use Chart.js with clean minimal style (no grid lines by default)
- No nested scrolling — all zones visible in one viewport on 1440px
- Empty state for Zone 3b Agent Feed: "No agent activity yet.
  Ask the Compliance Assistant a question to get started."
- Date filter on dashboard: [Last 30 days ▼] [Framework: All ▼]
  (inspired directly by Vanta compliance report screenshot)

---

## CHANGE 2: SIDEBAR — CONTEXT-AWARE PER ORG TYPE

### Problem (current)
Same sidebar shown to everyone. A textile factory manager sees
"Clinical AI Systems" and "ABDM Integration" — irrelevant to them.
A hospital compliance officer sees "GPCB Reports" — irrelevant.

### Solution: Org-type aware sidebar (selected at login/onboarding)

The user selects their org type during onboarding (already designed).
That selection drives which sidebar items appear.

**Sidebar structure — ALL ORG TYPES (universal base):**
```
CORE
  🏠 Dashboard
  🤖 AI Systems
  📋 AI Assessment

PRIVACY & RISK
  📁 Processings (ROPA)
  🛡️  Privacy by Design
  📊 Impact Assessments
  🔴 Incidents & Breaches
  👤 Data Subject Requests

GOVERNANCE
  📐 Frameworks & Controls
  📄 Reporting & Artifacts

VERTICALS
  [context-aware — see below]

OPERATIONS
  ✅ Actions & Workflows
  📊 Analytics & Telemetry
```

**VERTICALS section changes per org type:**

For HOSPITAL / CLINIC:
```
VERTICALS
  🏥 Healthcare Suite        ← active, heart icon
      Clinical AI Systems
      Validation Studies
      Consent Records
      ABDM Integration
      CDSCO Registry
      NABH Checklist
```

For MSME FACTORY / MANUFACTURING:
```
VERTICALS
  🏭 Manufacturing Suite     ← active, factory icon
      Factory Sites
      Emission Sources
      Site Clearances
      Evidence Inbox
      ESG Disclosures
      Buyer Profiles
      GPCB Reports
```

For DIAGNOSTIC LAB:
```
VERTICALS
  🔬 Lab Suite
      Lab AI Systems
      NABL Accreditation
      CDSCO Registry
      Consent Records
```

For TECH COMPANY / SaaS:
```
VERTICALS
  💻 Tech Suite
      Software AI Systems
      Data Processing Records
      Vendor Risk
      Trust Center
```

For MULTI-SITE (hospital chain, factory group):
Both Healthcare Suite AND Manufacturing Suite appear.
User can switch active vertical via dropdown at top of VERTICALS section.

**Implementation note:**
Store `org_type` in user session/JWT claims.
Sidebar component reads `org_type` and renders the correct VERTICALS block.
`org_type` options: hospital | factory | lab | pharma | tech | government | multi

**Sidebar width and style (matching current screenshots):**
- Width: 240px fixed
- Group labels: 11px, uppercase, letter-spacing 0.08em, color #9CA3AF
- Active item: left 3px accent border (brand purple #7C3AED), bg #F5F3FF
- Icons: 18px, left of label, color inherits from item state
- Sub-items: indented 28px, 13px font, no icon
- Bottom: user avatar + name + role + logout icon (matching current screenshots)

---

## CHANGE 3: FILL ALL EMPTY TAB STATES

The current screenshots show several tabs with placeholder text.
Fill every one of them with real content as specified below.

### 3a. Healthcare Suite → CDSCO Registry tab

**Content:**
```
Header: CDSCO SaMD Registry
Subtitle: Track registration status of all AI systems classified
          as Software as a Medical Device under CDSCO guidance.

Top bar: [+ Register System with CDSCO] [Sync Status]

Status summary cards (3):
  [Registered: 0]  [Pending Registration: 2]  [Not Started: 1]

Table:
SYSTEM NAME | RISK CLASS | REGISTRATION NO. | STATUS | SUBMITTED | VALIDITY | ACTIONS

Example rows:
ChestScan AI v3.1 | Class II | —          | Pending Registration | —        | —    | [Begin]
SepsisAlert       | Class III | —          | Not Started         | —        | —    | [Begin]
TeleHealth Bot    | Class I   | CDSCO/AI/… | Registered          | 12/03/25 | 2027 | [View]

Empty state (when no systems):
  [CDSCO logo placeholder]
  "No AI systems registered with CDSCO yet."
  "Register your first clinical AI system to begin tracking
   SaMD registration status."
  [+ Register AI System] button

Help text below table:
"AI systems used for diagnosis, prognosis, or treatment decisions
 in India may qualify as SaMD under CDSCO's 2022 guidance.
 Class II and III systems require pre-market submission."
 [Read CDSCO Guidance →]
```

### 3b. Privacy by Design → Settings tab

**Content:**
```
Header: Assessment Settings

3 setting cards:

Card 1: Default Assessment Template
  Dropdown: Which template to use when creating a new assessment
  Options: DPDPA Privacy by Design | GDPR Art. 25 | Custom
  [Save preference]

Card 2: Approval Workflow
  Toggle: Require sign-off before assessment is marked complete
  Approver role: [Risk Manager ▼]
  Deadline: [30 days after creation ▼]

Card 3: Notification Preferences
  Toggle list:
  ✅ Notify me when an assessment is assigned to me
  ✅ Notify me when an assessment is overdue
  ⬜ Notify assessor when nearing deadline (7 days)
  ✅ Send monthly summary of open assessments
  [Save all settings]
```

### 3c. Incidents & Breaches → Breaches tab

**Content:**
```
Header: Data Breaches
Subtitle: Track personal data breaches and regulatory notification
          obligations under DPDPA Section 8(6) and GDPR Article 33.

Top bar: [+ Report Breach] [Export]

Status summary cards (4):
  [Open: 0]  [Notified to Regulator: 0]  [Resolved: 0]  [Total: 0]

Table:
BREACH ID | DATE DISCOVERED | TYPE | DATA AFFECTED | INDIVIDUALS | STATUS | NOTIFICATION DEADLINE | ASSIGNED

Types: Unauthorised access | Accidental disclosure | Ransomware |
       System breach | Third-party breach | Physical theft | Other

Empty state:
  [Shield icon]
  "No data breaches recorded."
  "If a personal data breach occurs, report it here immediately."
  "Under DPDPA Section 8(6), breaches must be reported to the
   Data Protection Board of India without undue delay."
  [+ Report a Breach] button

Below table — Regulatory Notification Tracker:
When a breach exists, show:
  Regulator | Deadline | Status | Notification Letter
  DPDP Board (India) | 72 hours | ⏳ Pending | [Draft Letter]
  CERT-In (if applicable) | 6 hours | ⏳ Pending | [Draft Letter]
```

### 3d. Fill all other tabs that show "Part of enterprise workflow"

For any tab showing enterprise-locked placeholder text, replace with:
- A clear description of what the tab will contain
- A "Coming in your plan" upgrade card IF it truly requires a higher tier
- OR the actual content if it should be available

Specifically check and fill:
- Manufacturing Suite → GPCB Reports tab
- Manufacturing Suite → Buyer Profiles tab
- Frameworks & Controls → Policy Packs tab
- Reporting & Artifacts → Templates tab

---

## CHANGE 4: AI AGENT — TOP NAVIGATION PLACEMENT

### Problem (current)
Agent is only accessible via floating bottom-right button.
Vanta places their agent in the top navigation bar for instant access
from anywhere without blocking the main content area.

### Solution: Dual agent access (keep floating button + add top nav)

**Top navigation bar — add agent icon:**
```
[Logo] [Module ▼]    [── Search ──]    [🤖] [🔔 4] [DA Darpan ▼]
                                         ↑
                               New: AI Agent icon in top nav
                               Click → opens agent slide-in panel
                               (same chat panel as current floating button)
                               Shows "● Active" dot when agent has run
                               something in background
```

**Agent panel behaviour (update from current):**
Inspired by Vanta Agent screenshot — the agent panel is now:
- Slides in from RIGHT side (400px wide)
- Has its own header: "AI Agent" + [+ New chat] button + [✕]
- Shows "Thinking involved N steps" collapsible when agent used tools
- Shows "Summary:" section with findings at top of each response
- Shows "Findings and remediation instructions:" as numbered list
- Shows "[N sources]" citation count below each response
- Has thumbs up/down feedback buttons below each message
- Keeps chat history — "History" tab shows previous conversations

This matches the Vanta Agent screenshot exactly:
- "Vanta AI found gaps in the provided evidence" — replicate as
  "AI Agent found compliance gaps in [System Name]" alert banner
  that appears in the evidence/controls tabs, not just in chat

---

## CHANGE 5: VANTA-INSPIRED FEATURES TO ADD

These are features Vanta launched in 2025 that we should match:

### 5a. "My Work" — Personal task hub (Vanta calls this same thing)
A dedicated page (link from Zone 1 dashboard strip) showing:
- Tasks assigned to me (from workflow engine)
- Approvals I need to give
- Documents I need to review
- Licences I own that are expiring
- Impact assessment items waiting on me

Route: /my-work
Sidebar: add under OPERATIONS → "My Work" (above Actions & Workflows)

### 5b. Program Task Completion Rate (from Vanta screenshot)
On the dashboard, add a "Program completion by team" widget:
Shows each department/team and their % of compliance tasks done.

```
Program task completion rate:
Clinical Team   [████████░░] 82%
Admin           [██████████] 100%
IT              [█████░░░░░] 54%
Risk Team       [███████░░░] 71%
```

### 5c. Context-aware agent prompts (Vanta feature)
When on the Healthcare Suite page, agent shows healthcare-specific prompts:
  "Check CDSCO registration status for all systems"
  "Draft ABDM consent notice for ChestScan AI"
  "Find validation study gaps across all clinical AI"

When on Manufacturing Suite page, agent shows MSME-specific prompts:
  "Check overdue evidence for this month"
  "Summarise GPCB compliance status for all sites"
  "What CBAM data does Rajlakshmi Textiles need to collect?"

When on Incidents page:
  "Draft DPDP Board notification letter for this breach"
  "What is the reporting deadline for this incident?"

### 5d. Evidence gap banner (from Vanta screenshot)
When agent detects gaps in evidence attached to a control or AI system,
show an inline warning banner (not just in chat):

```
┌─────────────────────────────────────────────────────┐
│  ⚠️  AI Agent found gaps in the provided evidence    │
│  [Dismiss]  [✦ Review evaluation]                   │
└─────────────────────────────────────────────────────┘
```

This banner appears:
- In the Evidence sub-tab of any AI System detail page
- In the Controls sub-tab when auto-check finds a gap
- Clicking "Review evaluation" opens the agent panel with
  the specific gap analysis pre-loaded

### 5e. Multiple risk registers (Vanta feature, adapt for India)
Allow organisations to have separate risk registers per:
- Business unit (hospital branch / factory site)
- Framework (EU AI Act risks vs DPDPA risks)
- Category (clinical risk / operational risk / environmental risk)

Add to sidebar under GOVERNANCE:
  📐 Frameworks & Controls
  ⚠️  Risk Register            ← NEW
  📄 Reporting & Artifacts

---

## CHANGE 6: SPRINTO-INSPIRED — CONTINUOUS MONITORING STRIP

Sprinto's key differentiator is a real-time monitoring view.
Add a "Monitoring" section to the sidebar under OPERATIONS:

```
OPERATIONS
  🏠 My Work                  ← NEW
  ✅ Actions & Workflows
  🔍 Continuous Monitoring    ← NEW
  📊 Analytics & Telemetry
```

**Continuous Monitoring page:**
```
Header: Continuous Monitoring
Subtitle: Real-time control health across all connected systems

Tab bar: Control Health | Checks | Alerts | Configure

Control Health tab:
  Filter: [Framework ▼] [AI System ▼] [Status ▼] [Date range]

  Table:
  CHECK NAME | SYSTEM | FRAMEWORK | LAST RUN | STATUS | FREQUENCY | TREND

  Status options:
  ✅ Passing | ❌ Failing | ⚠️ Warning | ⏸ Paused | ○ Not configured

  Trend: small sparkline showing last 7 check results

Alerts tab:
  List of triggered alerts with:
  - Alert name + what triggered it
  - System / site affected
  - Time triggered
  - [Acknowledge] [Create Task] [Dismiss] buttons

Configure tab:
  Set up automated checks:
  - Monthly evidence deadline reminders
  - Licence expiry warnings (30/7/1 days)
  - Compliance score drop alerts (if drops below X%)
  - COD/BOD threshold breach (for factory sites)
  - AI system incident log review reminders
```

---

## CHANGE 7: SIDEBAR BOTTOM — USER SECTION UPDATE

Current screenshots show: `[DA] Darpan Antala / Compliance Officer [→]`
This is correct. Keep it. Add one small addition:

Below the user section, add:
```
[🔒] Security posture  ← small link, opens /security/posture page
[?] Help & support
```

---

## IMPLEMENTATION PRIORITY FOR THESE CHANGES

```
Sprint 1 (this week):
  ✅ Dashboard Zone 1 "My Work" strip
  ✅ Dashboard Zone 2 charts (Framework Progress + Upcoming Deadlines)
  ✅ Org-type aware sidebar (hospital vs factory at minimum)
  ✅ Fill CDSCO Registry tab content
  ✅ Fill Privacy by Design Settings tab
  ✅ Fill Incidents Breaches tab

Sprint 2 (next week):
  ✅ Agent in top navigation bar
  ✅ Evidence gap banner (inline AI finding)
  ✅ Context-aware agent prompts per page
  ✅ My Work page (/my-work)

Sprint 3:
  ✅ Continuous Monitoring page + sidebar item
  ✅ Risk Register page + sidebar item
  ✅ Program task completion widget on dashboard
  ✅ Agent panel history tab + multi-step thinking display
```

---

## REFERENCE IMAGES PROVIDED

- Screenshot 1: Current platform Healthcare Suite (localhost:3000/healthcare)
  → CDSCO Registry tab is empty — fill it per Change 3a
  
- Screenshot 2: Current platform Privacy by Design (localhost:3000/privacy-by-design)
  → Settings tab is empty — fill it per Change 3b
  
- Screenshot 3: Current platform Incidents (localhost:3000/incidents)
  → Breaches tab is empty — fill it per Change 3c
  
- Screenshot 4: Vanta Compliance Report dashboard
  → Use as direct reference for dashboard Zone 2 charts (Change 1)
  
- Screenshot 5: Vanta Agent panel + evidence gap banner
  → Use as direct reference for Changes 4 and 5d
