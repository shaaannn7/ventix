import React from 'react';
import { 
  Check, 
  HelpCircle, 
  Database,
  Camera,
  Ticket,
  CloudSun,
  Navigation,
  Cpu
} from 'lucide-react';

interface Source {
  name: string;
  icon: typeof Database;
  active: boolean;
}

const SOURCES: Source[] = [
  { name: 'CCTV Feeds', icon: Camera, active: true },
  { name: 'Ticketing Ingress', icon: Ticket, active: true },
  { name: 'Weather Sensors', icon: CloudSun, active: true },
  { name: 'GPS Tracking', icon: Navigation, active: true },
  { name: 'IoT Devices', icon: Database, active: true },
];

export const AIReasoningPanel: React.FC = () => {
  return (
    <div className="bg-obsidian-muted border border-system-border rounded-md p-lg select-none shadow-high relative overflow-hidden flex flex-col gap-md">
      {/* Background Aura */}
      <div className="absolute top-0 right-0 w-[140px] h-[140px] bg-system-purple/5 blur-[35px] pointer-events-none rounded-full" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-system-border/50 pb-sm shrink-0">
        <div className="flex items-center gap-xs">
          <HelpCircle className="w-4 h-4 text-system-purple" />
          <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">Reasoning Explanation</span>
        </div>
        <div className="flex items-center gap-xs text-system-purple">
          <Cpu className="w-3.5 h-3.5" />
          <span className="font-mono text-[9px] uppercase tracking-wider">Reasoner Core L3</span>
        </div>
      </div>

      {/* Primary recommendation card details */}
      <div className="flex flex-col gap-sm">
        <div className="flex flex-col gap-2xs">
          <span className="font-mono text-[9px] text-system-mutedText uppercase tracking-wider">Proposed Command Action</span>
          <span className="text-xs font-semibold text-white">Deploy volunteer dispatch squads to Sector B4 ingress zones.</span>
        </div>

        {/* Diagnostic reasons */}
        <div className="flex flex-col gap-2xs">
          <span className="font-mono text-[9px] text-system-mutedText uppercase tracking-wider">Underlying Factors</span>
          <ul className="space-y-[4px] font-sans text-xs text-system-mutedText leading-relaxed">
            <li className="flex items-start gap-xs">
              <span className="text-system-purple font-mono font-bold shrink-0">•</span>
              <span>CCTV logs indicate congestion spikes exceeding 3.2 people/m² near primary turnstiles.</span>
            </li>
            <li className="flex items-start gap-xs">
              <span className="text-system-purple font-mono font-bold shrink-0">•</span>
              <span>Two regional transit shuttles carrying approximately 180 fans are scheduled to arrive in 3 minutes.</span>
            </li>
            <li className="flex items-start gap-xs">
              <span className="text-system-purple font-mono font-bold shrink-0">•</span>
              <span>Historical match-day data predicts queue bottlenecks will scale wait times to 22 minutes without intervention.</span>
            </li>
            <li className="flex items-start gap-xs">
              <span className="text-system-purple font-mono font-bold shrink-0">•</span>
              <span>Slight drizzle conditions are slowing check-in times by an average of 4 seconds per fan.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Evidence sources checklist */}
      <div className="border-t border-system-border/40 pt-md">
        <span className="font-mono text-[9px] text-system-mutedText uppercase tracking-wider block pb-sm">Sources Evaluated</span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-sm">
          {SOURCES.map((source, index) => {
            const SourceIcon = source.icon;
            return (
              <div 
                key={index} 
                className="bg-obsidian-elevated/40 border border-system-border/60 rounded-xs px-sm py-xs flex items-center gap-xs"
              >
                <Check className="w-3 h-3 text-system-green shrink-0" />
                <SourceIcon className="w-3.5 h-3.5 text-system-cyan shrink-0" />
                <span className="font-mono text-[9px] text-white truncate">{source.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default AIReasoningPanel;
