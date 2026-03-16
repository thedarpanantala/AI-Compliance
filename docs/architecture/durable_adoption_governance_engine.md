# Durable Adoption & Governance Engine

This module is intentionally focused on long-term adoption, resilience, and organizational behavior—not core compliance data ingestion or artifact generation.

---

## 1) Failure Modes We Are Solving

1. **Ownership ambiguity:** Controls exist but no accountable owner per business unit.
   - **Engine response:** enforce owner assignment, escalation paths, and role-based KPI accountability with overdue breach alerts.
2. **Fragmented governance:** Teams pass audits locally while enterprise risk remains unknown.
   - **Engine response:** unify tenant-level health score, framework coverage, and CRE SLO rollups in one executive view.
3. **False assurance from stale evidence:** “Compliant on paper” but evidence is old.
   - **Engine response:** evidence freshness SLIs and control latency tracking feed error budgets and risk heatmaps.
4. **Big-bang rollout failure:** tool launched everywhere, adopted nowhere.
   - **Engine response:** phased adoption playbooks with measurable gates and module sequencing by tenant maturity.
5. **Legacy integration friction:** customers cannot replace old GRC/Excel workflows.
   - **Engine response:** sidecar ingestion model (CSV/email/SFTP first) with optional API deepening over time.
6. **Regulation drift:** framework updates break control libraries and trust.
   - **Engine response:** change ingestion + obligation diffing + tenant impact plans + controlled v1→v2 migration tracks.
7. **Black-box AI distrust:** suggestions cannot be defended to auditors.
   - **Engine response:** mandatory HITL review gates, prompt/input/output version logging, and auditor-ready explanation trails.
8. **No incentive alignment:** compliance seen as cost center; usage decays.
   - **Engine response:** role KPIs, champions network, webhook hooks to HR/collab tools for recognition/bonus integration.
9. **No operational discipline for compliance incidents:** response quality varies per team.
   - **Engine response:** CRE runbooks, game days, SLO/error-budget model, and post-incident learning loops.

---

## 2) Adoption & Change Management Layer

### 2.1 Adoption Playbooks

#### A) Small regulated Indian firms (50–500 employees)
**Duration:** 4 months

- **Phase 1 (Weeks 1–4): Foundation + quick wins**
  - Modules: tenant setup, role assignment, basic evidence ingestion, artifact quick-start.
  - Stakeholders: compliance lead, 1 ops manager, 1 IT admin, optional external consultant.
  - Success metrics:
    - `>= 70%` critical controls mapped to an owner
    - `>= 50%` priority evidence sources active
    - first regulator/buyer artifact generated within 30 days
- **Phase 2 (Weeks 5–10): Operational cadence**
  - Modules: adoption checklist, health score dashboard, KPI basics, playbook nudges.
  - Stakeholders: +2 line managers (factory/hospital unit heads).
  - Success metrics:
    - weekly active users (WAU) `>= 40%` of invited core users
    - evidence freshness SLA met for `>= 75%` required controls
    - mean finding closure time reduced by `20%`
- **Phase 3 (Weeks 11–16): Reliability + institutionalization**
  - Modules: CRE SLOs, game day lite, champions nomination.
  - Stakeholders: compliance lead, internal auditor, nominated champions.
  - Success metrics:
    - first game day completed
    - champions in `>= 80%` active business units
    - tenant health score `>= 75/100`

#### B) Large enterprise with legacy GRC stack
**Duration:** 6–9 months

- **Phase 1 (Month 1–2): Sidecar coexistence**
  - Modules: legacy connectors (CSV/email/SFTP), change radar read-only, KPI mirror.
  - Stakeholders: enterprise compliance, risk office, IT integration architect, security, SI partner.
  - Success metrics:
    - `>= 3` legacy feeds integrated without replacing incumbent GRC
    - cross-walk coverage for top 2 frameworks
    - executive adoption dashboard active
- **Phase 2 (Month 3–5): Controlled expansion**
  - Modules: impact playbooks, artifact approval workflows, champions network.
  - Stakeholders: BU risk owners, HR performance partner, audit committee liaison.
  - Success metrics:
    - `>= 60%` target systems included in recurring review cycle
    - at least 2 high-value artifact families automated
    - control test timeliness improved by `>= 25%`
- **Phase 3 (Month 6–9): System of record for AI compliance decisions**
  - Modules: framework version migration lanes, CRE game day full simulation, incentive webhooks.
  - Stakeholders: enterprise architecture board, governance council.
  - Success metrics:
    - framework v2 pilot completed for one business unit
    - error-budget policy adopted by governance council
    - sustained WAU/MAU ratio `>= 0.55`

