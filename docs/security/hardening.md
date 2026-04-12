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
- Security middleware enforces headers (CSP, X-Frame-Options, Referrer-Policy, etc.), host validation, and request body size limits.

## Layer 4 — Secrets Management
- `backend/app/core/config.py` supports local env and AWS SSM retrieval (`/compliance-platform/*`).
- Store production secrets in AWS SSM/Secrets Manager (never hardcode in repos).

## Layer 5 — Network Security & WAF/CDN
- Cloudflare is recommended in front of your edge/proxy, but the stack is configurable for other WAF/CDN providers.
- Keep RDS private (no public IP).
- Keep S3 buckets private; access via presigned URLs.
- Restrict SG rules to only required ports and source ranges.

## Production Security Environment Variables
Use these values as your launch baseline (editable later):

```env
ALLOWED_ORIGINS=https://app.Shasit.com,https://shasit.com
ALLOWED_HOSTS=api.aicomplyhub.com
MAX_REQUEST_SIZE_BYTES=26214400
HSTS_ENABLED=true
TRUST_PROXY_HEADERS=true
CLIENT_IP_HEADER=CF-Connecting-IP
WAF_PROVIDER=cloudflare
```

If you switch CDN/WAF, keep `TRUST_PROXY_HEADERS=true` and update `CLIENT_IP_HEADER` + `WAF_PROVIDER`.
