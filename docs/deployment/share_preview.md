# Shareable Preview Guide

## 1) Local run (Docker Desktop)
From repo root:

```bash
./scripts/start_local.sh
```

Open:
- UI: http://localhost:3000
- API docs: http://localhost:8000/docs

## 2) Share temporary public URL (quick demo)
### Option A: ngrok
Install ngrok, then in a second terminal:

```bash
ngrok http 3000
```

Share the generated `https://xxxx.ngrok-free.app` URL.

### Option B: Cloudflare tunnel
Install cloudflared, then:

```bash
cloudflared tunnel --url http://localhost:3000
```

Share the generated `https://*.trycloudflare.com` URL.

## 3) Proper hosted preview (recommended)
- Deploy frontend on Vercel/Netlify.
- Deploy backend on Render/Fly.io/Railway.
- Point frontend `NEXT_PUBLIC_API_URL` to deployed backend.

This is best for stable links to share with teammates.

## 4) What to send to your client (copy/paste template)
Use this message when sharing your platform preview:

```text
Hi <Client Name>,

Here is your SHASIT preview link: <FRONTEND_URL>
API health check: <BACKEND_URL>/health
API docs (optional): <BACKEND_URL>/docs

Test login/registration:
- Email: <TEST_USER_EMAIL>
- Password: <TEST_USER_PASSWORD>

Please validate these flows:
1) Login/registration
2) Open dashboard pages
3) Run compliance checklist for one industry
4) Generate one artifact/report
5) Confirm page load speed and any broken links

Please share feedback with screenshots + exact steps.
```

## 5) Client UAT checklist (minimum)
Before asking for client feedback, verify these yourself:

- Frontend loads without console errors.
- Backend health endpoint returns success.
- Compliance checklist endpoint returns expected industry controls.
- Artifact generation endpoint returns output payload.
- One end-to-end flow works from UI action -> API response.

Suggested quick commands:

```bash
curl -s http://localhost:8000/health
curl -s -X POST http://localhost:8000/api/v1/compliance/checklist \
  -H 'Content-Type: application/json' \
  -d '{"industry":"Manufacturing & Engineering","export_markets":["EU","US"]}'
```

## 6) Branch/merge clarification
In this repo, your current branch may not be `main`. Check with:

```bash
git branch --show-current
```

If you are on a feature branch, merge to `main` (or open a PR to `main`) before production deployment.
