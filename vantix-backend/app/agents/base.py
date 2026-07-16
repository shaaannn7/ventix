import abc
from app.schemas.api import AgentReport

class BaseAgent(abc.ABC):
    def __init__(self, name: str):
        self.name = name

    @abc.abstractmethod
    def evaluate(self, state: dict) -> AgentReport:
        """
        Evaluate the active stadium telemetry status and produce a formatted agent report.
        """
        pass
