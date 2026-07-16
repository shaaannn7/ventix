import React, { useEffect, useState } from 'react';
import { Sparkles, Terminal } from 'lucide-react';

const BACKGROUND_PROCESSES = [
  'Analyzing CCTV concourse streams...',
  'Checking regional transit schedule updates...',
  'Monitoring local weather sensor changes...',
  'Evaluating stadium pedestrian flow vectors...',
  'Predicting ingress queue rates at Gate C...',
  'Simulating volunteer redistribution routes...',
  'Drafting AI operational summary...',
];

export const LiveAIStream: React.FC = () => {
  const [activeProcessIndex, setActiveProcessIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProcessIndex((prev) => (prev + 1) % BACKGROUND_PROCESSES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-obsidian-elevated/40 border border-system-border/80 rounded-xs px-md py-sm flex items-center justify-between font-mono text-[10px] select-none shadow-ai-glow">
      <div className="flex items-center gap-sm">
        <Sparkles className="w-3.5 h-3.5 text-system-purple animate-pulse shrink-0" />
        <span className="text-white tracking-wide">
          {BACKGROUND_PROCESSES[activeProcessIndex]}
        </span>
      </div>

      <div className="flex items-center gap-xs text-system-mutedText shrink-0">
        <Terminal className="w-3 h-3" />
        <span>Syncing models...</span>
      </div>
    </div>
  );
};
export default LiveAIStream;
