import React from 'react';
import { 
  Sparkles, 
  ChevronRight 
} from 'lucide-react';
import { useAI } from '@/providers/AIProvider';

const QUICK_PROMPTS = [
  'Summarize Stadium Status',
  'Predict Queue bottleneck next hour',
  'Audit current operations risks',
  'Optimize volunteer staff allocation',
  'Forecast transport terminal congestion',
  'Medical readiness verification log',
];

export const QuickPrompts: React.FC = () => {
  const { addMessage } = useAI();

  const handlePromptClick = (prompt: string) => {
    // Add user message
    const userMsg = {
      id: Date.now().toString(),
      sender: 'user' as const,
      content: prompt,
      timestamp: Date.now(),
    };
    addMessage(userMsg);

    // Simulate AI response
    setTimeout(() => {
      const aiMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'ai' as const,
        content: `Executing operations checklist command: [${prompt}]. Analysis models return standard parameters. No exceptions flagged.`,
        timestamp: Date.now(),
      };
      addMessage(aiMsg);
    }, 1000);
  };

  return (
    <div className="bg-obsidian-muted border border-system-border rounded-md p-lg select-none shadow-high flex flex-col gap-md">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-system-border/50 pb-sm shrink-0">
        <div className="flex items-center gap-xs">
          <Sparkles className="w-4 h-4 text-system-purple" />
          <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">Quick AI Prompts</span>
        </div>
        <span className="font-mono text-[9px] text-system-mutedText">Instant telemetry reporting</span>
      </div>

      {/* Button grids */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-sm">
        {QUICK_PROMPTS.map((prompt, index) => (
          <button 
            key={index}
            onClick={() => handlePromptClick(prompt)}
            className="flex items-center justify-between px-md py-sm bg-obsidian-elevated/40 hover:bg-obsidian-sub border border-system-border/60 hover:border-system-cyan/30 rounded-xs font-sans text-xs text-white hover:text-system-cyan transition-all duration-150 active:scale-98"
          >
            <span className="text-left font-medium truncate pr-sm">{prompt}</span>
            <ChevronRight className="w-3.5 h-3.5 text-system-mutedText shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
};
export default QuickPrompts;
