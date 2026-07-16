import React, { createContext, useContext, useState } from 'react';
import type { AICopilotMessage } from '@/types/ai';

interface AIContextProps {
  chatHistory: AICopilotMessage[];
  addMessage: (msg: AICopilotMessage) => void;
  clearHistory: () => void;
}

const AIContext = createContext<AIContextProps | undefined>(undefined);

export const AIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [chatHistory, setChatHistory] = useState<AICopilotMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      content: 'Vantix AI operational reasoning system initialized.',
      timestamp: Date.now(),
    }
  ]);

  const addMessage = (msg: AICopilotMessage) => setChatHistory((prev) => [...prev, msg]);
  const clearHistory = () => setChatHistory([]);

  return (
    <AIContext.Provider value={{ chatHistory, addMessage, clearHistory }}>
      {children}
    </AIContext.Provider>
  );
};

export const useAI = () => {
  const context = useContext(AIContext);
  if (!context) throw new Error('useAI must be used within an AIProvider');
  return context;
};
