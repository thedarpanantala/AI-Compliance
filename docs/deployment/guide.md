# Deployment Guide

## Local
Run `docker compose up --build`.

## Cloud
- Provision networking/compute with `infra/terraform/aws`
- Push backend/frontend images to container registry
- Deploy to ECS Fargate (AWS), Cloud Run/GKE (GCP), or AKS (Azure)

## Security Baseline
- Store JWT secrets in cloud secret manager
- Use managed Postgres with encryption-at-rest
- Enable WAF and private service networking


## Deployment models
See `docs/deployment/modes.md` for multi-tenant SaaS, single-tenant dedicated, and API-first deployment patterns.

## Security hardening
See `docs/security/hardening.md` for encryption, JWT/RBAC, audit chaining, secrets management, and network controls.


## Supabase deployment
See `docs/deployment/supabase.md` for the exact frontend/backend env values to update, including where to put your publishable key, service role key, and Supabase Postgres connection string.
