# AI Compliance & Audit Automation Platform

Production-ready monorepo for a multi-tenant RegTech SaaS platform focused on AI governance, compliance, risk documentation, and audit automation.

## Product Scope
- AI system registration, dataset/model metadata inventory
- Policy-as-code controls mapped to EU AI Act, ISO/IEC 42001, NIST AI RMF, GDPR, HIPAA
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
