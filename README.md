# 🛡️ AntiGravity: AI Compliance Automation Engine

**The only compliance automation platform purpose-built for India's deeply-integrated AI governance stack.**

AntiGravity bridges the gap between regulatory mandates and operational reality for Healthcare, Pharma, and Manufacturing MSMEs. By fusing the **DPDPA**, **ABDM**, **CDSCO**, **NABH**, and **CPCB** into a unified policy-as-code engine, we cut compliance overhead from months to minutes with zero human intervention.

---

## 🚀 Key Value Propositions

### 1. 100% Automated Evidence Collection
Tired of chasing engineers and facility managers for logs? 
AntiGravity features a **Connector Framework** that actively integrates with the systems your team already uses. 
- **GitHub**: Auto-scrapes PRs and commit validations to form AI traceability matrices.
- **MLflow**: Securely aggregates drift checks and validation experiment results on-the-fly.
- **Email/IMAP**: A background worker that pulls in digital authorizations and scans attached lab PDF receipts securely.
- **File System**: Scrapes designated compliance storage directories to dynamically link evidence mapping files to their respective licenses.

### 2. 24/7 Zero-Touch Scheduled Governance
Our integrated **Celery + Redis Scheduler** operates quietly in the background, making sure you are never operating out of compliance:
- **Nightly Expiration Checks**: 11:00 PM scans ensuring none of your active clinical or environmental licenses are lapsing.
- **Monthly Complete Scans**: First-of-the-month top-to-bottom health checks triggering automated remediation workflows to risk managers.
- **Multi-channel Pings**: Configurable push-alerts sending critical failure notices directly to stakeholders via Email and WhatsApp. 

### 3. Audit-Ready Documents on Demand
When the regulator knocks, AntiGravity answers. 
The **Report Generation Engine** uses our state-of-the-art templating pipeline to transform raw, live platform metrics into fully compliant, stylized PDF artifacts. 
Whether you need the *Monthly Executive Summary* for your board or a detailed *GPCB Emission Audit*, the platform instantly produces a digitally verifiable PDF summary.

### 4. 15-Minute Dynamic Onboarding 
Going from Zero to Fully-Configured has never been faster. Our **Guided Wizard** utilizes a smart logic router that instantly scaffolds a customized compliance profile for you. By simply stating your company's vertical (e.g., *Small Hospital in Gujarat*), AntiGravity pre-populates the exact licenses (NABH, Bio-Medical Waste, Fire NOC) and AI System requirements specific to your operational footprint.

---

## 🛠️ Technology Stack
An uncompromising, resilient technical architecture tailored for enterprise loads:
- **Frontend**: Next.js 14, React 18, Tailwind CSS, shadcn/ui.
- **Backend API**: Python FastAPI scaling horizontally.
- **Database Architecture**: PostgreSQL driven via SQLAlchemy schemas (Fully Multi-Tenant).
- **Asynchronous Queues**: Celery & Redis.
- **Document Rendering**: WeasyPrint / PDFKit HTML parsing.

---

## 🏃‍♂️ Running the Platform Locally 

To spin up the entire multi-service architecture locally on your development machine:

### 1. Database & Brokers
Ensure PostgreSQL is active on port `5432`.
Start the Redis broker via Docker:
```bash
docker run -p 6379:6379 -d redis
```

### 2. Backend API
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### 3. Asynchronous Workers (Celery)
In separate terminal instances:
```bash
# Start the background task worker
celery -A app.core.celery_app worker --loglevel=info

# Start the pulse beat scheduler
celery -A app.core.celery_app beat --loglevel=info
```

### 4. Interactive Frontend
```bash
cd frontend
npm install
npm run dev
```
Navigate to `http://localhost:3000` to interact with your AI Compliance Command Center.

---

*AntiGravity provides unmatched depth for Indian AI regulatory integration. Say goodbye to spreadsheets, and let the code do the compliance.*
