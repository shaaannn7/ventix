import React from 'react';
import { 
  Database, 
  Clock, 
  Activity 
} from 'lucide-react';

interface ConfidenceEngineProps {
  score?: number;
  riskLevel?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  evidenceCount?: number;
  freshnessSec?: number;
}

export const ConfidenceEngine: React.FC<ConfidenceEngineProps> = ({
  score = 94.2,
  riskLevel = 'MEDIUM',
  evidenceCount = 14,
  freshnessSec = 8,
}) => {
  let riskColor = 'text-system-green bg-system-green/10 border-system-green/20';
  if (riskLevel === 'MEDIUM') riskColor = 'text-system-amber bg-system-amber/10 border-system-amber/20';
  if (riskLevel === 'HIGH' || riskLevel === 'CRITICAL') riskColor = 'text-system-crimson bg-system-crimson/10 border-system-crimson/20';

  return (
    <div className="bg-obsidian-muted border border-system-border rounded-md p-lg select-none shadow-high flex flex-col gap-md">
      {/* Title Header */}
      <div className="flex items-center justify-between border-b border-system-border/50 pb-sm">
        <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">Confidence Telemetry</span>
        <span className="font-mono text-[9px] text-system-mutedText">Model evaluation stats</span>
      </div>

      {/* Main score metrics layout */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-md items-center">
        {/* Confidence Percentage value */}
        <div className="flex flex-col gap-xs">
          <span className="font-mono text-[9px] text-system-mutedText uppercase">Confidence Score</span>
          <div className="flex items-baseline gap-xs">
            <span className="font-mono text-xl font-bold text-system-purple">{score}%</span>
            <span className="font-mono text-[9px] text-system-mutedText uppercase">Optimal</span>
          </div>
        </div>

        {/* Confidence Bar slider */}
        <div className="flex flex-col gap-xs col-span-2">
          <span className="font-mono text-[9px] text-system-mutedText uppercase">Score Threshold</span>
          <div className="w-full bg-obsidian-elevated h-2 rounded-2xs overflow-hidden border border-system-border/40">
            <div 
              className="h-full bg-gradient-to-r from-system-cyan to-system-purple glow-purple" 
              style={{ width: `${score}%` }}
            />
          </div>
        </div>

        {/* Risk Rating classification */}
        <div className="flex flex-col gap-xs items-end">
          <span className="font-mono text-[9px] text-system-mutedText uppercase">Risk Classification</span>
          <span className={`px-sm py-xs font-mono text-[10px] font-bold rounded-2xs border ${riskColor}`}>
            {riskLevel}
          </span>
        </div>
      </div>

      {/* Audit Telemetry stats details */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-md border-t border-system-border/40 pt-md text-[10px]">
        {/* Evidence node points */}
        <div className="flex items-center gap-sm">
          <Database className="w-4 h-4 text-system-cyan shrink-0" />
          <div className="flex flex-col">
            <span className="text-system-mutedText uppercase font-mono text-[8px]">Evidence Points</span>
            <span className="font-mono text-white font-semibold">{evidenceCount} telemetry nodes</span>
          </div>
        </div>

        {/* Telemetry updates freshness */}
        <div className="flex items-center gap-sm">
          <Clock className="w-4 h-4 text-system-cyan shrink-0" />
          <div className="flex flex-col">
            <span className="text-system-mutedText uppercase font-mono text-[8px]">Data Freshness</span>
            <span className="font-mono text-white font-semibold">Updated {freshnessSec}s ago</span>
          </div>
        </div>

        {/* Processing evaluation latency */}
        <div className="flex items-center gap-sm">
          <Activity className="w-4 h-4 text-system-cyan shrink-0" />
          <div className="flex flex-col">
            <span className="text-system-mutedText uppercase font-mono text-[8px]">Evaluation speed</span>
            <span className="font-mono text-white font-semibold">142ms generation</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConfidenceEngine;
