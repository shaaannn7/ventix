import React, { useState } from 'react';
import Sidebar from '@/components/navigation/Sidebar';
import TopBar from '@/components/navigation/TopBar';
import BottomTelemetryBar from '@/components/navigation/BottomTelemetryBar';
import AICopilotSidebar from '@/components/ai/AICopilotSidebar';
import AuraFAB from '@/components/ai/AuraFAB';
import { 
  Send, 
  Smartphone,
  ChevronRight
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: number;
}

const FanAssistant: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', sender: 'assistant', text: 'Welcome to Estadio Azteca! I am your AI Fan Assistant. Ask me about concession stand queues, restroom locations, parking shuttle ETAs, or route guides.', timestamp: Date.now() },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const suggestedQueries = [
    'How long is the queue at Gate E concessions?',
    'What is the shortest walking route to Section 104?',
    'Where is the nearest shuttle line terminus?',
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      let reply = 'I have queried the arena telemetry feed. Wait times at nearby concessions are stable under 4 minutes. Let me know if you need specific directions.';
      
      if (text.includes('Gate E')) {
        reply = 'Gate E concessions currently have a queue of approximately 14 people with a wait time of 6 minutes. Sector D stands are currently faster at 2 minutes wait.';
      } else if (text.includes('Section 104')) {
        reply = 'To reach Section 104 from your location, walk past Concourse corridor B4, take the western stairs up to Level 2, and enter tunnel 12. Estimated walking time is 3 minutes.';
      } else if (text.includes('shuttle') || text.includes('transit')) {
        reply = 'Shuttle Line A and Line B are active at the outer parking terminus. Line A is running at high frequency (next departure in 2 mins). Path routing is highlighted on your stadium guide.';
      }

      const assistantMsg: ChatMessage = {
        id: `m-${Date.now() + 1}`,
        sender: 'assistant',
        text: reply,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, assistantMsg]);
    }, 1200);
  };

  const currentSatisfaction = '94.2%';
  const avgConcessionWait = '4.5m';
  const nextShuttleETA = '2 mins';

  return (
    <div className="flex flex-col h-screen w-screen bg-obsidian text-white overflow-hidden font-sans select-none">
      <TopBar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main id="main" className="flex-1 overflow-y-auto p-md space-y-md flex flex-col scrollbar-none">
          
          {/* Header */}
          <div className="flex flex-col gap-2xs">
            <span className="font-mono text-xs text-system-cyan uppercase tracking-widest font-semibold">
              Visitor Experience Hub
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-white font-sans sm:text-3xl">
              AI Fan Assistant
            </h1>
            <p className="text-xs text-system-mutedText">
              Monitor visitor support telemetry, concessional flows, and coordinate mobile app assistant responses.
            </p>
          </div>

          {/* Fan KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm flex flex-col gap-2xs">
              <span className="text-[10px] text-system-mutedText uppercase font-mono">Mobile App Users</span>
              <span className="text-lg font-bold text-white tracking-wide">64,250 Active</span>
            </div>
            <div className="bg-obsidian-muted border border-system-cyan/30 rounded-xs p-sm flex flex-col gap-2xs shadow-glow">
              <span className="text-[10px] text-system-mutedText uppercase font-mono">App Satisfaction</span>
              <span className="text-lg font-bold text-system-cyan tracking-wide">{currentSatisfaction}</span>
            </div>
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm flex flex-col gap-2xs">
              <span className="text-[10px] text-system-mutedText uppercase font-mono">Avg Concession Wait</span>
              <span className="text-lg font-bold text-system-purple tracking-wide">{avgConcessionWait}</span>
            </div>
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm flex flex-col gap-2xs">
              <span className="text-[10px] text-system-mutedText uppercase font-mono">Next Shuttle ETA</span>
              <span className="text-lg font-bold text-system-green tracking-wide">{nextShuttleETA}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-md items-stretch">
            {/* Left Box: Mock Mobile App Chat simulator (7 cols) */}
            <div className="lg:col-span-7 bg-obsidian-muted border border-system-border rounded-md p-lg flex flex-col justify-between min-h-[380px]">
              <div className="flex items-center justify-between border-b border-system-border/50 pb-sm shrink-0">
                <div className="flex items-center gap-xs">
                  <Smartphone className="w-4 h-4 text-system-cyan" />
                  <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">Mobile Assistant Live Simulator</span>
                </div>
                <span className="font-mono text-[9px] text-system-green animate-pulse">USER_CONNECTED</span>
              </div>

              {/* Chat messages viewport */}
              <div className="flex-1 overflow-y-auto my-md space-y-md scrollbar-none max-h-[220px] pr-xs">
                {messages.map((msg) => {
                  const isAssistant = msg.sender === 'assistant';
                  return (
                    <div 
                      key={msg.id} 
                      className={`flex flex-col gap-xs ${isAssistant ? 'items-start' : 'items-end'}`}
                    >
                      <span className="font-mono text-[8px] text-system-mutedText uppercase px-[4px]">
                        {msg.sender === 'assistant' ? 'AI Assistant' : 'Stadium Guest'} // {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </span>
                      <div className={`max-w-[85%] rounded-xs p-sm text-xs font-sans leading-relaxed border ${
                        isAssistant 
                          ? 'bg-obsidian-elevated border-system-border text-white shadow-glow' 
                          : 'bg-system-cyan/15 border-system-cyan/30 text-white'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  );
                })}
                {isTyping && (
                  <div className="flex flex-col gap-xs items-start animate-pulse">
                    <span className="font-mono text-[8px] text-system-mutedText uppercase px-[4px]">AI Assistant // Typing...</span>
                    <div className="px-md py-sm bg-obsidian-elevated border border-system-border rounded-xs text-xs text-white">
                      Searching local database...
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input form */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputText);
                }} 
                className="relative shrink-0"
              >
                <input 
                  type="text" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask mobile fan assistant..."
                  className="w-full h-sm pl-md pr-xl py-sm bg-obsidian-elevated border border-system-border rounded-xs text-xs text-white placeholder-system-mutedText focus:outline-none focus:border-system-cyan"
                />
                <button 
                  type="submit"
                  className="absolute right-sm top-1/2 -translate-y-1/2 text-system-mutedText hover:text-system-cyan transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            {/* Right Box: Quick Prompts (5 cols) */}
            <div className="lg:col-span-5 bg-obsidian-muted border border-system-border rounded-md p-lg flex flex-col gap-md">
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">Suggested Guest Queries</span>
              <p className="text-[11px] text-system-mutedText">
                Test how the AI model routes specific guest inquiries by selecting pre-compiled templates:
              </p>
              <div className="space-y-[6px]">
                {suggestedQueries.map((q, i) => (
                  <button 
                    key={i}
                    onClick={() => handleSend(q)}
                    className="w-full text-left font-sans text-xs text-system-cyan hover:text-white bg-obsidian-elevated/40 hover:bg-obsidian-sub border border-system-border/40 hover:border-system-cyan/30 px-sm py-sm rounded-xs transition-all flex items-center justify-between"
                  >
                    <span>{q}</span>
                    <ChevronRight className="w-4 h-4 text-system-mutedText" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
        <AICopilotSidebar />
      </div>
      <BottomTelemetryBar />
      <AuraFAB />
    </div>
  );
};

export default FanAssistant;
