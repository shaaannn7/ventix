from langgraph.graph import StateGraph, START, END
from app.graph.state import VantixState
from app.agents.specialized import (
    CrowdIntelligenceAgent,
    TransportAgent,
    SecurityAgent,
    MedicalAgent,
    VolunteerAgent,
    NavigationAgent,
    WeatherAgent,
    ResourceAgent,
    SustainabilityAgent,
    CommunicationAgent,
    PredictionAgent,
    AnalyticsAgent
)
from app.agents.commander import CommanderAgent
from app.schemas.api import AgentReport

# Instantiate all specialized agents
agents_map = {
    "crowd": CrowdIntelligenceAgent("Crowd"),
    "transport": TransportAgent("Transit"),
    "security": SecurityAgent("Security"),
    "medical": MedicalAgent("Medical"),
    "volunteer": VolunteerAgent("Volunteer"),
    "navigation": NavigationAgent("Navigation"),
    "weather": WeatherAgent("Weather"),
    "resource": ResourceAgent("Resource"),
    "sustainability": SustainabilityAgent("Sustainability"),
    "communication": CommunicationAgent("Communication"),
    "prediction": PredictionAgent("Prediction"),
    "analytics": AnalyticsAgent("Analytics")
}

commander = CommanderAgent()

def run_specialized_agents(state: VantixState) -> dict:
    reports = {}
    for key, agent in agents_map.items():
        reports[key] = agent.evaluate(state)
    return {"agent_reports": reports, "current_step": "specialized_agents_complete"}

def run_commander(state: VantixState) -> dict:
    reports = state.get("agent_reports", {})
    plan = commander.orchestrate(reports, state)
    
    # Check if there are any critical actions requiring human approval
    requires_approval = False
    for action in plan.prioritized_actions:
        if action.get("priority") in ["CRITICAL", "HIGH"]:
            requires_approval = True
            break
            
    return {
        "commander_plan": plan, 
        "requires_approval": requires_approval,
        "current_step": "commander_planning_complete"
    }

def human_approval_router(state: VantixState) -> str:
    # Routes based on commander plan and operator feedback approvals
    plan = state.get("commander_plan")
    if not plan:
        return "end"
        
    requires_approval = state.get("requires_approval", False)
    approved_actions = state.get("approved_actions", [])
    
    if requires_approval and not approved_actions:
        return "human_approval_required"
    return "execute_dispatches"

def human_wait_node(state: VantixState) -> dict:
    # Halts execution, waits for external API trigger to supply approved action IDs
    return {
        "current_step": "human_wait_state",
        "requires_approval": True
    }

def execute_dispatches(state: VantixState) -> dict:
    # Runs the action mutations on simulated resources
    return {
        "current_step": "execution_complete",
        "requires_approval": False
    }

# Build LangGraph StateGraph
builder = StateGraph(VantixState)

builder.add_node("specialized_agents", run_specialized_agents)
builder.add_node("commander", run_commander)
builder.add_node("human_wait", human_wait_node)
builder.add_node("execute_dispatches", execute_dispatches)

# Define transitions
builder.add_edge(START, "specialized_agents")
builder.add_edge("specialized_agents", "commander")

# Conditional human-in-the-loop edge
builder.add_conditional_edges(
    "commander",
    human_approval_router,
    {
        "human_approval_required": "human_wait",
        "execute_dispatches": "execute_dispatches",
        "end": END
    }
)

builder.add_edge("human_wait", END)
builder.add_edge("execute_dispatches", END)

# Compile graph
vantix_workflow = builder.compile()
