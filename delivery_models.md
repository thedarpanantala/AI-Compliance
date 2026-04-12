# Two Delivery Models: Web SaaS + Desktop App
## Implementation Guide for AI Compliance Platform

---

## THE BIG PICTURE

```
Same backend code. Same database. Same agent.
Two different ways customers access it.

Model 1: Cloud SaaS          Model 2: Desktop App
─────────────────────        ──────────────────────
Browser → your server        App on their laptop →
                             their local server
                             (or your cloud)

Customers: Large hospitals   Customers: SMEs, MSMEs,
PSUs, chains, enterprises    factory managers, clinics
Price: ₹50k–₹5L/month       Price: ₹5k–₹20k/month
                             one-time or subscription
```

---

# MODEL 1: Web Browser SaaS

## What the Hospital Actually Experiences

```
1st of every month — automated scheduler runs:
        │
        ▼
Platform scans ALL licences and compliance items
for all 2000-bed hospital's AI systems, equipment,
drugs, government licences
        │
        ▼
Auto-generates "Monthly Compliance Report"
Red = expired or overdue
Yellow = due within 30 days
Green = compliant
        │
        ▼
Email sent to Compliance Officer:
"15 items need your attention before month end.
 3 are critical. Click here to review."
        │
        ▼
Officer opens browser → sees dashboard →
reviews only the flagged items →
clicks Approve / Reject / Escalate
        │
        ▼
Digital sign-off recorded with timestamp
Audit trail locked
Report generated as PDF
        │
        ▼
Human time spent: 20-30 minutes per month
vs. currently: 3-4 days manual work
```

---

## Full Automation Architecture for Hospital

### What gets automated (zero human touch):

```
┌─────────────────────────────────────────────────────┐
│                AUTOMATED LAYER                       │
│                                                      │
│  Scheduler (runs 1st of every month + daily checks) │
│         │                                            │
│    ┌────┴──────────────────────────────────┐        │
│    │                                        │        │
│  Licence         Evidence           AI      │        │
│  Expiry          Collector          Agent   │        │
│  Checker         (connectors)       Checks  │        │
│    │                  │               │     │        │
│    ▼                  ▼               ▼     │        │
│  "NABH cert      "Lab report      "Compliance│       │
│   expires in      due, not         score     │       │
│   45 days"        uploaded"        dropped"  │       │
└────────────────────────────────────────────────┘
                    │
                    ▼
        ┌───────────────────────┐
        │   HUMAN REVIEW LAYER  │
        │   (minimal touch)     │
        │                       │
        │  Shows only:          │
        │  - Critical alerts    │
        │  - Expiring items     │
        │  - Failed checks      │
        │                       │
        │  Human action:        │
        │  Approve / Flag /     │
        │  Upload missing doc   │
        └───────────────────────┘
```

---

## Key Features to Build for Web SaaS

### Feature 1: Automated Monthly Scheduler

```python
# backend/app/workers/monthly_scheduler.py

from datetime import date, timedelta
import asyncio

COMPLIANCE_CATEGORIES = {
    "hospital": [
        # Licences
        {"name": "NABH Accreditation",           "type": "licence",    "freq": "annual"},
        {"name": "AERB Radiation Safety Licence", "type": "licence",    "freq": "annual"},
        {"name": "Clinical Establishment Licence","type": "licence",    "freq": "annual"},
        {"name": "Blood Bank Licence",            "type": "licence",    "freq": "annual"},
        {"name": "PCPNDT Registration",           "type": "licence",    "freq": "annual"},
        {"name": "Pharmacy Licence (Form 20/21)", "type": "licence",    "freq": "annual"},
        {"name": "Bio-Medical Waste Auth Letter", "type": "licence",    "freq": "annual"},
        {"name": "Fire NOC",                      "type": "licence",    "freq": "annual"},
        {"name": "Lift Inspection Certificate",   "type": "inspection", "freq": "annual"},
        {"name": "Boiler Certificate",            "type": "inspection", "freq": "annual"},
        # Monthly compliance
        {"name": "BMW Disposal Records",          "type": "evidence",   "freq": "monthly"},
        {"name": "Infection Control Audit",       "type": "evidence",   "freq": "monthly"},
        {"name": "Drug Expiry Check Records",     "type": "evidence",   "freq": "monthly"},
        {"name": "Emergency Equipment Log",       "type": "evidence",   "freq": "monthly"},
        # AI systems
        {"name": "AI System Incident Log Review", "type": "ai_check",  "freq": "monthly"},
        {"name": "Clinical AI Validation Status", "type": "ai_check",  "freq": "quarterly"},
    ],
    "textile": [
        {"name": "GPCB Consent to Operate",       "type": "licence",   "freq": "annual"},
        {"name": "Factory Licence",               "type": "licence",   "freq": "annual"},
        {"name": "ETP Effluent Lab Report",       "type": "evidence",  "freq": "monthly"},
        {"name": "Stack Emission Report",         "type": "evidence",  "freq": "monthly"},
        {"name": "Hazardous Waste Manifest",      "type": "evidence",  "freq": "monthly"},
        {"name": "Safety Drill Record",           "type": "evidence",  "freq": "monthly"},
        {"name": "Worker Wage Register",          "type": "evidence",  "freq": "monthly"},
        {"name": "ESG Disclosure Update",         "type": "evidence",  "freq": "quarterly"},
    ]
}


async def run_monthly_check(org_id: str, industry: str, db):
    """
    Runs on 1st of every month.
    Checks all licences, creates inbox items, sends alerts.
    """
    today      = date.today()
    categories = COMPLIANCE_CATEGORIES.get(industry, [])
    alerts     = []

    for item in categories:
        # Check if evidence uploaded for this month
        status = await check_item_status(org_id, item, today, db)

        if status == "overdue":
            alerts.append({
                "severity": "critical",
                "item":     item["name"],
                "message":  f"{item['name']} is overdue",
            })
        elif status == "due_soon":
            alerts.append({
                "severity": "warning",
                "item":     item["name"],
                "message":  f"{item['name']} due within 30 days",
            })

    # Send email summary to compliance officer
    if alerts:
        await send_monthly_alert_email(org_id, alerts, db)

    return {"checked": len(categories), "alerts": len(alerts)}
```

