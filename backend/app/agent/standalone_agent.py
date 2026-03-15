"""Standalone agent — no DB access, works from uploaded docs or description."""
from __future__ import annotations

import anthropic

from app.agent.router import select_model
from app.core.config import settings

STANDALONE_PROMPT = """You are a specialized AI compliance advisor.

You help organisations understand what regulations apply to their AI systems
and what they need to do to become compliant.

Your expertise covers EU AI Act, India DPDPA 2023, ABDM/NDHM, NIST AI RMF,
ISO 42001, CPCB/SPCB environmental norms, HIPAA, EU CBAM, and CDSCO SaMD.

In this mode you do NOT have access to any database. You only have:
- What the user tells you about their AI system
- Any documents they have uploaded

Be practical and specific. Ask clarifying questions when needed.
Always cite which regulation a requirement comes from.
Tell the user exactly what evidence or documentation they need to produce."""


async def run_standalone_agent(
    user_message: str,
    conversation_history: list[dict],
    uploaded_docs: list[dict] | None = None,
) -> dict:
    """Run public-facing agent without database tools."""
    if not settings.agent_api_key:
        return {
            "response": "Standalone compliance agent is not configured yet. Add AGENT_API_KEY and try again.",
            "updated_history": conversation_history[-4:],
            "model_used": settings.agent_model_cheap,
        }

    client = anthropic.Anthropic(api_key=settings.agent_api_key, base_url=settings.agent_base_url or None)
    model = select_model(user_message, settings.agent_model_cheap, settings.agent_model_complex)
    history = conversation_history[-4:]

    doc_context = ""
    if uploaded_docs:
        doc_context = "\n\nUser has shared these documents:\n"
        for doc in uploaded_docs[:2]:
            text = (doc.get("content_text", "") or "")[:800]
            doc_context += f"\n[{doc.get('filename', 'document')}]:\n{text}\n"

    messages = history + [{"role": "user", "content": user_message}]
    response = client.messages.create(
        model=model,
        max_tokens=1200,
        system=STANDALONE_PROMPT + doc_context,
        messages=messages,
    )

    text = " ".join(block.text for block in response.content if block.type == "text")
    return {"response": text, "updated_history": messages[-4:], "model_used": model}
