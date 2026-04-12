# Security Hardening Guide

## Layer 1 — Data Encryption
- Field-level encryption for sensitive DB fields implemented in `backend/app/core/encryption.py`.
- Set `FIELD_ENCRYPTION_KEY` from a secrets manager in production.
- S3 evidence objects should use server-side encryption (SSE-S3 or SSE-KMS).
- Database URL should enforce TLS (`sslmode=require`).

## Layer 2 — Tamper-Evident Audit Logs
- `backend/app/services/audit.py` implements chained hashes (`prev_hash -> current_hash`).
- Any mutation to historical entries invalidates downstream chain verification.

## Layer 3 — API Security
- JWT bearer auth + RBAC implemented in `backend/app/core/security.py`.
- Sensitive routes use role guards (`require_roles`).
- Global + endpoint rate limits added via `slowapi` in `backend/app/main.py`.

## Layer 4 — Secrets Management
- `backend/app/core/config.py` supports local env and AWS SSM retrieval (`/compliance-platform/*`).
- Store production secrets in AWS SSM/Secrets Manager (never hardcode in repos).

## Layer 5 — Network Security
- Put Cloudflare in front of ALB.
- Keep RDS private (no public IP).
- Keep S3 buckets private; access via presigned URLs.
- Restrict SG rules to only required ports and source ranges.