### 2.2 In-product Guidance & Training

- **Embedded first-30-days checklist**
  - Steps: connect one evidence source, assign owners, run first review, generate first artifact, close first finding.
- **Role-native onboarding**
  - Compliance officer view: risk backlog + deadlines.
  - Line manager view: “what you must submit this week.”
  - Data scientist view: model-level obligations and overdue controls.
- **Guided tours + contextual tips**
  - Context-sensitive “why this matters” snippets linked to framework obligations.
- **Telemetry-driven personalization**
  - Capture: page events, task completion events, time-to-complete, abandoned flows, repeated errors.
  - Personalized guidance examples:
    - “You generated artifacts but skipped approval gate—complete sign-off now.”
    - “2 controls overdue in your BU; launch remediation playbook.”
- **Product insight loop**
  - Feature utilization score by tenant/role.
  - Friction heatmap (drop-off by step) for product team backlog.

### 2.3 Avoiding Shelfware

#### Shelfware Risk Indicators
- login decay (`WAU/MAU < 0.35`)
- artifact generation frequency drop (`< 1 critical artifact / month` for active frameworks)
- review completion lag (`> 30% overdue tasks`)
- evidence freshness breach (`> 25% stale controls`)
- low role penetration (only compliance uses platform; BU users inactive)

#### Tenant Health Score job
`HealthScore = 0.25*Engagement + 0.25*OperationalCadence + 0.25*ControlTimeliness + 0.25*ArtifactReadiness`

- Runs nightly per tenant.
- Threshold actions:
  - `< 70`: in-app nudges + owner reminders
  - `< 55`: auto-launch adoption recovery playbook
  - `< 40`: CSM/partner escalation + executive summary email

---

## 3) Incentive & KPI Engine

### 3.1 Role-based KPIs

#### Compliance Officer
- `% controls tested on time`
- `% critical controls with fresh evidence`
- `mean time to close findings`
- `% regulator-facing artifacts approved before due date`
- `framework migration completion rate`

#### Risk Owner (BU)
- `% assigned risks with active mitigation`
- `overdue task ratio`
- `incident recurrence rate`
- `control effectiveness trend`

#### Line Manager
- `% submissions completed before deadline`
- `artifact review SLA adherence`
- `team participation rate in playbooks/game days`

#### Data Scientist / AI Owner
- `% AI systems with current risk assessments`
- `% model changes with updated impact docs`
- `HITL exception closure time`
- `policy override count per quarter`

**Exposure paths**
- Personal KPI dashboard widgets and trend lines.
- Export endpoint + signed webhooks for HR/performance systems (Workday/SAP SuccessFactors/etc.).

### 3.2 Compliance Champions Network

- **Nomination flow:** BU head nominates, compliance admin approves.
- **Champion privileges:** localized heatmaps, remediation queue, peer nudges, playbook triggers for BU scope.
- **Recognition ledger:**
  - issues resolved
  - incidents prevented/early-detected
  - game days completed
  - adoption milestones achieved
- **Recognition outputs:** quarterly leaderboard + webhook to Teams/Slack/email.

### 3.3 Incentive Hooks

- **Webhooks/APIs**
  - `POST /api/incentives/kpi-summaries/export`
  - `POST /api/incentives/recognition-events/push`
  - `POST /api/webhooks/hr-performance`
  - `POST /api/webhooks/collaboration`
- Payload includes role, period, KPI values, confidence flags, and audit reference IDs.

---

## 4) Regulatory Change & Evolution Engine

### 4.1 Regulatory Change Ingestion

Input abstraction (`RegulatorySourceAdapter`):
- accepted fields: `title`, `jurisdiction`, `sector`, `source_type`, `effective_date`, `document_text`, `metadata`.
- source types: gazette notification, circular/guideline, standard revision.

### 4.2 Change diffing & impact analysis

#### Core data structures
- `RegulatoryChangeItem`
- `ObligationClause`
- `ObligationDiff` (`new|modified|deprecated`)
- `ControlMappingProposal` (with confidence)

#### Algorithm (deterministic + assisted)
1. Parse incoming document into normalized obligations.
2. Compare against prior framework version by clause signature + semantic similarity.
3. Classify differences:
   - new obligations
   - modified threshold/scope
   - deprecated/merged clauses
4. Propose mapping to existing controls with confidence score and suggested remediation actions.
5. Queue low-confidence items for human legal/compliance review.

