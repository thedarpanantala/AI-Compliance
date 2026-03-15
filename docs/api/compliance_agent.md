# Compliance Agent Integration

## Endpoints
- `POST /api/agent/chat` — embedded platform agent (DB-aware)
- `POST /api/agent/standalone` — public website agent (no DB access)

## Provider/Model Switch Location
To switch from Anthropic to Minimax/Kimi later, update these environment variables:

- `AGENT_PROVIDER`
- `AGENT_API_KEY`
- `AGENT_BASE_URL`
- `AGENT_MODEL_CHEAP`
- `AGENT_MODEL_COMPLEX`

Primary implementation location:
- `backend/app/agent/compliance_agent.py` (`_get_client`)
- `backend/app/agent/standalone_agent.py` (client init)
- `backend/app/core/config.py` (agent settings)

## Quick Smoke Calls
```bash
BASE="http://localhost:8000/api"

curl -X POST "$BASE/agent/standalone" \
  -H "Content-Type: application/json" \
  -d '{"message":"I have a credit scoring AI. What regulations apply?","history":[]}'

curl -X POST "$BASE/agent/chat" \
  -H "Content-Type: application/json" \
  -d '{"message":"What controls are failing?","org_id":"demo-org","system_id":"sys-1","history":[]}'
```
