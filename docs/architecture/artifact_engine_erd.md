# Artifact Engine ERD

```mermaid
erDiagram
    ORGANIZATIONS ||--o{ ARTIFACT_TEMPLATES : owns
    ORGANIZATIONS ||--o{ GENERATED_ARTIFACTS : produces
    ORGANIZATIONS ||--o{ CONTROL_MAPPINGS : customizes

    ARTIFACT_TEMPLATES ||--o{ GENERATED_ARTIFACTS : template_id

    ARTIFACT_TEMPLATES {
      string id PK
      string org_id FK nullable
      string template_id unique
      string name
      string jurisdiction
      string target_audience
      json required_fields
      string template_path
      bool is_active
      string tenant_id
      datetime created_at
      datetime updated_at
    }

    GENERATED_ARTIFACTS {
      string id PK
      string org_id FK
      string template_id
      string system_id
      string evidence_bundle_id
      string jurisdiction
      string audience
      string status
      string llm_provider
      string output_format
      json output_payload
      json validation_result
      json audit_embed
      string tenant_id
      datetime created_at
      datetime updated_at
    }

    CONTROL_MAPPINGS {
      string id PK
      string org_id FK nullable
      string indian_control
      json eu_equivalent
      json us_equivalent
      float confidence_score
      text evidence_transform
      json transformation_steps
      string tenant_id
      datetime created_at
      datetime updated_at
    }
```
