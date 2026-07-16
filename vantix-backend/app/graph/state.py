from typing import TypedDict, Dict, List, Any, Optional
from app.schemas.api import AgentReport, CommanderPlan

class VantixState(TypedDict):
    # Telemetry configuration input parameters
    severity: str
    weather: str
    location: str
    people_count: int
    transport_status: str
    
    # Consolidated agent reports
    agent_reports: Dict[str, AgentReport]
    
    # Orchestrated plan from Mission Commander
    commander_plan: Optional[CommanderPlan]
    
    # Human-in-the-loop tracking parameters
    requires_approval: bool
    approved_actions: List[str]  # IDs of approved actions
    operator_feedback: Optional[dict]
    
    # Current active workflow step name
    current_step: str
