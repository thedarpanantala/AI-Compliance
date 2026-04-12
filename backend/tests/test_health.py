"""API smoke tests."""
from fastapi.testclient import TestClient
from app.main import app


def test_health_endpoint() -> None:
    client = TestClient(app)
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_security_headers_present() -> None:
    client = TestClient(app)
    response = client.get("/health")
    assert response.headers["x-content-type-options"] == "nosniff"
    assert response.headers["x-frame-options"] == "DENY"
    assert "frame-ancestors 'none'" in response.headers["content-security-policy"]


def test_request_size_limit() -> None:
    client = TestClient(app)
    response = client.post(
        "/api/agent/standalone",
        data=("x" * (1_048_576 + 10)),
        headers={"content-type": "text/plain", "content-length": str(1_048_576 + 10)},
    )
    assert response.status_code == 413
