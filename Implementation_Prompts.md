
---

# DETAILED IMPLEMENTATION PROMPTS

---

## PROMPT 1: Automated Evidence Collection System

### Context
Build an automated evidence collection system that pulls compliance evidence from 20+ sources without manual intervention. This transforms the platform from a "compliance database" to "compliance automation."

### Requirements

#### Architecture Components
1. **Connector Framework**: Pluggable architecture for adding new sources
2. **Credential Vault**: Secure storage for API keys, OAuth tokens, passwords (AES-256 encryption)
3. **Scheduler**: Celery Beat or similar for cron-based job scheduling
4. **Data Pipeline**: Extract → Transform → Validate → Store workflow
5. **Error Handling**: Retry logic (exponential backoff, max 5 attempts), dead letter queue

#### Connectors to Build (Priority Order)

**Phase 1: High-Value, Easy Integrations**

1. **GitHub Connector**
   - Extract: Test reports, CI/CD logs, model cards, README files, commit history
   - Auth: GitHub App or Personal Access Token
   - Frequency: On every push (webhook) + daily sync
   - Output: Structured evidence with commit SHA, timestamp, author
   - Config: Repository list, branch filters, file patterns (*.json, *.md, etc.)

2. **MLflow Connector**
   - Extract: Model metrics, validation runs, parameter logs, artifact URIs
   - Auth: MLflow tracking URI + credentials
   - Frequency: After each experiment + daily sync
   - Output: Model lineage, performance metrics, experiment metadata
   - Config: Experiment names, metric filters, artifact types

3. **Email (IMAP) Connector**
   - Extract: Lab reports, certification emails, notifications with attachments
   - Auth: IMAP/SMTP credentials
   - Frequency: Every 15 minutes
   - Output: Parsed emails with attachments, sender metadata
   - Config: Folder filters, subject patterns, sender whitelist

4. **File System Connector**
   - Extract: Local/network drive files, NAS storage
   - Auth: File system access / SMB / NFS
   - Frequency: Daily scan
   - Output: File metadata + content hash
   - Config: Path patterns, file types, recursive scan

**Phase 2: Cloud Platform Integrations**

5. **AWS CloudTrail Connector**
   - Extract: Audit logs, API calls, access records, S3 access logs
   - Auth: IAM role + S3 access
   - Frequency: Real-time via S3 events
   - Output: Structured audit events in JSON
   - Config: S3 bucket, trail names, event filters

6. **Azure Monitor Connector**
   - Extract: Activity logs, diagnostic logs, metrics
   - Auth: Service principal
   - Frequency: Hourly
   - Output: Log analytics query results
   - Config: Resource groups, log categories

7. **GCP Cloud Logging Connector**
   - Extract: Admin activity, data access logs
   - Auth: Service account
   - Frequency: Hourly
   - Output: BigQuery export or direct API
   - Config: Projects, log sinks

**Phase 3: India-Specific Portal Scrapers**

8. **NABH Portal Scraper**
   - Extract: Accreditation status, validity dates, scope
   - Auth: Manual login credentials (stored securely)
   - Frequency: Weekly
   - Output: Accreditation status + expiry dates
   - Note: No public API, requires Selenium/Playwright scraping

9. **CDSCO Portal Scraper**
   - Extract: Drug/device approval status, manufacturing licences
   - Auth: Manual credentials
   - Frequency: Weekly
   - Output: Approval status, manufacturing licences

10. **MCA Portal Connector**
    - Extract: Company registration, director details, filings
    - Auth: MCA API key (if available) or scraping
    - Frequency: Monthly
    - Output: Company master data

11. **AERB Portal Scraper**
    - Extract: Radiation licence status, equipment registration
    - Auth: Manual credentials
    - Frequency: Monthly
    - Output: Licence validity, equipment list

12. **GPCB/SPCB Portal Scraper**
    - Extract: CTO/CTE status, pollution control compliance
    - Auth: Manual credentials
    - Frequency: Weekly
    - Output: Consent status, renewal dates, conditions

**Phase 4: Communication Platforms**

