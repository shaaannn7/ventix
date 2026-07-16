from typing import Dict
from app.schemas.api import AgentReport, CommanderPlan

class CommanderAgent:
    def __init__(self):
        self.name = "Mission Commander"

    def orchestrate(self, reports: Dict[str, AgentReport], state: dict) -> CommanderPlan:
        """
        Orchestrate final operational decisions based on the reports from specialized agents.
        """
        severity = state.get("severity", "low")
        is_crisis = severity in ["high", "critical"]

        # Resolve conflicts and compile prioritized actions list
        prioritized_actions = []
        
        # Check security and medical alerts
        medical_rep = reports.get("medical")
        if medical_rep and medical_rep.recommendations:
            prioritized_actions.append({
                "id": "act-med-01",
                "priority": "CRITICAL",
                "title": "Medical Squad Dispatch",
                "description": medical_rep.recommendations[0],
                "area": "Gate B4 Turnstiles",
                "action_type": "dispatch_medical"
            })

        # Check crowd alerts
        crowd_rep = reports.get("crowd")
        if crowd_rep and crowd_rep.recommendations:
            prioritized_actions.append({
                "id": "act-crowd-01",
                "priority": "CRITICAL" if is_crisis else "HIGH",
                "title": "Queue Redistribution",
                "description": crowd_rep.recommendations[0],
                "area": "Gate B4 Ticketing concourse",
                "action_type": "reroute_crowd"
            })

        # Check volunteer reallocations
        vol_rep = reports.get("volunteer")
        if vol_rep and vol_rep.recommendations:
            prioritized_actions.append({
                "id": "act-vol-01",
                "priority": "HIGH",
                "title": "Staff Reallocation",
                "description": vol_rep.recommendations[0],
                "area": "Sector A to Gate B4",
                "action_type": "reallocate_staff"
            })

        # Check transit shuttle adjustments
        trans_rep = reports.get("transport")
        if trans_rep and trans_rep.recommendations:
            prioritized_actions.append({
                "id": "act-trans-01",
                "priority": "HIGH",
                "title": "Shuttle Adjustment",
                "description": trans_rep.recommendations[0],
                "area": "North Transit Hub",
                "action_type": "adjust_transit"
            })

        # General fallbacks
        if not prioritized_actions:
            prioritized_actions.append({
                "id": "act-nominal-01",
                "priority": "NOMINAL",
                "title": "Nominal Surveillance Mode",
                "description": "Stadium operations running smoothly. Maintain active sensors scanning.",
                "area": "Perimeterwide",
                "action_type": "surveillance"
            })

        # Calculate overall risk score
        risk_score = 0.84 if is_crisis else 0.12

        return CommanderPlan(
            overall_health=94 if not is_crisis else 78,
            risk_score=risk_score,
            prioritized_actions=prioritized_actions,
            agent_reports=reports
        )
