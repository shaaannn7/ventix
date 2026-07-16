import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_api_simulate_unauthorized():
    # Attempting to trigger simulation with no credentials
    response = client.post("/api/simulate", json={
        "severity": "low",
        "weather": "clear",
        "location": "Sector A",
        "people_count": 5000,
        "transport_status": "nominal"
    })
    assert response.status_code == 401
    assert "detail" in response.json()

def test_api_simulate_invalid_token():
    # Attempting to trigger simulation with invalid bearer token
    headers = {"Authorization": "Bearer bad-token-1234"}
    response = client.post("/api/simulate", json={
        "severity": "low",
        "weather": "clear",
        "location": "Sector A",
        "people_count": 5000,
        "transport_status": "nominal"
    }, headers=headers)
    assert response.status_code == 401

def test_api_simulate_success_with_mock_flow():
    # Verifying successful API call with valid mock credentials
    headers = {"Authorization": "Bearer mock-operations-token-2026"}
    response = client.post("/api/simulate", json={
        "severity": "low",
        "weather": "clear",
        "location": "Sector A",
        "people_count": 5000,
        "transport_status": "nominal"
    }, headers=headers)
    # The LangGraph workflow compiles and executes specialized_agents -> commander
    assert response.status_code == 200
    data = response.json()
    assert "simulation_id" in data
    assert "requires_approval" in data
    assert "plan" in data

def test_websocket_operations_unauthorized():
    # WebSocket connection fails if no security token is supplied in query string
    with pytest.raises(Exception):
        with client.websocket_connect("/ws/operations") as websocket:
            pass

def test_websocket_operations_authorized():
    # WebSocket connects successfully with valid token query param
    with client.websocket_connect("/ws/operations?token=mock-operations-token-2026") as websocket:
        websocket.send_text("PING")
        data = websocket.receive_text()
        assert data == "ACK: PING"

def test_rate_limiting():
    headers = {"Authorization": "Bearer mock-operations-token-2026"}
    triggered_429 = False
    for _ in range(20):
        response = client.post("/api/simulate", json={
            "severity": "low",
            "weather": "clear",
            "location": "Sector A",
            "people_count": 5000,
            "transport_status": "nominal"
        }, headers=headers)
        if response.status_code == 429:
            triggered_429 = True
            break
    assert triggered_429
