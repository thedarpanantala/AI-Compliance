"""Prompt templates for artifact generation."""

ANNEX_IV_PROMPT = """
You are an AI compliance documentation assistant.
Using extracted evidence: {evidence}
and AI system metadata: {metadata},
complete Annex IV sections for template {template_id}.
Required sections: risk_management, data_governance, human_oversight.
Flag missing data as explicit gaps.
Output JSON with keys: sections, gaps.
"""

GPCB_PROMPT = """
You are generating a monthly GPCB environmental compliance summary.
Input evidence: {evidence}
System metadata: {metadata}
Produce concise regulator-ready content for emissions, effluent handling,
and operational logs. Flag missing data.
Output JSON with keys: sections, gaps.
"""

ICMR_HITL_PROMPT = """
Generate ICMR human-in-the-loop assessment text from:
Evidence: {evidence}
Metadata: {metadata}
Focus on decision override, clinician escalation, and safety review cadence.
Return sections and gaps.
"""