13. **WhatsApp Business Connector**
    - Extract: Photos, documents shared by factory managers
    - Auth: WhatsApp Business API (Meta)
    - Frequency: Real-time via webhooks
    - Output: Media files with sender metadata, caption text

14. **Slack Connector**
    - Extract: Compliance-related channel messages, file shares
    - Auth: Slack app token
    - Frequency: Real-time
    - Output: Messages with thread context, file URLs

### Data Model

```python
class EvidenceSource(BaseModel):
    id: UUID
    name: str  # "github", "mlflow", "email", etc.
    type: str  # "api", "scraper", "webhook", "filesystem"
    config: dict  # Source-specific configuration
    credentials: EncryptedField  # Never returned in API
    schedule: str  # Cron expression
    is_active: bool
    last_run: datetime
    last_success: datetime
    error_count: int
    created_at: datetime
    tenant_id: UUID

class EvidenceCollectionJob(BaseModel):
    id: UUID
    source_id: UUID
    status: str  # "pending", "running", "success", "failed"
    started_at: datetime
    completed_at: datetime
    items_found: int
    items_stored: int
    errors: list
    log_output: str

class CollectedEvidence(BaseModel):
    id: UUID
    job_id: UUID
    source_type: str
    source_identifier: str
    evidence_type: str  # "test_report", "model_card", "licence"
    content_hash: str  # For deduplication
    raw_content: bytes
    parsed_content: dict
    metadata: dict
    collected_at: datetime
    ai_system_id: Optional[UUID]
    control_id: Optional[UUID]
    tenant_id: UUID
```

### API Endpoints

```
POST   /api/v1/evidence-sources          # Create new source
GET    /api/v1/evidence-sources          # List all sources
PUT    /api/v1/evidence-sources/{id}     # Update source
DELETE /api/v1/evidence-sources/{id}     # Remove source
POST   /api/v1/evidence-sources/{id}/test     # Test connection
POST   /api/v1/evidence-sources/{id}/sync     # Manual sync
GET    /api/v1/evidence-sources/{id}/jobs     # List jobs
GET    /api/v1/evidence-sources/{id}/jobs/{job_id}/logs  # Job logs
```

### Frontend Components

1. **Evidence Sources List Page**
   - Table: Name, Type, Status, Last Sync, Actions
   - Enable/disable toggle
   - Manual sync button with progress
   - Error indicator with tooltip

2. **Add Evidence Source Wizard**
   - Step 1: Select source type (cards with icons)
   - Step 2: Configure connection (host, credentials)
   - Step 3: Test connection (show success/failure)
   - Step 4: Set schedule and filters
   - Step 5: Review and save

3. **Evidence Source Detail Page**
   - Configuration settings (editable)
   - Sync schedule with next run time
   - Recent jobs table with status
   - Error logs viewer
   - Collected evidence preview list

### Security Considerations
- All credentials encrypted at rest (AES-256)
- Credentials never returned in API responses
- OAuth tokens refreshed automatically
- API keys rotated every 90 days
- Access logs for all credential usage
- Principle of least privilege

### Error Handling
- Exponential backoff for retries (max 5 attempts)
- Dead letter queue for failed items
- Admin notification for repeated failures
- Auto-disable after 10 consecutive failures
- Detailed error logging

### Deliverables
1. Connector framework with base classes
2. 5 Phase 1 connectors (GitHub, MLflow, Email, File System, AWS)
3. Admin UI for managing sources
4. Documentation for adding new connectors
5. Monitoring dashboard for sync status

---

## PROMPT 2: Monthly Auto-Scheduler & Notification System

### Context
Build a scheduling and notification system that automates compliance checks and keeps users informed without requiring dashboard login.

### Requirements

#### Scheduler Architecture
1. **Job Scheduler**: Celery Beat with Redis backend
2. **Job Queue**: Redis/RabbitMQ for task distribution
3. **Job Workers**: Distributed workers for parallel execution
4. **Job Monitoring**: Track status, duration, errors
5. **Job Retries**: Automatic retry with exponential backoff

#### Scheduled Jobs

**Daily Jobs (11:00 PM)**
- Check all licence expiry dates
- Update compliance scores
- Generate daily summary
- Trigger notifications for expiring items

