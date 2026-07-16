import os
import logging
from typing import Dict, Any

logger = logging.getLogger("VantixGemini")

class GeminiService:
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY")
        self.enabled = self.api_key is not None
        if not self.enabled:
            logger.warning("GEMINI_API_KEY environment variable missing. Running in mock operations mode.")

    def run_prompt(self, system_instruction: str, prompt: str) -> str:
        """
        Executes prompt via Gemini API with safety fallback metrics.
        """
        if not self.enabled:
            return "Mock AI response: Running nominal operational algorithms."

        try:
            import google.generativeai as genai
            genai.configure(api_key=self.api_key)
            model = genai.GenerativeModel(
                model_name="gemini-1.5-flash",
                system_instruction=system_instruction
            )
            response = model.generate_content(prompt)
            return response.text
        except Exception as e:
            logger.error(f"Gemini API call failed: {e}. Falling back to default degradation presets.")
            return "Degraded Mode: Standard operations rulebook applied."

gemini_service = GeminiService()
