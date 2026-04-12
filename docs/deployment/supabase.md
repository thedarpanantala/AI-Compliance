# Supabase Deployment Guide

This repo is now prepared to run with Supabase as the managed backend for:
- PostgreSQL database
- optional Auth integration later
- optional Storage integration later

## What you need to update

### Frontend
Set these in `frontend/.env.local` or your hosting platform env settings:

```bash
NEXT_PUBLIC_API_URL=https://your-backend-domain.example.com
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_publishable_or_anon_key
```

### Backend
Set these in `backend/.env` or your container/server env settings:

```bash
DATABASE_URL=postgresql+psycopg2://postgres:<PASSWORD>@db.<project-ref>.supabase.co:5432/postgres?sslmode=require
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_PUBLISHABLE_KEY=your_publishable_or_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
ALLOWED_ORIGINS=https://your-frontend-domain.example.com,http://localhost:3000
```

## Important note about keys
- You already shared the **Supabase Project URL** and **publishable key**.
- The remaining value you still need to add yourself is the **database password / full DATABASE_URL** and, if you want server-to-server Supabase admin calls later, the **SUPABASE_SERVICE_ROLE_KEY**.
- Update locations are:
  - `frontend/.env.local` for public browser values
  - `backend/.env` for server-side values

## Files wired for Supabase readiness
- Frontend client helper: `frontend/lib/supabase.ts`
- Frontend status card: `frontend/components/SupabaseConnectionCard.tsx`
- Backend settings: `backend/app/core/config.py`
- Backend CORS for hosted frontend: `backend/app/main.py`

## Deployment flow
1. Create `backend/.env` from `backend/.env.example`.
2. Paste your Supabase Postgres connection string into `DATABASE_URL`.
3. Create `frontend/.env.local` from `frontend/.env.local.example`.
4. Paste your Supabase URL + publishable key there.
5. Deploy backend anywhere that can reach Supabase Postgres (Railway, Render, EC2, Fly, Docker VPS, etc.).
6. Deploy frontend anywhere static/SSR-friendly (Vercel, Netlify, Docker host, etc.).
7. Set `ALLOWED_ORIGINS` on backend to your frontend domain.

## Why this is "Supabase deployable"
Supabase is being used as the managed database foundation, while this monorepo keeps FastAPI + Next.js as the application layer. That gives you full product flexibility without rewriting backend logic into Supabase-only primitives.