---

### Feature 2: One-Click Approval Dashboard

```tsx
// frontend/app/monthly-review/page.tsx
// The compliance officer sees ONLY what needs their attention

export default function MonthlyReviewDashboard() {
  const { data } = useQuery({
    queryKey: ["monthly-review"],
    queryFn: fetchPendingReviews,
  });

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Monthly Review</h1>
          <p className="text-gray-500">
            {data?.critical} critical · {data?.warnings} warnings ·
            Estimated review time: {data?.estimated_minutes} minutes
          </p>
        </div>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg">
          Approve All Green Items
        </button>
      </div>

      {/* Critical items first */}
      <Section title="🔴 Critical — Action Required" items={data?.critical_items} />
      <Section title="🟡 Due Soon — Review Needed"  items={data?.warning_items} />
      <Section title="✅ Compliant — One-click confirm" items={data?.green_items} />
    </div>
  );
}

function Section({ title, items }: any) {
  return (
    <div className="border rounded-xl overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 font-semibold text-sm">{title}</div>
      <div className="divide-y">
        {items?.map((item: any) => (
          <div key={item.id} className="flex items-center gap-3 px-4 py-3">
            <div className="flex-1">
              <p className="font-medium text-sm">{item.name}</p>
              <p className="text-xs text-gray-400">{item.detail}</p>
            </div>
            <div className="flex gap-2">
              {item.can_upload && (
                <label className="cursor-pointer text-xs px-3 py-1.5 border rounded-lg hover:bg-gray-50">
                  <input type="file" className="hidden" />
                  Upload
                </label>
              )}
              <button className="text-xs px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
                Approve
              </button>
              <button className="text-xs px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">
                Flag
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

### Feature 3: Email Notifications (automated alerts)

```python
# backend/app/services/notifications.py

import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

async def send_monthly_alert_email(org_id: str, alerts: list, db):
    critical = [a for a in alerts if a["severity"] == "critical"]
    warnings = [a for a in alerts if a["severity"] == "warning"]

    subject = f"⚠️ {len(critical)} Critical Compliance Items Need Attention"

    html = f"""
    <h2>Monthly Compliance Review — Action Required</h2>
    <p>Your automated compliance check found {len(alerts)} items needing attention.</p>

    <h3 style="color:red">Critical ({len(critical)} items)</h3>
    <ul>
    {"".join(f'<li>{a["item"]}: {a["message"]}</li>' for a in critical)}
    </ul>

    <h3 style="color:orange">Warnings ({len(warnings)} items)</h3>
    <ul>
    {"".join(f'<li>{a["item"]}: {a["message"]}</li>' for a in warnings)}
    </ul>

    <a href="https://yourplatform.com/monthly-review"
       style="background:#2563eb;color:white;padding:12px 24px;
              border-radius:8px;text-decoration:none">
      Review and Approve →
    </a>

    <p style="color:gray;font-size:12px">
      Estimated review time: {len(alerts) * 2} minutes
    </p>
    """

    # Send via SMTP (use SendGrid/AWS SES in production)
    await send_email(
        to=await get_compliance_officer_email(org_id, db),
        subject=subject,
        html=html,
    )
