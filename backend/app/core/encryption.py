"""Field-level encryption helpers for sensitive database fields."""
from cryptography.fernet import Fernet

from app.core.config import settings


class FieldEncryption:
    """Encrypt/decrypt sensitive values before persistence."""

    def __init__(self, key: str | None = None):
        secret = (key or settings.field_encryption_key).encode()
        self._fernet = Fernet(secret)

    def encrypt(self, plaintext: str) -> str:
        """Encrypt a plaintext string."""
        return self._fernet.encrypt(plaintext.encode()).decode()

    def decrypt(self, ciphertext: str) -> str:
        """Decrypt a ciphertext string."""
        return self._fernet.decrypt(ciphertext.encode()).decode()
