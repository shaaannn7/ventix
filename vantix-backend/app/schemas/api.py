from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional

class AgentReport(BaseModel):
    summary: str = Field(..., description="Summary of evaluation")
    confidence: float = Field(..., description="Confidence score between 0.0 and 1.0")
    evidence: List[str] = Field(default_factory=list, description="Checked evidence items")
    recommendations: List[str] = Field(default_factory=list, description="Actionable recommendations")
    dependencies: List[str] = Field(default_factory=list, description="Other agent dependencies")

class CommanderPlan(BaseModel):
    overall_health: int = Field(94, description="Stadium overall health percentage")
    risk_score: float = Field(..., description="Calculated overall risk metric")
    prioritized_actions: List[Dict[str, Any]] = Field(..., description="Rerouting or dispatch cards")
    agent_reports: Dict[str, AgentReport] = Field(..., description="Consolidated sub-agent outputs")

class HumanApprovalRequest(BaseModel):
    decision_id: str
    action_type: str  # e.g., 'open_gate', 'dispatch_medics'
    params: Dict[str, Any]
    reasoning: str

class OperatorFeedback(BaseModel):
    decision_id: str
    approved: bool
    modified_params: Optional[Dict[str, Any]] = None
    operator_notes: Optional[str] = None
