# Deployment Modes

This platform supports three deployment modes from the same codebase.

## Mode 1 — Cloud-Hosted Multi-Tenant (Primary GTM)
- Public SaaS endpoint (`your-domain.com`) behind Cloudflare + WAF.
- FastAPI and Next.js run in managed cloud compute (ECS/EKS/GKE/AKS).
- Single shared PostgreSQL/Redis/S3 infrastructure with strict logical isolation (`org_id`, `tenant_id`, RBAC).
- Best for speed-to-market and onboarding mid-market organizations.

## Mode 2 — Single-Tenant Dedicated (Enterprise/PSU)
- Platform deployed in customer VPC/private network.
- Dedicated app stack + isolated DB/object store per enterprise.
- Supports private connectivity, stricter data residency, and customer-managed keys.
- Use existing Docker images and Terraform modules for repeatable deployment.

## Mode 3 — API-First Integration
- Customer keeps their own product UI and calls platform APIs.
- Use API keys/JWT-based service auth with SDKs (`sdk/python`, `sdk/typescript`).
- Ideal for HealthTech/MedTech/FinTech platforms embedding compliance automation.

## Recommended rollout
1. Launch Mode 1 for fastest revenue and product iteration.
2. Add Mode 2 playbooks for regulated enterprise deals.
3. Expand Mode 3 via SDKs and partner integrations.