**Monthly Jobs (1st of month, 6:00 AM)**
- Run full compliance assessment
- Generate monthly compliance reports
- Update trend analytics
- Email reports to stakeholders

**Weekly Jobs (Monday, 9:00 AM)**
- Compile week's compliance activities
- List completed tasks
- Show upcoming deadlines

**Ad-hoc Triggers**
- On evidence upload: Re-assess controls
- On licence update: Update registry
- On control failure: Immediate alert

### Notification System

#### Notification Types & Channels

| Type | Channels | Recipients | Timing |
|------|----------|------------|--------|
| Licence Expiry Warning | Email, WhatsApp, SMS | Compliance Officer | 30, 15, 7, 1 days |
| Critical Expiry Alert | Email, WhatsApp, SMS | CO + Management | Day of expiry |
| Evidence Upload Reminder | Email, WhatsApp | Assigned User | 7, 3, 1 days |
| Compliance Score Change | Email, In-app | All Stakeholders | Real-time |
| Monthly Report Ready | Email | Executives | 1st of month |
| Task Assignment | Email, WhatsApp | Assigned User | Immediate |
| System Alert | Email, SMS | Admin | Immediate |

#### Notification Templates

**Email: Licence Expiry Warning (30 days)**
```
Subject: [Action Required] {licence_name} expires in 30 days

Hi {user_name},

This is a reminder that the following licence is expiring soon:

Licence: {licence_name}
Number: {licence_number}
Current Expiry: {expiry_date}
Days Remaining: 30

Next Steps:
1. Review renewal requirements
2. Prepare necessary documents
3. Submit renewal application

[View Licence Details] [Upload Renewal Document]

Regards,
AI Compliance Platform
```

**WhatsApp: Critical Alert (7 days)**
```
🚨 *URGENT: Licence Expiring Soon*

{licence_name} expires in *7 days* ({expiry_date})

Click to renew: {renewal_link}

AI Compliance Bot
```

**Email: Monthly Compliance Report**
```
Subject: Monthly Compliance Report - {organization_name} - {month_year}

Dear {executive_name},

Please find attached the monthly compliance report.

Executive Summary:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Overall Compliance Score: {score}%
Change from Last Month: {change}%

Licence Status:
✅ Valid: {valid_count}
⚠️ Expiring Soon: {expiring_count}
❌ Expired: {expired_count}

AI Systems:
✅ Compliant: {compliant_systems}
⚠️ Non-Compliant: {non_compliant_systems}

Evidence Status:
✅ Uploaded: {uploaded_count}
⏳ Pending: {pending_count}
❌ Overdue: {overdue_count}

[View Dashboard] [Download PDF]
```

### Notification Preferences

**User-Level Settings:**
- Preferred channels (email, WhatsApp, SMS)
- Notification frequency (immediate, daily digest, weekly digest)
- Quiet hours (start, end)
- Language preference (English, Hindi, regional)
- Categories to receive (licence, evidence, task, system)

### Implementation

#### Database Schema

```python
class NotificationPreference(BaseModel):
    user_id: UUID
    channel_preferences: dict  # {"email": True, "whatsapp": False}
    frequency: str  # "immediate", "daily", "weekly"
    quiet_hours_start: time
    quiet_hours_end: time
    language: str
    categories: list

class ScheduledJob(BaseModel):
    id: UUID
    name: str
    job_type: str
    schedule: str  # Cron expression
    is_active: bool
    last_run: datetime
    next_run: datetime
    tenant_id: UUID

class NotificationLog(BaseModel):
    id: UUID
    user_id: UUID
    notification_type: str
    channels: list
    subject: str
    content: str
    sent_at: datetime
    delivered_at: datetime
    read_at: datetime
    status: str
    error_message: str
```

#### Integration Points

**Email Service:**
- Provider: SendGrid or AWS SES
- Features: HTML templates, attachments, tracking
- Rate limiting: 100 emails/minute

**WhatsApp Service:**
- Provider: WhatsApp Business API (Meta)
- Features: Text, media, templates
- Rate limiting: 80 messages/second