### 4.3 Tenant-specific impact views

For each tenant, compute impact by:
- framework (DPDPA/EU AI Act/ISO 42001)
- AI system
- business unit/factory/hospital

#### UI: Change Radar
- “What changed this week” card stack.
- Impact matrix (high/medium/low) by BU and framework.
- “Action required by date” timeline.

#### UI: Impact Playbook
- auto-generated task list:
  - controls to add/update
  - evidence artifacts to refresh
  - reports to regenerate
- owner assignment + due dates + progress tracking.

### 4.4 Versioning & migration

- Control libraries use semantic versioning: `framework@major.minor.patch`.
- Tenant migration lanes:
  - **test lane**: simulate v2 coverage and identify breaks.
  - **prod lane**: controlled rollout with approvals.
- Historic artifacts/evidence remain pinned to original framework version for audit immutability.
- Side-by-side compliance status available during migration window.

---

## 5) Legacy-friendly Integration Strategy

### 5.1 Sidecar, not replacement

- Platform runs alongside legacy GRC + spreadsheets.
- Ingestion channels:
  - CSV/Excel upload
  - secure email ingestion mailbox
  - SFTP drop folders
  - optional APIs/webhooks
- Preserve customer’s incumbent workflow while progressively increasing automation.

### 5.2 Integration tiers

#### Tier 1: No-code
- Methods: uploads, email forwarding, browser extension capture.
- Suits: SMEs, low IT bandwidth teams.
- Value still delivered via health score, artifacts, and owner/task governance.

#### Tier 2: Light-code
- Methods: simple APIs, scripts, low-code tools (Zapier/Make/Power Automate).
- Suits: mid-market organizations with small IT teams.
- Value: near-real-time KPI updates and reduced manual evidence prep.

#### Tier 3: Deep-code
- Methods: microservice/event streaming integration.
- Suits: large enterprises and regulated institutions.
- Value: continuous control telemetry, enterprise-grade CRE and change automation.

### 5.3 Minimal viable telemetry (must-have)

- `event_timestamp`
- `source_system`
- `system_or_process_id`
- `control_id / obligation_id`
- `status` (`pass/fail/pending`)
- `owner_id`
- `evidence_ref`
- `updated_at`

This minimum set powers risk heatmaps, KPI engine, and artifact freshness checks.

---

## 6) Compliance Reliability Engineering (CRE)

### 6.1 Concepts & metrics

- **Compliance SLO:** target reliability level for control outcomes (e.g., 99% on-time critical control tests).
- **Error budget:** allowed non-compliance incidents per period before mandatory governance action.
- **Control uptime:** percentage of time a control has valid and current evidence.
- **Control latency:** mean time from issue detection to remediation closure.

Tenant/framework metrics:
- SLO attainment rate
- error budget burn rate
- incident MTTD/MTTR
- % controls in degraded state
- % regulator queries answered within SLA

### 6.2 CRE runbooks & game days

- Auto-generated runbooks per scenario:
  - evidence breach
  - late reporting
  - AI incident escalation
  - regulator information request
- **Game Day Simulator**
  - inject scenario
  - assign responders
  - track steps and timestamps
  - produce after-action report with misses and strengths

### 6.3 Feedback loop

- Post-incident/game day retrospectives automatically create:
  - control tuning proposals
  - updated training cards/tooltips
  - KPI adjustments and champion recognition events
- Teams repeatedly meeting SLOs earn positive recognition hooks.

---

## 7) Human-in-the-Loop AI Design Principles

### 7.1 Mandatory human gates

- Required approval before:
  - issuing regulator-facing artifact
  - downgrading AI system risk classification
  - changing core policies/control thresholds

### 7.2 Explainability & documentation

Every AI suggestion stores:
- input evidence references
- prompt template + version
- model/provider + configuration
- output content version
- reviewer decision + rationale

Expose an **Auditor View** bundling these logs as verifiable audit trail attachments.

### 7.3 Trust controls

Tenant-level controls:
- toggle specific AI features per framework/jurisdiction
- select policy mode: `conservative | balanced | aggressive`
- enforce human-review quorum for high-risk actions

---

## 8) Deliverables

### 8.1 Conceptual architecture diagram (text)

1. **Adoption & Change Layer**
   - playbook orchestrator
   - onboarding checklist engine
   - telemetry processor
   - health score service
2. **Incentive & KPI Engine**
   - role KPI calculator
   - champions registry
   - recognition/event dispatcher