```

---

## Web SaaS Deployment (for large hospitals)

```
Your server (AWS Mumbai):
  ├── Frontend: Next.js → app.yourplatform.com
  ├── Backend:  FastAPI → api.yourplatform.com
  ├── Database: RDS PostgreSQL (one per large hospital
  │                              or shared with tenant isolation)
  └── Scheduler: Cron jobs run automatically

Hospital accesses via:
  → Chrome/Edge/Safari on any computer
  → No installation needed
  → Works on tablet too (for ward rounds)
  → SSO login with their existing Google/Microsoft account

Cost to hospital: ₹50,000–₹5,00,000/month
  depending on number of beds, AI systems, users
```

---

---

# MODEL 2: Desktop App (Electron)

## What "Desktop App" Means for Your Product

You don't rebuild the entire product. You wrap your existing
Next.js frontend in **Electron** — a framework that turns any
web app into a `.exe` file that installs like normal software.

```
What Electron does:
  Your Next.js frontend
        +
  Electron wrapper
        =
  .exe installer that works like any Windows software

The backend (FastAPI) still runs — but it runs locally
on their machine OR connects to your cloud server.
```

---

## Two Sub-Options for Desktop App

### Sub-Option A: Desktop app → connects to your cloud
```
Customer installs .exe on their laptop
        │
        ▼
App opens (looks like normal software)
        │
        ▼
Connects to YOUR server via internet
(same backend as web version)
        │
        ▼
Works offline for viewing cached data
Syncs when internet available

Best for: Small clinics, MSME factories,
          consultants who advise multiple clients
```

### Sub-Option B: Fully local (air-gapped for sensitive customers)
```
Customer installs .exe on their laptop/server
        │
        ▼
App runs ENTIRELY on their machine
No data leaves their premises
        │
        ▼
Backend (FastAPI) runs locally
Database (PostgreSQL) runs locally
Agent uses local Ollama (DeepSeek)

Best for: Government hospitals, defence,
          customers who refuse cloud
```

---

## How to Build the Desktop App

### Step 1 — Add Electron to your frontend

```powershell
cd frontend
npm install electron electron-builder --save-dev
```

### Step 2 — Create `frontend/electron/main.js`

```javascript
const { app, BrowserWindow, shell } = require('electron');
const { spawn } = require('child_process');
const path = require('path');

let mainWindow;
let backendProcess;

