"""Tool definitions for the compliance agent."""

COMPLIANCE_AGENT_TOOLS = [
    {
        "name": "get_ai_system",
        "description": "Fetch details of an AI system: name, risk tier, status, metadata",
        "input_schema": {
            "type": "object",
            "properties": {"system_id": {"type": "string", "description": "The AI system UUID"}},
            "required": ["system_id"],
        },
    },
    {
        "name": "list_evidence",
        "description": "List all evidence items for an AI system with tags and types",
        "input_schema": {
            "type": "object",
            "properties": {
                "system_id": {"type": "string"},
                "evidence_type": {"type": "string", "description": "Optional filter"},
            },
            "required": ["system_id"],
        },
    },
    {
        "name": "get_control_status",
        "description": "Get pass/fail compliance status for all controls in latest assessment",
        "input_schema": {
            "type": "object",
            "properties": {
                "system_id": {"type": "string"},
                "framework": {"type": "string", "description": "Optional: eu_ai_act, dpdpa, nist etc."},
            },
            "required": ["system_id"],
        },
    },
    {
        "name": "run_compliance_check",
        "description": "Run the policy engine and return compliance results for an AI system",
        "input_schema": {
            "type": "object",
            "properties": {"system_id": {"type": "string"}, "framework": {"type": "string"}},
            "required": ["system_id"],
        },
    },
    {
        "name": "create_task",
        "description": "Create a remediation task in the workflow engine",
        "input_schema": {
            "type": "object",
            "properties": {
                "ai_system_id": {"type": "string"},
                "title": {"type": "string"},
                "description": {"type": "string"},
                "task_type": {"type": "string", "description": "remediation | review | approval"},
                "priority": {"type": "string", "description": "low | medium | high"},
            },
            "required": ["ai_system_id", "title", "task_type"],
        },
    },
    {
        "name": "attach_evidence_draft",
        "description": "Save an agent-generated document draft as evidence for human review",
        "input_schema": {
            "type": "object",
            "properties": {
                "ai_system_id": {"type": "string"},
                "title": {"type": "string"},
                "content": {"type": "string", "description": "Full text content of the draft"},
                "evidence_type": {"type": "string", "description": "document | test_result"},
            },
            "required": ["ai_system_id", "title", "content"],
        },
    },
    {
        "name": "search_controls",
        "description": "Search the control library for relevant controls by topic or framework",
        "input_schema": {
            "type": "object",
            "properties": {"query": {"type": "string"}, "framework": {"type": "string"}},
            "required": ["query"],
        },
    },
    {
        "name": "generate_document",
        "description": "Trigger the high-fidelity PDF generation engine for a specific compliance artifact",
        "input_schema": {
            "type": "object",
            "properties": {
                "template_code": {"type": "string", "description": "e.g. DPDPA_NOTICE, NABH_PROTOCOL"},
                "inputs": {"type": "object", "description": "Key-value pairs for template variables"}
            },
            "required": ["template_code", "inputs"],
        },
    },
]