**SMS Service:**
- Provider: MSG91 (India-focused)
- Features: Unicode (Hindi/regional)
- Rate limiting: Provider dependent

### Frontend Components

1. **Notification Preferences Page**
   - Channel toggles
   - Frequency selector
   - Quiet hours picker
   - Category checkboxes
   - Test notification buttons

2. **Notification History Page**
   - List of sent notifications
   - Status indicators
   - Resend option
   - Filter by type/date

3. **Scheduled Jobs Admin Page**
   - List of all jobs
   - Enable/disable toggle
   - Last/next run times
   - Manual run button
   - Job logs viewer

### Deliverables
1. Job scheduler with all scheduled jobs
2. Notification service with multi-channel support
3. User preference management UI
4. Admin panel for job management
5. Notification templates (English + Hindi)
6. Delivery tracking and analytics

---

## PROMPT 3: Auto PDF Report Generation Engine

### Context
Build a professional PDF report generation system that converts compliance data into audit-ready documents.

### Requirements

#### Report Types

1. **Monthly Compliance Report**
   - Audience: Executives, Compliance Officers
   - Sections: Cover, Executive Summary, Score Dashboard, Licence Status, AI Systems, Evidence Status, Action Items, Sign-off

2. **Audit-Ready Compliance Package**
   - Audience: External Auditors, Regulators
   - Sections: Cover Letter, TOC, Regulatory Matrix, Control Results, Evidence Appendix, Risk Register, Remediation Plan

3. **Executive Dashboard Report**
   - Audience: C-Suite, Board
   - Sections: One-page summary, Trends, Risk Heat Map, Benchmarking

4. **Regulator-Specific Reports**
   - NABH Accreditation Package
   - CDSCO Submission Documents
   - GPCB Monthly Returns
   - DPDPA Compliance Statement

### Technical Implementation

#### PDF Generation Stack
- **Library**: WeasyPrint (Python) or Puppeteer (Node.js)
- **Templating**: Jinja2 with HTML templates
- **Styling**: CSS with print media queries
- **Charts**: Plotly → SVG → PDF

#### Template System

```python
class ReportTemplate(BaseModel):
    id: UUID
    name: str
    description: str
    html_template: str  # Jinja2
    css_styles: str
    sections: list
    default_options: dict
    is_customizable: bool
    tenant_id: Optional[UUID]

class ReportGenerationRequest(BaseModel):
    template_id: UUID
    organization_id: UUID
    report_period: dict
    options: dict
    output_format: str  # "pdf", "html"
    include_evidence: bool
    password_protect: bool
    watermark: Optional[str]
```

#### Sample Template Structure

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>{{ org_name }} - Compliance Report</title>
    <style>
        @page {
            size: A4;
            margin: 2cm;
            @top-center { content: "Confidential"; }
            @bottom-center { content: "Page " counter(page); }
        }
        .cover-page { text-align: center; padding-top: 200px; }
        .section { page-break-before: always; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; }
    </style>
</head>
<body>
    <div class="cover-page">
        <img src="{{ org_logo }}" alt="Logo" style="max-width: 200px;">
        <h1>Monthly Compliance Report</h1>
        <h2>{{ org_name }}</h2>
        <p>Report Period: {{ period }}</p>
    </div>

    <div class="section">
        <h1>Executive Summary</h1>
        <div class="score-card">
            <h2>Overall Compliance Score: {{ overall_score }}%</h2>
        </div>
    </div>

    <div class="section">
        <h1>Licence Status</h1>
        <table>
            <thead><tr><th>Licence Type</th><th>Number</th><th>Status</th><th>Expiry</th></tr></thead>
            <tbody>
                {% for licence in licences %}
                <tr><td>{{ licence.type }}</td><td>{{ licence.number }}</td>
                    <td>{{ licence.status }}</td><td>{{ licence.expiry_date }}</td></tr>
                {% endfor %}
            </tbody>
        </table>
    </div>