// Start the FastAPI backend automatically
function startBackend() {
  const backendPath = path.join(process.resourcesPath, 'backend');
  backendProcess = spawn('python', ['-m', 'uvicorn', 'app.main:app',
    '--host', '127.0.0.1', '--port', '8000'], {
    cwd: backendPath,
    windowsHide: true,
  });

  backendProcess.stdout.on('data', (data) => {
    console.log(`Backend: ${data}`);
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    title: 'AI Compliance Platform',
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Load your Next.js app
  // In production: load from local build
  // In development: load from localhost:3000
  const isDev = process.env.NODE_ENV === 'development';
  mainWindow.loadURL(isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../out/index.html')}`
  );

  // Open external links in browser, not Electron
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.whenReady().then(() => {
  startBackend();
  // Wait 3 seconds for backend to start
  setTimeout(createWindow, 3000);
});

app.on('before-quit', () => {
  if (backendProcess) backendProcess.kill();
});
```

### Step 3 — Add build config to `package.json`

```json
{
  "scripts": {
    "electron:dev":   "electron electron/main.js",
    "electron:build": "next build && next export && electron-builder build"
  },
  "build": {
    "appId":       "com.yourcompany.aicomplianceplatform",
    "productName": "AI Compliance Platform",
    "win": {
      "target": "nsis",
      "icon":   "electron/icon.ico"
    },
    "files": [
      "out/**/*",
      "electron/**/*"
    ],
    "extraResources": [
      {"from": "../backend", "to": "backend", "filter": ["**/*"]}
    ]
  }
}
```

### Step 4 — Build the installer

```powershell
cd frontend
npm run electron:build
```

This creates:
```
frontend/dist/
  AI Compliance Platform Setup 1.0.0.exe   ← send this to customer
```

Customer double-clicks → installs like any Windows software → done.

---

## What the Desktop App Looks Like

```
┌─────────────────────────────────────────────────────────┐
│  AI Compliance Platform                    _ □ ✕        │
├─────────────────────────────────────────────────────────┤
│  ┌──────────┐                                           │
│  │ Dashboard│  🏥 Sahyadri Hospital — March 2025        │
│  │ Licences │                                           │
│  │ AI Systems│  ┌──────────┬──────────┬──────────┐     │
│  │ Evidence │  │ 3 Critical│ 8 Due    │ 42 OK    │     │
│  │ Reports  │  │  🔴       │  🟡      │  ✅      │     │
│  │ Agent 💬 │  └──────────┴──────────┴──────────┘     │
│  └──────────┘                                           │
│               [Run Monthly Check] [Generate Report]     │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ 💬 Ask anything...                              │   │
│  │ "When does our NABH accreditation expire?"      │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

Same features as web — but runs as installed software.

---

## Offline Mode (for desktop app)

```javascript
// frontend/app/hooks/useOfflineMode.js
import { useEffect, useState } from 'react';

export function useOfflineMode() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncPending, setSyncPending] = useState(0);

  useEffect(() => {
    window.addEventListener('online',  () => setIsOnline(true));
    window.addEventListener('offline', () => setIsOnline(false));
  }, []);

  // When back online — sync any pending uploads
  useEffect(() => {
    if (isOnline && syncPending > 0) {
      syncPendingItems();
    }
  }, [isOnline]);

  return { isOnline, syncPending };
}
```

Shows a banner:
```
🔴 Working offline — 3 items queued for sync when connected
```

---

# COMPARISON: Which Model for Which Customer

| Customer Type | Model | Why |
|---|---|---|
| 2000-bed hospital chain | Web SaaS | Multiple locations, many users, needs central dashboard |
| Single 200-bed hospital | Web SaaS | Still needs cloud backup, can't manage own servers |
| MSME textile factory | Desktop | Owner uses one laptop, no IT team, works offline |
| Diagnostic lab (50 beds) | Either | Depends on IT capability |
| Compliance consultant | Desktop | Manages 20 client factories from one laptop |
| Government hospital | Desktop local | Air-gapped, data cannot leave premises |
| Hospital group (10 branches) | Web SaaS | Centralised view across branches |

---

# AUTOMATED WORKFLOW: Full Picture

## For a 2000-Bed Hospital (Web SaaS)

```
EVERY NIGHT (automated, zero human):
─────────────────────────────────────
11 PM: Scheduler runs
  → Checks all licence expiry dates
  → Checks all AI system compliance scores
  → Checks if monthly evidence uploaded
  → Compares drug inventory AI outputs to known issues
  → Updates compliance dashboard

EVERY MONTH (automated, tiny human touch):
──────────────────────────────────────────
1st of month: Full compliance scan
  → Generates 50-page compliance report automatically
  → Flags only exceptions
  → Emails compliance officer

Compliance officer spends 30 minutes:
  → Reviews 5-10 flagged items
  → Uploads 2-3 missing documents
  → Clicks "Approve" on the rest
  → Signs the monthly report digitally

AGENT (always available):
──────────────────────────
Compliance nurse: "Does our new MRI machine need AERB clearance?"
Agent: "Yes. MRI machines fall under AERB Radiation Safety Rules 2004.
        You need Form 1 registration before installation, Form 2 for
        operation. Current AERB fee is ₹15,000 for MRI ≤1.5T.
        Application at aerb.gov.in. Typically takes 45-60 days."

Doctor: "Our ChestScan AI gave wrong output for 3 patients this week"
Agent: "This needs to be logged as a clinical incident immediately.
        Under CDSCO SaMD guidelines, class II device incidents must
        be documented within 24 hours. I've created an incident
        report template for you. Should I also notify your
        risk manager?"
```

---

# PRICING MODEL FOR BOTH

```
WEB SAAS — Hospital Pricing:
  Starter  (up to 200 beds):  ₹15,000/month
  Growth   (200–500 beds):    ₹40,000/month
  Enterprise (500+ beds):     ₹1,20,000/month
  Custom   (2000+ beds):      ₹3,00,000–₹5,00,000/month

DESKTOP APP — MSME/Small Clinic Pricing:
  One-time licence:           ₹25,000 per installation
  Annual maintenance:         ₹8,000/year (updates + support)
  With cloud agent access:    +₹3,000/month

CONSULTANT PACK:
  Manage up to 20 clients:    ₹15,000/month
  (sells the platform as
   their own service)
```

---

# WHAT TO BUILD NEXT (in order)

```
Week 1-2:  Monthly scheduler (automates the core value)
           Email notifications (alerts the right person)
           One-click approval dashboard

Week 3-4:  Electron wrapper (turns web app into .exe)
           Test on one MSME factory laptop

Month 2:   Offline mode for desktop
           Auto-generate monthly PDF report
           NABH / GPCB specific checklist templates

Month 3:   SSO login (hospital uses their Google/Microsoft)
           Multi-branch dashboard (for hospital chains)
           Mobile app (for factory floor supervisors)
```

The scheduler + email alert + one-click approval is what
transforms your platform from "database" to "automation tool."
That is the feature that justifies the price to a hospital.