3. **Regulatory Change Engine**
   - change intake API
   - obligation diff service
   - impact analyzer + migration planner
4. **Legacy Integration Layer**
   - sidecar ingestion adapters (CSV/email/SFTP/API)
   - normalization pipeline
5. **CRE Module**
   - SLO/error budget manager
   - runbook generator
   - game day orchestrator
6. **HITL AI Guardrails**
   - AI decision log store
   - approval gates
   - trust policy manager

### 8.2 Data model sketches

#### KPI / Health / Champions
- `kpi_definitions(id, role, name, formula, target, cadence)`
- `kpi_measurements(id, tenant_id, user_id, role, period_start, period_end, value, trend)`
- `tenant_health_scores(id, tenant_id, score, engagement_score, cadence_score, timeliness_score, artifact_score, computed_at)`
- `champions(id, tenant_id, business_unit, user_id, status, nominated_by, approved_by, started_at)`
- `champion_contributions(id, champion_id, type, points, reference_id, created_at)`

#### Regulatory change / mapping / impact
- `regulatory_change_items(id, jurisdiction, sector, title, source_type, effective_date, raw_text_ref, status)`
- `obligation_clauses(id, change_item_id, clause_key, text, obligation_type, severity)`
- `obligation_diffs(id, framework, from_version, to_version, clause_key, diff_type, confidence)`
- `control_mapping_proposals(id, clause_key, suggested_control_id, confidence, rationale, reviewer_id, decision)`
- `tenant_impact_records(id, tenant_id, framework, system_id, business_unit, impact_level, required_actions, due_date)`

#### CRE SLO / error budget / game days
- `cre_slos(id, tenant_id, framework, scope, objective_name, target_value, window_days)`
- `cre_error_budgets(id, slo_id, period_start, period_end, budget_total, budget_used, burn_rate)`
- `cre_incidents(id, tenant_id, framework, severity, detected_at, resolved_at, root_cause, runbook_id)`
- `cre_game_day_scenarios(id, tenant_id, name, framework_scope, inject_payload, success_criteria)`
- `cre_game_day_runs(id, scenario_id, started_at, ended_at, result, after_action_report)`

### 8.3 Example APIs & background jobs

#### APIs
- `POST /api/adoption/health/compute/{tenant_id}`
- `GET /api/adoption/health/{tenant_id}`
- `POST /api/regulatory-changes/ingest`
- `POST /api/regulatory-changes/{change_id}/diff`
- `GET /api/regulatory-changes/impact/{tenant_id}`
- `POST /api/adoption/playbooks/trigger/{tenant_id}`
- `POST /api/cre/game-days/{scenario_id}/run`
- `POST /api/incentives/kpi-summaries/export`

#### Background jobs
- `nightly_tenant_health_score_job`
- `weekly_regulation_diff_job`
- `daily_impact_recompute_job`
- `monthly_champion_recognition_job`
- `post_incident_feedback_sync_job`

### 8.4 Example UI flows

#### Adoption Health dashboard
1. Tenant health score card
2. Shelfware risk indicators table
3. “Recommended next actions” panel
4. One-click trigger: recovery playbook

#### Regulatory Change Radar
1. New changes timeline
2. Impact matrix by framework/BU/system
3. “Accept mapping” or “request legal review” actions
4. Launch migration playbook

#### Compliance Champions view
1. Champion roster by BU
2. Contribution points and trend
3. Recognition feed and pending nominations

#### Game Day Simulator
1. Select scenario template
2. Assign participants and timeline
3. Run simulation with injected events
4. Post-run scorecard + remediation tasks

### 8.5 Prioritization plan

#### First 90 days (build first)
1. **Tenant Health Score + Shelfware detection + recovery playbooks**
2. **Regulatory Change intake + basic diff + tenant impact radar**
3. **Role KPI dashboards + export/webhook hooks + Champions v1**

#### Next 12–18 months
- Framework version migration lanes (test/prod)
- Full CRE error-budget governance + advanced game day library
- AI trust policy manager with per-framework feature controls
- Deep legacy integration accelerators (Tier 2/3 packs)

#### Success metrics in production

**Quantitative**
- WAU/MAU by role
- tenant health score distribution trend
- evidence freshness SLA attainment
- control testing timeliness
- framework-change response lead time
- artifact issuance cycle time
- CRE SLO attainment and error-budget burn

**Qualitative**
- audit committee confidence feedback
- regulator query turnaround perception
- BU champion NPS and retention
- reduced “compliance as paperwork” sentiment in user interviews
