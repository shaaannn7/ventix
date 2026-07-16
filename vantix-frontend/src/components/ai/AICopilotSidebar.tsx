import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Cpu, 
  ChevronRight
} from 'lucide-react';
import { useAI } from '@/providers/AIProvider';

export const AICopilotSidebar: React.FC = () => {
  const { chatHistory, addMessage } = useAI();
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const suggestedQuestions = [
    'How is Gate 4 ingress flow affected?',
    'Forecast metro queue waiting times.',
    'Status of medical staff teams.',
  ];

  const recentRecs = [
    { text: 'Deploy 4 volunteers to Gate B turnstiles', confidence: '94%' },
    { text: 'Open emergency lane for Shuttle Line A', confidence: '89%' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add user message
    const userMsg = {
      id: Date.now().toString(),
      sender: 'user' as const,
      content: inputText,
      timestamp: Date.now(),
    };
    addMessage(userMsg);
    setInputText('');
    setIsThinking(true);

    // Simulate AI response
    setTimeout(() => {
      setIsThinking(false);
      const aiMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'ai' as const,
        content: `I have analyzed the stadium telemetry regarding your query. Current observations indicate stable flow parameters. Predictions model zero flow exceptions over the next 15-minute window.`,
        timestamp: Date.now(),
      };
      addMessage(aiMsg);
    }, 1500);
  };

  const handleSuggestedClick = (q: string) => {
    setInputText(q);
  };

  return (
    <aside className="w-[320px] bg-obsidian-muted border-l border-system-border flex flex-col h-full select-none">
      {/* Sidebar Header */}
      <div className="h-[56px] border-b border-system-border flex items-center px-lg justify-between shrink-0">
        <div className="flex items-center gap-sm">
          <Sparkles className="w-4 h-4 text-system-purple glow-purple" />
          <span className="font-sans text-xs font-semibold text-white">Vantix AI Copilot</span>
        </div>
        <div className="flex items-center gap-xs">
          <Cpu className="w-3.5 h-3.5 text-system-mutedText" />
          <span className="font-mono text-[9px] text-system-mutedText uppercase">Active Mode</span>
        </div>
      </div>

      {/* Main Chat History Workspace */}
      <div className="flex-1 overflow-y-auto p-md space-y-md scrollbar-none">
        {chatHistory.map((msg) => {
          const isAI = msg.sender === 'ai';
          return (
            <div 
              key={msg.id} 
              className={`flex flex-col gap-xs ${isAI ? 'items-start' : 'items-end'}`}
            >
              {/* Message Header */}
              <span className="font-mono text-[8px] text-system-mutedText uppercase px-[4px]">
                {msg.sender} // {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
              
              {/* Bubble Body */}
              <div className={`max-w-[85%] rounded-xs p-sm text-xs font-sans leading-relaxed border ${
                isAI 
                  ? 'bg-obsidian-elevated border-system-border text-white shadow-ai-glow' 
                  : 'bg-system-purple/10 border-system-purple/20 text-white'
              }`}>
                {msg.content}
              </div>
            </div>
          );
        })}

        {/* AI Thinking Animation */}
        {isThinking && (
          <div className="flex flex-col gap-xs items-start">
            <span className="font-mono text-[8px] text-system-mutedText uppercase px-[4px]">
              AI // Thinking...
            </span>
            <div className="flex items-center gap-2xs bg-obsidian-elevated border border-system-border rounded-xs px-md py-sm shadow-ai-glow">
              <span className="w-1.5 h-1.5 bg-system-purple rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-system-purple rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-system-purple rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>

      {/* Suggested Questions Drawer */}
      <div className="px-md py-xs border-t border-system-border bg-obsidian-elevated/10 shrink-0">
        <span className="font-mono text-[8px] text-system-mutedText uppercase tracking-wider block pb-2xs">Suggested Queries</span>
        <div className="space-y-[4px]">
          {suggestedQuestions.map((q, i) => (
            <button 
              key={i}
              onClick={() => handleSuggestedClick(q)}
              className="w-full text-left font-sans text-[10px] text-system-cyan hover:text-white bg-obsidian-elevated/40 hover:bg-obsidian-sub border border-system-border/40 hover:border-system-cyan/30 px-sm py-xs rounded-2xs transition-all flex items-center justify-between"
            >
              <span>{q}</span>
              <ChevronRight className="w-3 h-3 text-system-mutedText" />
            </button>
          ))}
        </div>
      </div>

      {/* Live AI Recommendations Info */}
      <div className="px-md py-xs border-t border-system-border bg-obsidian-elevated/20 shrink-0">
        <span className="font-mono text-[8px] text-system-mutedText uppercase tracking-wider block pb-2xs">Active Decision Feed</span>
        <div className="space-y-xs">
          {recentRecs.map((rec, i) => (
            <div key={i} className="flex items-center justify-between font-sans text-[10px] border-b border-system-border/30 pb-xs">
              <span className="text-white truncate pr-md">{rec.text}</span>
              <span className="shrink-0 font-mono font-bold text-system-purple">{rec.confidence} confidence</span>
            </div>
          ))}
        </div>
      </div>

      {/* Search Ask Input Field */}
      <div className="p-md border-t border-system-border bg-obsidian-muted shrink-0">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask AI Copilot anything..."
            className="w-full h-sm pl-md pr-xl py-sm bg-obsidian-elevated border border-system-border rounded-xs text-xs text-white placeholder-system-mutedText focus:outline-none focus:border-system-purple"
          />
          <button 
            type="submit"
            className="absolute right-sm top-1/2 -translate-y-1/2 text-system-mutedText hover:text-system-purple transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </aside>
  );
};
export default AICopilotSidebar;
