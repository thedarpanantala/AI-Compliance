"""Routes queries to cheap or powerful model."""

COMPLEX_PATTERNS = [
    "draft",
    "generate",
    "write",
    "create document",
    "annex iv",
    "dpia",
    "full report",
    "complete the",
    "fill in",
    "prepare submission",
]


def select_model(message: str, cheap_model: str, complex_model: str) -> str:
    """Select economical model for simple prompts and stronger one for drafting tasks."""
    if any(pattern in message.lower() for pattern in COMPLEX_PATTERNS):
        return complex_model
    return cheap_model
