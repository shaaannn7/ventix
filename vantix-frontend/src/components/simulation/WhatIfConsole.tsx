import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  HelpCircle, 
  TrendingDown, 
  Clock, 
  AlertTriangle 
} from 'lucide-react';

interface SimulationResult {
  question: string;
  prediction: string;
  affectedFans: string;
  queueDiff: string;
  recoveryTime: string;
  cost: string;
}

export const WhatIfConsole: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [activeResult, setActiveResult] = useState<SimulationResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsSimulating(true);
    setActiveResult(null);

    // Simulate model synthesis latency
    setTimeout(() => {
      setIsSimulating(false);
      setActiveResult({
        question: inputText,
        prediction: `Simulation maps standard bottlenecks in adjacent sectors. Rerouting traffic from the target node pushes local concourse volumes to 84% capacity. Estimated queue spikes form within 12 minutes.`,
        affectedFans: '1,850 fans',
        queueDiff: '+14 mins wait time',
        recoveryTime: '18 mins total recovery',
        cost: '+$1,200 operating cost',
      });
    }, 1800);
  };

  return (
    <div className="bg-obsidian-muted border border-system-border rounded-md p-lg select-none shadow-high flex flex-col gap-md relative overflow-hidden">
      {/* Background highlight */}
      <div className="absolute top-0 right-0 w-[140px] h-[140px] bg-system-purple/5 blur-[35px] pointer-events-none rounded-full" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-system-border/50 pb-sm shrink-0">
        <div className="flex items-center gap-xs">
          <HelpCircle className="w-4 h-4 text-system-purple" />
          <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">What-If Lab Input Console</span>
        </div>
        <span className="font-mono text-[9px] text-system-purple animate-pulse">LAB_ACTIVE</span>
      </div>

      {/* Input console */}
      <form onSubmit={handleSubmit} className="relative">
        <input 
          type="text" 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="What happens if Gate 4 closes during heavy rain?..."
          className="w-full h-sm pl-md pr-xl py-sm bg-obsidian-elevated border border-system-border rounded-xs text-xs text-white placeholder-system-mutedText focus:outline-none focus:border-system-purple"
        />
        <button 
          type="submit"
          className="absolute right-sm top-1/2 -translate-y-1/2 text-system-mutedText hover:text-system-purple transition-colors"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* Output simulation cards */}
      {isSimulating && (
        <div className="bg-obsidian-elevated/40 border border-system-border/60 rounded-xs p-xl flex flex-col items-center justify-center gap-xs min-h-[160px] animate-pulse">
          <span className="w-5 h-5 bg-system-purple rounded-full animate-ping" />
          <span className="font-mono text-[10px] text-system-purple uppercase">Synthesizing Simulation Models...</span>
        </div>
      )}

      {activeResult && !isSimulating && (
        <div className="border border-system-purple/35 bg-system-purple/[0.02] rounded-xs p-md flex flex-col gap-sm animate-fadeIn">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-system-border/30 pb-xs">
            <span className="font-mono text-[9px] text-system-purple font-bold uppercase tracking-wider">Simulation Output</span>
            <div className="flex items-center gap-xs font-mono text-[9px] text-system-cyan">
              <Sparkles className="w-3.5 h-3.5" />
              <span>95.8% Prediction Conf</span>
            </div>
          </div>

          <p className="text-xs text-white leading-relaxed">{activeResult.prediction}</p>

          {/* Core impact metrics */}
          <div className="grid grid-cols-2 gap-sm border-t border-system-border/20 pt-sm text-[10px] font-mono">
            <div className="flex items-center gap-xs text-system-mutedText">
              <TrendingDown className="w-3.5 h-3.5 text-system-purple" />
              <span>Queue Delta:</span>
              <span className="text-white font-bold">{activeResult.queueDiff}</span>
            </div>
            <div className="flex items-center gap-xs text-system-mutedText">
              <Clock className="w-3.5 h-3.5 text-system-cyan" />
              <span>Recovery:</span>
              <span className="text-white font-bold">{activeResult.recoveryTime}</span>
            </div>
          </div>
        </div>
      )}

      {!activeResult && !isSimulating && (
        <div className="bg-obsidian-elevated/20 border border-system-border/60 rounded-xs p-xl flex flex-col items-center justify-center gap-xs min-h-[160px]">
          <AlertTriangle className="w-5 h-5 text-system-mutedText" />
          <span className="font-mono text-[10px] text-system-mutedText uppercase">Console Idle</span>
          <span className="text-[11px] text-system-mutedText">Enter a scenario query to build predictive models.</span>
        </div>
      )}
    </div>
  );
};
export default WhatIfConsole;
