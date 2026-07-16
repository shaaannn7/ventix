export interface AICopilotMessage {
  id: string;
  sender: 'ai' | 'user' | 'system';
  content: string;
  timestamp: number;
  executablePlan?: {
    planId: string;
    description: string;
    steps: string[];
    roleRequired: string;
    requiresApproval: boolean;
    approved?: boolean;
  };
}
