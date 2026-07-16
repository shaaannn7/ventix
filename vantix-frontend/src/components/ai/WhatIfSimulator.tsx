import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronRight, 
  AlertTriangle, 
  TrendingDown
} from 'lucide-react';

interface Scenario {
  question: string;
  prediction: string;
  impact: string;
  riskClass: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

const SCENARIOS: Record<string, Scenario> = {
  gate: {
    question: 'What happens if Gate B4 closes?',
    prediction: 'Closing Gate B4 turnstiles immediately reroutes 1,400 incoming fans to Gates B2 and B6. Crowd density at Gate B2 concourse is predicted to reach a critical 4.2 people/m² within 9 minutes.',
    impact: 'Average entry wait times climb from 12 mins to 28 mins in Zone B. Volunteer reallocations required.',
    riskClass: 'CRITICAL',
  },
  rain: {
    question: 'What if heavy rain begins?',
    prediction: 'Precipitation reduces pedestrian movement speeds by 15%. Security scanning times increase due to wet ticketing documents and umbrellas.',
    impact: 'Queue buffer lanes expand. Gate entry capacities drop by 8%. Recommendation: deploy shelter awnings.',
    riskClass: 'MEDIUM',
  },
  train: {
    question: 'What if Metro Line 1 experiences a 10-minute delay?',
    prediction: 'Transit delays hold back approximately 2,200 fans scheduled to arrive for matches. Egress operations will face compressed arrival rushes post-game.',
    impact: 'Shuttle schedules must be extended to balance local congestion waves.',
    riskClass: 'HIGH',
  },
  parking: {
    question: 'What if Parking Lot C reaches 100% capacity?',
    prediction: 'Incoming vehicle parking queues overflow into main arterial roads, creating traffic bottlenecks at Zone C gates.',
    impact: 'Average shuttle transit times to stadium increase by 6 minutes. Recommendation: redirect to Lot E.',
    riskClass: 'MEDIUM',
  }
};

export const WhatIfSimulator: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);

  const triggerScenario = (key: keyof typeof SCENARIOS) => {
    setActiveScenario(SCENARIOS[key]);
  };

  return (
    <div className="bg-obsidian-muted border border-system-border rounded-md p-lg select-none shadow-high relative overflow-hidden flex flex-col gap-md">
      {/* Background highlighting */}
      <div className="absolute top-0 right-0 w-[140px] h-[140px] bg-system-purple/5 blur-[35px] pointer-events-none rounded-full" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-system-border/50 pb-sm shrink-0">
        <div className="flex items-center gap-xs">
          <HelpCircle className="w-4 h-4 text-system-purple" />
          <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">What-If Prediction Simulator</span>
        </div>
        <span className="font-mono text-[9px] text-system-cyan">PREDICTION_ENGINE_READY</span>
      </div>

      {/* Quick Action Scenario buttons */}
      <div className="grid grid-cols-2 gap-sm shrink-0">
        <button 
          onClick={() => triggerScenario('gate')}
          className="flex items-center justify-between px-sm py-xs bg-obsidian-elevated/60 hover:bg-obsidian-sub border border-system-border rounded-xs font-sans text-xs text-white hover:text-system-purple transition-all"
        >
          <span>Gate B4 Closes</span>
          <ChevronRight className="w-3.5 h-3.5 text-system-mutedText" />
        </button>

        <button 
          onClick={() => triggerScenario('rain')}
          className="flex items-center justify-between px-sm py-xs bg-obsidian-elevated/60 hover:bg-obsidian-sub border border-system-border rounded-xs font-sans text-xs text-white hover:text-system-purple transition-all"
        >
          <span>Weather: Rain Storm</span>
          <ChevronRight className="w-3.5 h-3.5 text-system-mutedText" />
        </button>

        <button 
          onClick={() => triggerScenario('train')}
          className="flex items-center justify-between px-sm py-xs bg-obsidian-elevated/60 hover:bg-obsidian-sub border border-system-border rounded-xs font-sans text-xs text-white hover:text-system-purple transition-all"
        >
          <span>Metro Line Delay</span>
          <ChevronRight className="w-3.5 h-3.5 text-system-mutedText" />
        </button>

        <button 
          onClick={() => triggerScenario('parking')}
          className="flex items-center justify-between px-sm py-xs bg-obsidian-elevated/60 hover:bg-obsidian-sub border border-system-border rounded-xs font-sans text-xs text-white hover:text-system-purple transition-all"
        >
          <span>Parking Lot C Full</span>
          <ChevronRight className="w-3.5 h-3.5 text-system-mutedText" />
        </button>
      </div>

      {/* Active prediction card */}
      {activeScenario ? (
        <div className="border border-system-purple/20 bg-system-purple/[0.02] rounded-xs p-md flex flex-col gap-sm animate-fadeIn">
          {/* Scenario title */}
          <div className="flex items-center justify-between border-b border-system-border/30 pb-xs">
            <span className="font-mono text-[9px] text-system-purple uppercase font-bold tracking-wider">Simulation Output</span>
            <span className={`px-sm py-[2px] font-mono text-[8px] font-bold rounded-2xs border ${
              activeScenario.riskClass === 'CRITICAL' 
                ? 'text-system-crimson bg-system-crimson/10 border-system-crimson/20' 
                : activeScenario.riskClass === 'HIGH'
                ? 'text-system-amber bg-system-amber/10 border-system-amber/20'
                : 'text-system-cyan bg-system-cyan/10 border-system-cyan/20'
            }`}>
              RISK: {activeScenario.riskClass}
            </span>
          </div>

          <p className="text-xs text-white leading-relaxed">{activeScenario.prediction}</p>

          <div className="flex items-start gap-sm border-t border-system-border/20 pt-sm">
            <TrendingDown className="w-4 h-4 text-system-purple shrink-0 mt-[2px]" />
            <div className="flex flex-col gap-2xs">
              <span className="font-mono text-[9px] text-system-mutedText uppercase">Operational Consequences</span>
              <p className="text-xs text-system-mutedText leading-relaxed">{activeScenario.impact}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-obsidian-elevated/20 border border-system-border/60 rounded-xs p-xl flex flex-col items-center justify-center gap-xs min-h-[140px]">
          <AlertTriangle className="w-5 h-5 text-system-mutedText" />
          <span className="font-mono text-[10px] text-system-mutedText uppercase">Simulation Idle</span>
          <span className="text-[11px] text-system-mutedText">Select a scenario above to model prediction impacts.</span>
        </div>
      )}
    </div>
  );
};
export default WhatIfSimulator;
