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
