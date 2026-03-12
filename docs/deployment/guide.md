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
