# Architecture Overview

The platform uses modular services aligned to long-lived compliance functions:
- auth-service
- ai-inventory-service
- control-library-service
- policy-engine
- evidence-service
- workflow-engine
- connector-service
- reporting-service
- audit-log-service

Design principles:
- Multi-tenant first with `tenant_id` enforced in domain tables
- Immutable audit records for every API action
- Policy packs versioned in YAML to absorb future regulatory updates
- Vertical modules (healthcare/manufacturing) isolated by bounded contexts