</body>
</html>
```

### API Endpoints

```
GET    /api/v1/report-templates           # List templates
POST   /api/v1/report-templates           # Create custom template
PUT    /api/v1/report-templates/{id}      # Update template
DELETE /api/v1/report-templates/{id}      # Delete template
POST   /api/v1/reports/generate           # Generate report (async)
GET    /api/v1/reports/generate/{job_id}/status  # Check status
GET    /api/v1/reports                    # List generated reports
GET    /api/v1/reports/{id}/download      # Download report
```

### Frontend Components

1. **Report Generation Page**
   - Template selector
   - Date range picker
   - Options checkboxes
   - Preview button
   - Generate button with progress

2. **Report Library Page**
   - List of generated reports
   - Filter by type/date
   - Download button
   - Share button

3. **Template Editor (Admin)**
   - HTML/CSS editor
   - Preview pane
   - Variable reference
   - Save/duplicate/delete

### Features

**Branding:**
- Upload organization logo
- Custom color scheme
- Header/footer customization
- Watermark options

**Security:**
- Password protection (PDF encryption)
- Expiry dates for download links
- Access logging

### Deliverables
1. PDF generation service
2. 4 default report templates
3. Template editor UI
4. Report library UI
5. API documentation

---

## PROMPT 4: Guided Onboarding Wizard

### Context
Build a guided onboarding wizard that reduces time-to-first-compliance-score from days to 15 minutes.

### Requirements

#### Wizard Flow (5 Steps)

**Step 1: Organization Profile**
- Organization Type (radio with icons):
  * Multi-Specialty Hospital
  * Single-Specialty Hospital
  * Clinic/Diagnostic Center
  * Manufacturing Unit
  * MSME/Trading
  * Consultant/Auditor
- State/UT (dropdown - determines SPCB, labour laws)
- City (filtered by state)
- Organization Size (beds/workers/turnover)
- Organization Name, Registration Number, Contact

**Smart Defaults:**
- Based on type + state, pre-select applicable regulations

**Step 2: AI Systems Discovery**
- Pre-filled checklist by industry
- For each selected system: Name, Vendor, Deployment Date
- Upload system documentation → AI extracts metadata

**Step 3: Licence Inventory**
- Pre-populated list based on Step 1
- Upload licence PDF → AI extracts dates
- Mark as N/A or upload later

**Step 4: Compliance Assessment**
- Platform runs initial assessment
- Shows first compliance score
- Lists immediate action items

**Step 5: Team Setup**
- Add team members
- Assign roles
- Set notification preferences

### Technical Implementation

#### Database Schema

```python
class OnboardingSession(BaseModel):
    id: UUID
    tenant_id: UUID
    current_step: int  # 1-5
    step_data: dict
    is_complete: bool
    started_at: datetime
    completed_at: datetime
    abandoned_at: Optional[datetime]

class OnboardingTemplate(BaseModel):
    id: UUID
    org_type: str
    state: str
    default_licences: list
    default_ai_systems: list
    applicable_regulations: list
```

#### AI Document Processing

```python
class OnboardingDocumentProcessor:
    async def process_licence_pdf(self, file: bytes) -> dict:
        # OCR + LLM extraction
        # Returns: licence_type, number, issue_date, expiry_date, authority
        pass

    async def process_ai_system_doc(self, file: bytes) -> dict:
        # Extract: name, vendor, version, intended_use, metrics
        pass
