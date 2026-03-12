# Artifact Engine API

## Priority Endpoints

### `POST /api/generate-artifact`
Generates regulator/buyer/internal artifact from evidence + metadata.

### `POST /api/map-controls`
Maps Indian controls/evidence to EU/US equivalents with transformation guidance.

### `POST /api/textile/gpcb-monthly-snapshot`
Shortcut endpoint to generate monthly GPCB submission snapshot.

## Additional Endpoints
- `GET /api/healthcare/icmr-hitl-assessment/{system_id}`
- `GET /api/healthcare/bodh-readiness/{system_id}`
- `POST /api/abdm-consent-bridge`
- `POST /api/textile/cs3d-buyer-report`
- `POST /api/esg-metric-calculator`
