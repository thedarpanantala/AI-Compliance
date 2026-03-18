"""Security and audit utility tests."""

from app.core.encryption import FieldEncryption
from app.services.audit import compute_audit_hash


def test_field_encryption_roundtrip() -> None:
    enc = FieldEncryption()
    plaintext = "sensitive-token"
    ciphertext = enc.encrypt(plaintext)
    assert ciphertext != plaintext
    assert enc.decrypt(ciphertext) == plaintext


def test_audit_hash_changes_with_payload() -> None:
    hash_1 = compute_audit_hash("genesis", "u1", "create", "r1", {"a": 1}, "2026-01-01T00:00:00Z")
    hash_2 = compute_audit_hash("genesis", "u1", "create", "r1", {"a": 2}, "2026-01-01T00:00:00Z")
    assert hash_1 != hash_2
