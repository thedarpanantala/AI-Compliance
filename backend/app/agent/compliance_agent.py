"""Main compliance agent — platform-embedded version."""
from __future__ import annotations

import json
import uuid
from datetime import datetime, timezone

import anthropic

from app.agent.router import select_model
from app.agent.tool_executor import execute_tool
from app.agent.tools import COMPLIANCE_AGENT_TOOLS
from app.core.config import settings
from app.models.entities import AgentUsageLog

SYSTEM_PROMPT = """You are a specialized AI compliance expert embedded in
the AI Compliance & Audit Automation Platform.

Your expertise covers:
- EU AI Act 2024 (Annex III high-risk categories, Annex IV documentation)
- India DPDPA 2023 (consent, purpose limitation, data fiduciary obligations)
- ABDM/NDHM (consent manager, ABHA IDs, health data exchange)
- NIST AI RMF (Govern, Map, Measure, Manage)
- ISO/IEC 42001 (AI management systems)
- CPCB/SPCB norms (Red/Orange/Green/White pollution categories)
- HIPAA/HITECH (PHI, minimum necessary, BAA)
- EU CBAM + CS3D (emissions data for Indian exporters)
- India CDSCO SaMD / Medical AI regulations
- SAHI (India's Responsible AI in Health strategy)

Rules you always follow:
1. Always fetch real data via tools before making compliance claims
2. Cite specific regulation articles/sections, not vague references
3. Be direct about compliance gaps — do not soften bad news
4. Suggest the simplest path to compliance, not the most thorough
5. Before creating tasks or drafts, confirm with user unless they said "just do it"
6. Keep responses concise — users are busy compliance managers, not students
7. If you don't know something specific, say so — never make up regulation citations"""


def _get_client() -> anthropic.Anthropic:
    """Create Anthropic client.

    For alternate providers later (Minimax/Kimi), change:
    - settings.agent_api_key
    - settings.agent_base_url
    - settings.agent_provider
    """
    return anthropic.Anthropic(api_key=settings.agent_api_key, base_url=settings.agent_base_url or None)


async def run_compliance_agent(
    user_message: str,
    org_id: str,
    system_id: str | None,
    conversation_history: list[dict],
    db,
    user_id: str | None = None,
) -> dict:
    """Run embedded agent with tool-calling loop."""
    if not settings.agent_api_key:
        return {
            "response": "Compliance agent is not configured. Set AGENT_API_KEY/ANTHROPIC_API_KEY in backend environment.",
            "actions_taken": [],
            "updated_history": conversation_history[-6:],
            "model_used": settings.agent_model_cheap,
        }

    client = _get_client()
    model = select_model(user_message, settings.agent_model_cheap, settings.agent_model_complex)
    history = conversation_history[-6:]
    context = f"\n\nUser is currently viewing AI system ID: {system_id}." if system_id else ""

    messages = history + [{"role": "user", "content": user_message}]
    actions_taken: list[dict] = []
    final_text = ""

    for _ in range(4):
        response = client.messages.create(
            model=model,
            max_tokens=1500,
            system=SYSTEM_PROMPT + context,
            tools=COMPLIANCE_AGENT_TOOLS,
            messages=messages,
        )

        text_blocks = [block.text for block in response.content if block.type == "text"]
        if text_blocks:
            final_text = "\n".join(text_blocks)

        if response.stop_reason == "end_turn":
            break

        tool_results = []
        for block in response.content:
            if block.type == "tool_use":
                result = await execute_tool(block.name, block.input, org_id, system_id, db)
                actions_taken.append({"tool": block.name, "result_summary": result.get("summary", "done")})
                tool_results.append({"type": "tool_result", "tool_use_id": block.id, "content": json.dumps(result)})

        messages.append({"role": "assistant", "content": response.content})
        messages.append({"role": "user", "content": tool_results})

    _log_usage(org_id=org_id, user_id=user_id, model=model, db=db)

    return {
        "response": final_text,
        "actions_taken": actions_taken,
        "updated_history": messages[-6:],
        "model_used": model,
    }


def _log_usage(org_id: str, user_id: str | None, model: str, db) -> None:
    """Lightweight usage logging for budget tracking."""
    usage = AgentUsageLog(
        id=f"agentlog_{uuid.uuid4().hex[:20]}",
        tenant_id=org_id,
        org_id=org_id,
        user_id=user_id,
        model=model,
        input_tokens=0,
        output_tokens=0,
        cost_usd=0.01,
        turns=1,
        logged_at=datetime.now(timezone.utc),
    )
    db.add(usage)
    db.commit()
