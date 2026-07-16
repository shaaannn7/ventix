import os
import json
from typing import Dict, Any, Optional
from app.schemas.api import AgentReport, CommanderPlan

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data")
STORE_FILE = os.path.join(DATA_DIR, "simulations.json")

class StatePersistence:
    def __init__(self):
        os.makedirs(DATA_DIR, exist_ok=True)
        if not os.path.exists(STORE_FILE):
            with open(STORE_FILE, "w") as f:
                json.dump({}, f)

    def _read_raw(self) -> dict:
        try:
            with open(STORE_FILE, "r") as f:
                return json.load(f)
        except Exception:
            return {}

    def _write_raw(self, data: dict):
        try:
            with open(STORE_FILE, "w") as f:
                json.dump(data, f, indent=2)
        except Exception:
            pass

    def get(self, sim_id: str) -> Optional[dict]:
        raw_store = self._read_raw()
        state = raw_store.get(sim_id)
        if not state:
            return None

        # Deserialize Pydantic models back from dicts
        if "agent_reports" in state and state["agent_reports"]:
            state["agent_reports"] = {
                k: AgentReport.model_validate(v) if isinstance(v, dict) else v
                for k, v in state["agent_reports"].items()
            }
        if "commander_plan" in state and state["commander_plan"] and isinstance(state["commander_plan"], dict):
            state["commander_plan"] = CommanderPlan.model_validate(state["commander_plan"])
        
        return state

    def set(self, sim_id: str, state: dict):
        raw_store = self._read_raw()
        
        # Serialize state to raw dict for JSON storage
        state_copy = dict(state)
        if "agent_reports" in state_copy and state_copy["agent_reports"]:
            state_copy["agent_reports"] = {
                k: v.model_dump() if hasattr(v, "model_dump") else v
                for k, v in state_copy["agent_reports"].items()
            }
        if "commander_plan" in state_copy and state_copy["commander_plan"] and hasattr(state_copy["commander_plan"], "model_dump"):
            state_copy["commander_plan"] = state_copy["commander_plan"].model_dump()

        raw_store[sim_id] = state_copy
        self._write_raw(raw_store)

persistence_store = StatePersistence()
