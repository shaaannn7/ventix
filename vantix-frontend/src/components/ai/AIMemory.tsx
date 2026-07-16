import React from 'react';
import { 
  History, 
  CheckCircle2, 
  XCircle, 
  TrendingUp,
  Award
} from 'lucide-react';

const MEMORY_ITEMS = [
  { id: 'mem-1', action: 'Reallocate 8 staff to Gate C turnstiles', outcome: 'SUCCESS', details: 'Wait times reduced by 14 mins. Flow rate stabilized.', date: '35 mins ago' },
  { id: 'mem-2', action: 'Activate emergency shuttle lane A', outcome: 'SUCCESS', details: 'Cleared northern terminal congestion spike.', date: '1 hr ago' },
  { id: 'mem-3', action: 'Redirect Parking Lot B traffic', outcome: 'SUCCESS', details: 'Arterial road queues cleared. Average vehicle speed normal.', date: '2 hrs ago' },
  { id: 'mem-4', action: 'Lockdown auxiliary gate 3B', outcome: 'ABORTED', details: 'Operator manual override: Gate unlocked after verification.', date: '4 hrs ago' },
];

export const AIMemory: React.FC = () => {
  return (
    <div className="bg-obsidian-muted border border-system-border rounded-md p-lg select-none shadow-high flex flex-col gap-md">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-system-border/50 pb-sm shrink-0">
        <div className="flex items-center gap-xs">
          <History className="w-4 h-4 text-system-purple" />
          <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">AI Operations Memory & Audit Log</span>
        </div>
        <div className="flex items-center gap-xs text-system-green font-mono text-[10px]">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>SUCCESS RATE: 94.8%</span>
        </div>
      </div>

      {/* Grid containing success stats and scroll log */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-md items-start">
        {/* Left side success metrics */}
        <div className="md:col-span-4 bg-obsidian-elevated/40 border border-system-border/60 rounded-xs p-md flex flex-col items-center justify-center text-center gap-xs min-h-[140px]">
          <Award className="w-8 h-8 text-system-purple glow-purple animate-pulse" />
          <span className="font-mono text-[9px] text-system-mutedText uppercase">Verified Outcomes</span>
          <span className="font-mono text-xl font-bold text-white">41 / 43</span>
          <span className="text-[10px] text-system-mutedText">actions completed successfully</span>
        </div>

        {/* Right side scrollable historical logs */}
        <div className="md:col-span-8 flex flex-col gap-sm max-h-[220px] overflow-y-auto pr-xs custom-scrollbar">
          {MEMORY_ITEMS.map((item) => {
            const isSuccess = item.outcome === 'SUCCESS';
            const outcomeColor = isSuccess ? 'text-system-green bg-system-green/10 border-system-green/20' : 'text-system-mutedText bg-obsidian-sub border-system-border';
            
            return (
              <div 
                key={item.id} 
                className="bg-obsidian-elevated/20 border border-system-border/60 rounded-xs p-sm flex items-start gap-md hover:border-system-border/80 transition-colors"
              >
                {isSuccess ? (
                  <CheckCircle2 className="w-4 h-4 text-system-green shrink-0 mt-[2px]" />
                ) : (
                  <XCircle className="w-4 h-4 text-system-mutedText shrink-0 mt-[2px]" />
                )}
                
                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex items-center justify-between gap-sm">
                    <span className="text-xs font-semibold text-white truncate pr-md">{item.action}</span>
                    <span className={`px-2xs py-[1px] font-mono text-[8px] font-bold rounded-2xs border ${outcomeColor}`}>
                      {item.outcome}
                    </span>
                  </div>
                  <span className="text-[10px] text-system-mutedText font-mono pt-[2px]">{item.details}</span>
                  <span className="text-[8px] text-system-mutedText font-mono pt-[2px]">{item.date}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default AIMemory;