```

#### API Endpoints

```
POST /api/v1/onboarding/start
GET  /api/v1/onboarding/{session_id}
PUT  /api/v1/onboarding/{session_id}/step/{step_number}
POST /api/v1/onboarding/{session_id}/upload
POST /api/v1/onboarding/{session_id}/complete
```

### Frontend Components

1. **Wizard Container**
   - Progress indicator (5 steps)
   - Step title and description
   - Form area
   - Navigation buttons

2. **Step 1: Organization Profile**
   - Card-based type selector
   - Cascading dropdowns
   - Dynamic size selector

3. **Step 2: AI Systems**
   - Checkbox list with icons
   - File upload with drag-drop
   - Extracted data preview

4. **Step 3: Licences**
   - Table with licence list
   - Upload button per row
   - Add custom licence

5. **Step 4: Assessment Results**
   - Animated score gauge
   - Category breakdown
   - Action item list

6. **Step 5: Team Setup**
   - Email input with tags
   - Role assignment
   - Permission preview

### Analytics
- Funnel analysis (step completion rates)
- Time per step
- Abandonment points
- AI extraction accuracy

### Deliverables
1. 5-step wizard UI
2. AI document processing agent
3. Onboarding templates
4. Progress tracking
5. Save and continue later

---

## PROMPT 5: Pre-Populated Licence Database

### Context
Build a licence database with industry-specific templates that auto-creates records on registration.

### Requirements

#### Hospital Licence Templates

**Small Hospitals (25-50 beds):**
- Clinical Establishment Registration (5 years)
- Bio-Medical Waste Authorization (Annual)
- Fire NOC (Annual)
- Pharmacy Licence (Annual)
- Lift/Escalator Licence (Annual, if applicable)

**Medium Hospitals (100-200 beds):**
- All small hospital licences PLUS:
- NABH Entry Level (3 years)
- AERB Registration (Annual)
- Blood Bank Licence (if applicable)
- PNDT Registration (if applicable)

**Large Hospitals (500+ beds):**
- All medium hospital licences PLUS:
- NABH Full Accreditation (3 years)
- NABL Accreditation (2 years)
- AERB Type B/C Licence

#### Manufacturing Licence Templates

**Textile Manufacturing:**
- GPCB CTO (5 years)
- Factory Licence (Annual)
- Fire NOC (Annual)
- Contract Labour Licence (Annual, if applicable)
- Boiler Licence (Annual, if applicable)

**Pharmaceutical Manufacturing:**
- All textile licences PLUS:
- CDSCO Manufacturing Licence
- GMP Certificate
- Narcotics Licence (if applicable)

**Food Processing:**
- FSSAI Licence
- GPCB CTO
- Factory Licence
- Fire NOC
- Water Usage Permit

### Implementation

#### Database Schema

```python
class LicenceTemplate(BaseModel):
    id: UUID
    licence_type: str
    regulatory_body: str
    renewal_cycle: str
    renewal_cycle_months: int
    mandatory: bool
    reminder_days: list
    applicable_org_types: list
    applicable_states: list
    min_size_requirement: dict
    description: str
    documents_required: list

class OrganizationLicence(BaseModel):
    id: UUID
    organization_id: UUID
    template_id: UUID
    licence_number: Optional[str]
    issue_date: Optional[date]
    expiry_date: Optional[date]
    status: str
    document_url: Optional[str]
```

#### Auto-Creation Logic

```python
async def create_licences_for_organization(org_id: UUID):
    org = await get_organization(org_id)
    templates = await LicenceTemplate.filter(
        applicable_org_types__contains=[org.org_type],
        Q(applicable_states__contains=[org.state]) | 
        Q(applicable_states__contains=["all"])
    )

    for template in templates:
        if meets_size_requirement(template, org):
            await OrganizationLicence.create(
                organization_id=org_id,
                template_id=template.id,
                status="pending_upload"
            )
```

### Frontend Components

1. **Licence Dashboard**
   - Summary cards (Valid, Expiring, Expired, Pending)
   - Calendar view
   - List view with filters

2. **Licence Detail Page**
   - Licence information
   - Document preview
   - Expiry timeline

### Deliverables
1. Licence template database (100+ templates)
2. State-specific variations
3. Auto-creation logic
4. Licence management UI
5. Reminder integration

---

## Summary: Priority Order

### Priority 1 (Build This Month):
1. Monthly auto-scheduler (cron job)
2. Email notifications (licence expiry + overdue evidence)
3. Auto PDF report generation

### Priority 2 (Next 2 Months):
1. Licence expiry database with industry templates
2. Guided onboarding wizard
3. WhatsApp notification for MSME factory managers

### Priority 3 (Months 3-6):
1. GitHub / MLflow connectors (auto evidence pull)
2. Electron desktop app
3. Regulatory update feed (basic version)

### Priority 4 (6+ Months):
1. NABH / CDSCO portal connectors
2. Full regulatory intelligence engine
3. Marketplace for control packs
