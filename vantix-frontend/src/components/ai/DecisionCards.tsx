import React, { useState } from 'react';
import { 
  MapPin, 
  TrendingUp, 
  Clock, 
  Check, 
  Sliders, 
  X 
} from 'lucide-react';

interface Decision {
  id: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  title: string;
  reason: string;
  impact: string;
  area: string;
  action: string;
  timeRemainingSec: number;
}

const INITIAL_DECISIONS: Decision[] = [
  {
    id: 'dec-101',
    priority: 'CRITICAL',
    title: 'Turnstile Congestion Breach',
    reason: 'Queue capacity at Gate B4 has exceeded 94% threshold. Est queue wait times climbing to 24 mins.',
    impact: 'Reduces local sector bottlenecks by an estimated 25%. Stabilizes check-in times to under 12 mins.',
    area: 'Gate B4 Ticketing concourse',
    action: 'Redistribute 6 volunteer staff from Sector A to Gate B4 turnstiles. Open auxiliary doors.',
    timeRemainingSec: 240,
  },
  {
    id: 'dec-102',
    priority: 'HIGH',
    title: 'Transit Buffer Overflow',
    reason: 'Metro exit terminal congestion spreading to northern gate access zones.',
    impact: 'Prevents entry gate bottleneck build-up. Distributes ingress loading across 3 access lanes.',
    area: 'North Transit Hub',
    action: 'Activate emergency shuttle lane B. Adjust route parameters for Shuttle Line A.',
    timeRemainingSec: 580,
  }
];

export const DecisionCards: React.FC = () => {
  const [decisions, setDecisions] = useState<Decision[]>(INITIAL_DECISIONS);

  const handleAction = (id: string, _actionType: 'approve' | 'reject') => {
    setDecisions(prev => prev.filter(d => d.id !== id));
  };

  return (
    <div className="flex flex-col gap-md select-none">
      {decisions.map((decision) => {
        const isCritical = decision.priority === 'CRITICAL';
        const isHigh = decision.priority === 'HIGH';
        
        let priorityColor = 'text-system-cyan bg-system-cyan/10 border-system-cyan/20';
        let cardBorder = 'border-system-border/60 hover:border-system-border';
        
        if (isCritical) {
          priorityColor = 'text-system-crimson bg-system-crimson/10 border-system-crimson/20 glow-alert animate-strobe';
          cardBorder = 'border-system-crimson/30 hover:border-system-crimson/60 shadow-alert-glow';
        } else if (isHigh) {
          priorityColor = 'text-system-amber bg-system-amber/10 border-system-amber/20';
          cardBorder = 'border-system-amber/30 hover:border-system-amber/60';
        }

        return (
          <div 
            key={decision.id} 
            className={`bg-obsidian-muted/80 border rounded-md p-lg flex flex-col gap-md transition-all duration-200 ${cardBorder}`}
          >
            {/* Header metadata */}
            <div className="flex items-center justify-between border-b border-system-border/40 pb-sm shrink-0">
              <div className="flex items-center gap-sm">
                <span className={`px-sm py-xs font-mono text-[9px] font-bold rounded-2xs border ${priorityColor}`}>
                  {decision.priority}
                </span>
                <span className="text-xs font-semibold text-white">{decision.title}</span>
              </div>
              <div className="flex items-center gap-xs font-mono text-[10px] text-system-mutedText">
                <Clock className="w-3.5 h-3.5 text-system-cyan" />
                <span>EXPIRY:</span>
                <span className="text-white font-bold">{Math.floor(decision.timeRemainingSec / 60)}m left</span>
              </div>
            </div>

            {/* Content stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              {/* Problem/Reason and Suggested Action */}
              <div className="flex flex-col gap-sm">
                <div className="flex flex-col gap-2xs">
                  <span className="font-mono text-[9px] text-system-mutedText uppercase tracking-wider">Observed Condition</span>
                  <p className="text-xs text-white leading-relaxed">{decision.reason}</p>
                </div>
                <div className="flex flex-col gap-2xs">
                  <span className="font-mono text-[9px] text-system-mutedText uppercase tracking-wider">Suggested Operation Command</span>
                  <p className="text-xs text-system-cyan font-medium leading-relaxed">{decision.action}</p>
                </div>
              </div>

              {/* Impact and Area details */}
              <div className="flex flex-col gap-sm border-t md:border-t-0 md:border-l border-system-border/40 pt-md md:pt-0 md:pl-md">
                <div className="flex items-start gap-sm">
                  <TrendingUp className="w-4 h-4 text-system-green shrink-0 mt-[2px]" />
                  <div className="flex flex-col gap-2xs">
                    <span className="font-mono text-[9px] text-system-mutedText uppercase tracking-wider">Estimated Operational Impact</span>
                    <p className="text-xs text-system-mutedText leading-relaxed">{decision.impact}</p>
                  </div>
                </div>

                <div className="flex items-start gap-sm">
                  <MapPin className="w-4 h-4 text-system-cyan shrink-0 mt-[2px]" />
                  <div className="flex flex-col gap-2xs">
                    <span className="font-mono text-[9px] text-system-mutedText uppercase tracking-wider">Affected Area Coordinates</span>
                    <p className="text-xs text-system-mutedText leading-relaxed font-mono">{decision.area}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dispatch Option controls */}
            <div className="flex items-center justify-end gap-sm border-t border-system-border/40 pt-md shrink-0">
              <button 
                onClick={() => handleAction(decision.id, 'reject')}
                className="flex items-center gap-xs px-md py-xs bg-obsidian-elevated hover:bg-obsidian-sub border border-system-border rounded-xs text-[11px] font-mono text-white transition-all active:scale-95"
              >
                <X className="w-3.5 h-3.5 text-system-crimson" />
                <span>Reject</span>
              </button>

              <button className="flex items-center gap-xs px-md py-xs bg-obsidian-elevated hover:bg-obsidian-sub border border-system-border rounded-xs text-[11px] font-mono text-white transition-all active:scale-95">
                <Sliders className="w-3.5 h-3.5 text-system-cyan" />
                <span>Modify Parameters</span>
              </button>

              <button 
                onClick={() => handleAction(decision.id, 'approve')}
                className="flex items-center gap-xs px-md py-xs bg-system-purple hover:bg-system-purple/90 border border-system-purple/40 rounded-xs text-[11px] font-mono text-white font-bold transition-all shadow-ai-glow active:scale-95"
              >
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Approve Action</span>
              </button>
            </div>
          </div>
        );
      })}

      {decisions.length === 0 && (
        <div className="bg-obsidian-muted border border-system-border/60 rounded-md p-xl flex flex-col items-center justify-center gap-sm min-h-[180px]">
          <span className="font-mono text-xs text-system-mutedText uppercase">Queue Cleared</span>
          <span className="text-xs text-white">All pending AI operational decisions have been processed.</span>
        </div>
      )}
    </div>
  );
};
export default DecisionCards;
