import random
from app.agents.base import BaseAgent
from app.schemas.api import AgentReport

class CrowdIntelligenceAgent(BaseAgent):
    def evaluate(self, state: dict) -> AgentReport:
        severity = state.get("severity", "low")
        is_crisis = severity in ["high", "critical"]
        
        summary = (
            "Gate B4 turnstile throughput is operating near capacity bounds. Local densities have climbed to 3.4 people/m²."
            if is_crisis else "Concourse densities are nominal. Queue wait times average under 8 minutes across all gates."
        )
        confidence = 0.96 if is_crisis else 0.98
        evidence = ["CCTV density scanner Sector 4", "Gate B4 check-in throughput stats"]
        recommendations = (
            ["Deploy physical line barriers to structure Gate B4 queues", "Reroute ingress traffic to auxiliary Gate C"]
            if is_crisis else []
        )
        return AgentReport(
            summary=summary,
            confidence=confidence,
            evidence=evidence,
            recommendations=recommendations,
            dependencies=[]
        )

class TransportAgent(BaseAgent):
    def evaluate(self, state: dict) -> AgentReport:
        severity = state.get("severity", "low")
        is_crisis = severity in ["high", "critical"]
        
        summary = (
            "Metro line delays have increased ingress pedestrian wait times at North Hub. Local transfer loads peak at 88 scans/min."
            if is_crisis else "Metro schedules are running on time. Bus shuttle fleets maintain 5-minute frequencies."
        )
        return AgentReport(
            summary=summary,
            confidence=0.92,
            evidence=["Metro arrival GPS trackers", "North Hub exit barrier telemetry"],
            recommendations=["Activate extra shuttle lane B", "Reroute incoming buses to North transit loop"] if is_crisis else [],
            dependencies=["CrowdIntelligenceAgent"]
        )

class SecurityAgent(BaseAgent):
    def evaluate(self, state: dict) -> AgentReport:
        severity = state.get("severity", "low")
        is_crisis = severity in ["high", "critical"]
        
        summary = (
            "Potential bottleneck congestion detected near Sector 4 checkpoints, posing minor local safety risks."
            if is_crisis else "All perimeter fencing, VIP corridors, and general seat zones remain clear."
        )
        return AgentReport(
            summary=summary,
            confidence=0.95,
            evidence=["Sector 4 CCTV feeds", "Security patrol location logs"],
            recommendations=["Deploy Security Patrol Team Alpha to Gate B4 to manage crowd lanes"] if is_crisis else [],
            dependencies=[]
        )

class MedicalAgent(BaseAgent):
    def evaluate(self, state: dict) -> AgentReport:
        severity = state.get("severity", "low")
        is_crisis = severity in ["high", "critical"]
        
        summary = (
            "Two local heat exhaustion cases reported at Turnstile 14B. Medical squad response times are stable at 3.2 mins."
            if is_crisis else "No medical incidents reported. All first-aid rooms are stocked and standby squads are ready."
        )
        return AgentReport(
            summary=summary,
            confidence=0.97,
            evidence=["Incident dispatcher logs", "Ambulance station coverage matrix"],
            recommendations=["Dispatch Medical Squad 2 to Gate B4 concourse area"] if is_crisis else [],
            dependencies=["SecurityAgent"]
        )

class VolunteerAgent(BaseAgent):
    def evaluate(self, state: dict) -> AgentReport:
        severity = state.get("severity", "low")
        is_crisis = severity in ["high", "critical"]
        
        summary = (
            "Volunteers in Sector A report high fatigue indices (74/100) due to intense check-in crowds."
            if is_crisis else "Volunteer team capacities are nominal. Assignment tasks show 100% completion rates."
        )
        return AgentReport(
            summary=summary,
            confidence=0.94,
            evidence=["Staff sign-in trackers", "Fatigue report forms"],
            recommendations=["Reallocate 6 volunteers from Sector A to Gate B4 turnstiles"] if is_crisis else [],
            dependencies=[]
        )

class NavigationAgent(BaseAgent):
    def evaluate(self, state: dict) -> AgentReport:
        return AgentReport(
            summary="Emergency routes through Concourse B remain clear. Direct exit pathways mapped.",
            confidence=0.98,
            evidence=["Stadium exit path sensors"],
            recommendations=["Map emergency exit lines through Concourse C for Sector 4 fans"] if state.get("severity") == "critical" else [],
            dependencies=[]
        )

class WeatherAgent(BaseAgent):
    def evaluate(self, state: dict) -> AgentReport:
        weather = state.get("weather", "clear")
        summary = (
            "Severe rain storm active. Local footing safety indexes reduced by 15%. Entrance scans delayed by rain checks."
            if weather == "storm" else "Clear sky conditions. Nominal footing safety indices."
        )
        return AgentReport(
            summary=summary,
            confidence=0.99,
            evidence=["Local weather radar feeds"],
            recommendations=["Advise stadium gates to open auxiliary dry concourse entry lines"] if weather == "storm" else [],
            dependencies=[]
        )

class ResourceAgent(BaseAgent):
    def evaluate(self, state: dict) -> AgentReport:
        return AgentReport(
            summary="Water pressure and main food vendor supply levels are healthy (88% stock capacity).",
            confidence=0.94,
            evidence=["Vendor inventory registers"],
            recommendations=[],
            dependencies=[]
        )

class SustainabilityAgent(BaseAgent):
    def evaluate(self, state: dict) -> AgentReport:
        return AgentReport(
            summary="Grid power utilization peaks at 840 kW. Carbon emissions optimized through low-power mode presets.",
            confidence=0.96,
            evidence=["Electric smart meters"],
            recommendations=["Switch field lighting to eco mode during intermission"] if state.get("severity") == "low" else [],
            dependencies=[]
        )

class CommunicationAgent(BaseAgent):
    def evaluate(self, state: dict) -> AgentReport:
        return AgentReport(
            summary="Standard public announcements, fan mobile push notifications, and volunteer briefs compiled.",
            confidence=0.95,
            evidence=["Communication channel queues"],
            recommendations=["Broadcast Gate B4 congestion notice to fan apps"] if state.get("severity") in ["high", "critical"] else [],
            dependencies=[]
        )

class PredictionAgent(BaseAgent):
    def evaluate(self, state: dict) -> AgentReport:
        return AgentReport(
            summary="Forecast models indicate crowd congestion at Gate B4 will dissipate in 24 minutes if recommendations are applied.",
            confidence=0.91,
            evidence=["Egress simulation matrices"],
            recommendations=[],
            dependencies=[]
        )

class AnalyticsAgent(BaseAgent):
    def evaluate(self, state: dict) -> AgentReport:
        return AgentReport(
            summary="Matches historical templates (e.g. World Cup 2022 Match 14) showing similar gate pressure patterns.",
            confidence=0.93,
            evidence=["Historical match logs archive"],
            recommendations=[],
            dependencies=[]
        )
