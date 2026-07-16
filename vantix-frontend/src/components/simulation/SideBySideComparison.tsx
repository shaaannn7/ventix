import React from 'react';
import { 
  Activity 
} from 'lucide-react';

interface CompareMetric {
  label: string;
  current: string;
  simulated: string;
  diff: string;
  state: 'neutral' | 'better' | 'worse';
}

const COMPARE_METRICS: CompareMetric[] = [
  { label: 'Avg Ingress Wait', current: '12 mins', simulated: '28 mins', diff: '+16 mins', state: 'worse' },
  { label: 'Gate B4 Density', current: '1.4 p/m²', simulated: '3.6 p/m²', diff: '+2.2 p/m²', state: 'worse' },
  { label: 'Staff Load Index', current: 'Nominal', simulated: 'STRETCHED', diff: '+12 staff', state: 'worse' },
  { label: 'Metro Inflow Rate', current: '45 scans/min', simulated: '88 scans/min', diff: '+43 scans/min', state: 'neutral' },
];

export const SideBySideComparison: React.FC = () => {
  return (
    <div className="bg-obsidian-muted border border-system-border rounded-md p-lg select-none shadow-high flex flex-col gap-md">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-system-border/50 pb-sm shrink-0">
        <div className="flex items-center gap-xs">
          <Activity className="w-4 h-4 text-system-cyan" />
          <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">Operational Comparison HUD</span>
        </div>
        <span className="font-mono text-[9px] text-system-mutedText">Current vs simulated state</span>
      </div>

      {/* Grid Comparison */}
      <div className="space-y-sm">
        {COMPARE_METRICS.map((metric, index) => {
          const isWorse = metric.state === 'worse';
          const diffColor = isWorse ? 'text-system-crimson font-bold' : 'text-system-cyan';

          return (
            <div 
              key={index} 
              className="bg-obsidian-elevated/40 border border-system-border/60 rounded-xs p-sm flex items-center justify-between hover:border-system-border transition-colors text-xs"
            >
              {/* Metric label */}
              <div className="flex flex-col">
                <span className="text-white font-semibold">{metric.label}</span>
                <span className="font-mono text-[9px] text-system-mutedText">Telemetry variable</span>
              </div>

              {/* Current, Simulated, Difference values */}
              <div className="flex items-center gap-md font-mono text-right">
                <div className="flex flex-col">
                  <span className="text-[9px] text-system-mutedText uppercase">Current</span>
                  <span className="text-white">{metric.current}</span>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-[9px] text-system-mutedText uppercase">Simulated</span>
                  <span className="text-system-purple font-semibold">{metric.simulated}</span>
                </div>

                <div className="flex flex-col min-w-[90px]">
                  <span className="text-[9px] text-system-mutedText uppercase">Variance</span>
                  <span className={diffColor}>{metric.diff}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default SideBySideComparison;
