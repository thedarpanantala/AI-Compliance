# AI Compliance & Audit Automation Platform

Production-ready monorepo for a multi-tenant RegTech SaaS platform focused on AI governance, compliance, risk documentation, and audit automation.

## Product Scope
- AI system registration, dataset/model metadata inventory
- Compliance assessments + per-control assessment tracking
- Policy-as-code controls mapped to EU AI Act, ISO/IEC 42001, NIST AI RMF, GDPR, HIPAA
- Context-aware policy evaluation ({ai_system, evidence, connectors, data assets})
- Automated evidence capture from SDLC/ML platforms
- Audit-ready reporting (JSON/CSV/PDF-ready payload)
- Vertical modules for healthcare and manufacturing

## Monorepo Layout
- `backend/`: FastAPI + SQLAlchemy service APIs and policy engine
- `frontend/`: Next.js dashboard and workflows UI
- `policy_library/`: YAML control packs by framework
- `connectors/`: Source adapters for evidence ingestion
- `sdk/`: Python + TypeScript SDKs
- `infra/`: Docker and Terraform deployment templates
- `docs/`: architecture, API, deployment docs

## Quick Start
```bash
cp backend/.env.example backend/.env
cp frontend/.env.local.example frontend/.env.local

docker compose up --build
```

Services:
- API: `http://localhost:8000/docs`
- UI: `http://localhost:3000`

## Development Commands
```bash
# Backend
cd backend && pip install -r requirements.txt && pytest

# Frontend
cd frontend && npm ci && npm run test

# Full lint/test (CI equivalent)
./scripts/ci_local.sh
```

## Future-Ready Strategy
- Regulation update pipeline via versioned policy packs
- Compliance pack marketplace abstraction (`control_library_service` extension point)
- Dataset moat with historical control evaluations and regulator-ready evidence bundles
- AI governance copilots supported through audit-safe retrieval APIs


## Deployment Modes
- Cloud-hosted multi-tenant SaaS
- Single-tenant dedicated enterprise deployment
- API-first integration mode

See `docs/deployment/modes.md`.

## Security Baseline
Field encryption, JWT + RBAC, rate limiting, tamper-evident audit logs, and secrets manager integration are documented in `docs/security/hardening.md`.

## Artifact Generation Engine (Differentiator)
- Convert messy evidence bundles into regulator-ready artifacts (Annex IV, ICMR HITL, BODH readiness, GPCB monthly, DPDPA trail, CS3D).
- Jurisdiction Bridge maps India controls to EU/US equivalents with transformation instructions.
- Human-in-the-loop review remains mandatory before issue.

Success metric: Upload evidence and produce Annex IV-ready output in under 15 minutes.


## Durable Adoption & Governance Engine
See `docs/architecture/durable_adoption_governance_engine.md` for adoption, incentive/KPI, regulatory evolution, legacy sidecar, CRE, and HITL governance design.


## Supabase Deployment
This repo is now Supabase-ready for managed Postgres + browser client wiring. See `docs/deployment/supabase.md` for the exact files and env vars to update.
