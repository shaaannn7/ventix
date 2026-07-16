import React from 'react';
import { 
  Sparkles, 
  Check, 
  X, 
  TrendingUp 
} from 'lucide-react';

export const MissionCommander: React.FC = () => {
  const recommendationSteps = [
    'Open Gate C auxiliary turnstiles immediately.',
    'Deploy 4 volunteer dispatch staff from Zone A to Gate C.',
    'Redirect transit shuttles arriving at Lot C to parking Lot E.',
    'Broadcast real-time mobile app alert with path guidelines to incoming fans.',
  ];

  return (
    <div className="bg-gradient-to-br from-obsidian-muted to-obsidian border border-system-purple/30 rounded-md p-lg select-none shadow-high relative overflow-hidden flex flex-col gap-md">
      {/* Glow highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(168,85,247,0.06),transparent)] pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-system-border/50 pb-sm shrink-0">
        <div className="flex items-center gap-sm">
          <div className="w-[10px] h-[10px] bg-system-purple rounded-full glow-purple animate-strobe" />
          <Sparkles className="w-4 h-4 text-system-purple" />
          <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">Mission Commander Recommendation</span>
        </div>
        
        <div className="flex items-center gap-md">
          <div className="flex items-center gap-xs font-mono text-[10px] text-system-mutedText">
            <TrendingUp className="w-3.5 h-3.5 text-system-green" />
            <span>CONFIDENCE:</span>
            <span className="text-system-purple font-bold">95.4%</span>
          </div>
          <span className="font-mono text-[9px] bg-system-purple/10 border border-system-purple/20 text-system-purple px-2xs py-[1px] rounded-2xs uppercase">
            ORCHESTRATED_DRAFT
          </span>
        </div>
      </div>

      {/* Recommendation overview */}
      <div className="flex-1 flex flex-col gap-sm">
        <div className="flex flex-col gap-2xs">
          <span className="font-mono text-[9px] text-system-mutedText uppercase tracking-wider">Active Command Action Plan</span>
          <span className="text-sm font-semibold text-white">Execute coordinated crowd flow optimization paths at Gate C.</span>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-xs">
          <span className="font-mono text-[9px] text-system-mutedText uppercase tracking-wider">Operations Steps</span>
          <div className="space-y-sm">
            {recommendationSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-sm bg-obsidian-elevated/40 border border-system-border/60 rounded-xs p-sm">
                <span className="font-mono text-xs text-system-purple font-bold shrink-0">{index + 1}.</span>
                <p className="text-xs text-white leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-end gap-sm border-t border-system-border/40 pt-md shrink-0">
        <button className="flex items-center gap-xs px-md py-xs bg-obsidian-elevated hover:bg-obsidian-sub border border-system-border rounded-xs text-[11px] font-mono text-white transition-all active:scale-95">
          <X className="w-3.5 h-3.5 text-system-crimson" />
          <span>Dismiss Plan</span>
        </button>

        <button className="flex items-center gap-xs px-md py-xs bg-system-purple hover:bg-system-purple/90 border border-system-purple/40 rounded-xs text-[11px] font-mono text-white font-bold transition-all shadow-ai-glow active:scale-95">
          <Check className="w-3.5 h-3.5 text-white" />
          <span>Execute Orchestration Plan</span>
        </button>
      </div>
    </div>
  );
};
export default MissionCommander;
