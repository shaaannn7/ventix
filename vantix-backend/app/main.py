import uuid
import logging
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any, Optional

from app.graph.workflow import vantix_workflow
from app.services.websocket import manager
from app.schemas.api import OperatorFeedback, CommanderPlan

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("VantixMain")

from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi import Depends, Security

ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:3002",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3002",
    "https://ventix-mu.vercel.app",
]

app = FastAPI(
    title="Vantix Stadium Intelligence OS",
    description="Multi-agent LangGraph backend for FIFA World Cup 2026 operations.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

security = HTTPBearer()

def verify_token(credentials: HTTPAuthorizationCredentials = Security(security)):
    token = credentials.credentials
    # In enterprise production, this validates JWT signatures against identity providers (e.g. Auth0, Firebase, or Okta)
    if token != "mock-operations-token-2026":
        raise HTTPException(
            status_code=401,
            detail="Authentication failed: Invalid credentials or session token expired."
        )
    return token


from app.services.persistence import persistence_store
from app.services.rate_limiter import rate_limit

class SimulationRequest(BaseModel):
    severity: str
    weather: str
    location: str
    people_count: int
    transport_status: str

@app.post("/api/simulate")
async def trigger_simulation(req: SimulationRequest, token: str = Depends(verify_token), _ = Depends(rate_limit)):
    sim_id = str(uuid.uuid4())
    logger.info(f"Triggering simulation {sim_id} for scenario: {req.location} (verified by token)")
    
    # Compile initial LangGraph state dictionary
    initial_state = {
        "severity": req.severity,
        "weather": req.weather,
        "location": req.location,
        "people_count": req.people_count,
        "transport_status": req.transport_status,
        "agent_reports": {},
        "commander_plan": None,
        "requires_approval": False,
        "approved_actions": [],
        "operator_feedback": None,
        "current_step": "init"
    }

    # Broadcast simulation start
    await manager.broadcast({
        "event": "simulation_started",
        "simulation_id": sim_id,
        "step": "initializing_agents"
    })

    try:
        # Run graph workflow up to human approval gate
        result_state = vantix_workflow.invoke(initial_state)
        
        # Save to file persistence store
        persistence_store.set(sim_id, result_state)

        # Stream current steps progress
        await manager.broadcast({
            "event": "simulation_progress",
            "simulation_id": sim_id,
            "step": result_state["current_step"],
            "requires_approval": result_state["requires_approval"],
            "plan": result_state["commander_plan"].model_dump() if result_state["commander_plan"] else None
        })

        return {
            "simulation_id": sim_id,
            "requires_approval": result_state["requires_approval"],
            "plan": result_state["commander_plan"]
        }

    except Exception as e:
        logger.error(f"Workflow execution failure: {e}")
        raise HTTPException(status_code=500, detail="Operations workflow failed to compile.")

@app.post("/api/approve")
async def approve_action(feedback: OperatorFeedback, token: str = Depends(verify_token), _ = Depends(rate_limit)):
    sim_id = feedback.decision_id
    state = persistence_store.get(sim_id)
    if not state:
        raise HTTPException(status_code=404, detail="Active simulation reference not found.")
    
    # Process operator feedback approval
    if feedback.approved:
        logger.info(f"Operator approved actions for simulation {sim_id} (verified by token)")
        state["approved_actions"] = ["act-med-01", "act-crowd-01", "act-vol-01"] # Auto-approve plan nodes
        state["operator_feedback"] = feedback.model_dump()
        
        # Resume LangGraph thread from wait state
        resumed_state = vantix_workflow.invoke(state)
        persistence_store.set(sim_id, resumed_state)

        # Broadcast update to web socket connection clients
        await manager.broadcast({
            "event": "simulation_completed",
            "simulation_id": sim_id,
            "step": resumed_state["current_step"],
            "status": "DISPATCH_EXECUTED"
        })

        return {"status": "dispatched", "step": resumed_state["current_step"]}
    else:
        logger.info(f"Operator rejected plan for simulation {sim_id} (verified by token)")
        await manager.broadcast({
            "event": "simulation_triage_rejected",
            "simulation_id": sim_id,
            "status": "REJECTED_BY_OPERATOR"
        })
        return {"status": "rejected"}

async def handle_websocket_auth(websocket: WebSocket):
    # Retrieve security token from query parameters (since browsers do not natively support Custom Headers on ws handshakes)
    token = websocket.query_params.get("token")
    if not token:
        # Fallback check for protocol
        token = websocket.headers.get("sec-websocket-protocol")

    if token != "mock-operations-token-2026":
        await websocket.close(code=4003) # Close connection with Policy Violation code
        logger.warning("Rejected unauthorized WebSocket connection attempt.")
        return

    await manager.connect(websocket)
    logger.info("New client authorized operations console connected.")
    try:
        while True:
            # Maintain connection thread active
            data = await websocket.receive_text()
            # Echo heartbeat packets back
            await websocket.send_text(f"ACK: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        logger.info("Client operations console disconnected.")

@app.websocket("/ws/operations")
async def websocket_operations_endpoint(websocket: WebSocket):
    await handle_websocket_auth(websocket)

@app.websocket("/ws/telemetry")
async def websocket_telemetry_endpoint(websocket: WebSocket):
    await handle_websocket_auth(websocket)
