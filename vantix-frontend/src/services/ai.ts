import { apiClient } from '@/lib/axios';
import { ENDPOINTS } from '@/config/endpoints';
import type { AICopilotMessage } from '@/types/ai';

export const AIService = {
  sendPrompt: async (prompt: string, context?: unknown): Promise<AICopilotMessage> => {
    const res = await apiClient.post(ENDPOINTS.ai.chat, { prompt, context });
    return res.data;
  },
  triggerActionPlan: async (planId: string): Promise<boolean> => {
    const res = await apiClient.post(ENDPOINTS.ai.actionPlan, { planId });
    return res.data.success;
  },
};
