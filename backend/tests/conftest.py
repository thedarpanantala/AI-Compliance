"""Pytest path/bootstrap settings for monorepo layout."""
import os
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

# Ensure required settings exist for tests that import app.main.
os.environ.setdefault("DATABASE_URL", "sqlite+pysqlite:///:memory:")
os.environ.setdefault("JWT_SECRET", "test-secret-key")
os.environ.setdefault("FIELD_ENCRYPTION_KEY", "Klm06WrWmkxqKtYDLQbFJ9n2Ulo53ITeGUmCWhOe91Y=")
os.environ.setdefault("ENV", "local")
os.environ.setdefault("DEPLOYMENT_MODE", "cloud_multi_tenant")
