import React, { useEffect, useState } from 'react';
import { 
  Database, 
  Activity, 
  BrainCircuit, 
  ShieldAlert, 
  CheckSquare, 
  ThumbsUp, 
  Play 
} from 'lucide-react';

const PIPELINE_STAGES = [
  { id: 'ingest', label: 'Data Ingest', icon: Database },
  { id: 'analyze', label: 'Analysis', icon: Activity },
  { id: 'predict', label: 'Prediction', icon: BrainCircuit },
  { id: 'risk', label: 'Risk Eval', icon: ShieldAlert },
  { id: 'recommend', label: 'Recommendation', icon: CheckSquare },
  { id: 'approve', label: 'Operator Check', icon: ThumbsUp },
  { id: 'execute', label: 'Execution', icon: Play },
];

export const AIThinkingPipeline: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStageIndex((prev) => (prev + 1) % PIPELINE_STAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-obsidian-muted border border-system-border rounded-md p-lg select-none shadow-high relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(168,85,247,0.05),transparent)] pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-system-border/50 pb-sm mb-md">
        <div className="flex items-center gap-xs">
          <BrainCircuit className="w-4 h-4 text-system-purple" />
          <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">AI Reasoning Pipeline</span>
        </div>
        <span className="font-mono text-[9px] text-system-purple animate-pulse">PIPELINE_ACTIVE</span>
      </div>

      {/* Pipeline tracker display */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-sm md:gap-xs relative py-sm">
        {PIPELINE_STAGES.map((stage, idx) => {
          const isActive = idx === activeStageIndex;
          const isCompleted = idx < activeStageIndex;
          const Icon = stage.icon;

          let ringColor = 'border-system-border text-system-mutedText';
          let textColor = 'text-system-mutedText';
          
          if (isActive) {
            ringColor = 'border-system-purple text-system-purple glow-purple scale-105';
            textColor = 'text-white font-semibold';
          } else if (isCompleted) {
            ringColor = 'border-system-cyan text-system-cyan bg-system-cyan/5';
            textColor = 'text-system-cyan';
          }

          return (
            <React.Fragment key={stage.id}>
              {/* Stage Bubble node */}
              <div className="flex flex-col items-center gap-xs z-10 shrink-0">
                <div className={`w-[36px] h-[36px] rounded-full border flex items-center justify-center transition-all duration-300 ${ringColor}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`font-mono text-[9px] uppercase tracking-wider ${textColor}`}>
                  {stage.label}
                </span>
              </div>

              {/* Connecting connector line */}
              {idx < PIPELINE_STAGES.length - 1 && (
                <div className="hidden md:block flex-1 h-[1px] bg-system-border relative -top-3">
                  {isCompleted && (
                    <div className="absolute inset-0 bg-system-cyan animate-pulse" />
                  )}
                  {isActive && (
                    <div className="absolute inset-0 bg-system-purple animate-pulse" />
                  )}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
export default AIThinkingPipeline;
