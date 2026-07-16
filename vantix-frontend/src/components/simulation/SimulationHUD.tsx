import React from 'react';
import { 
  Users, 
  UserCheck, 
  ShieldAlert, 
  HeartPulse, 
  Clock, 
  Coins, 
  Zap,
  CheckCircle,
  FileText,
  MessageSquare
} from 'lucide-react';

interface SimulationHUDProps {
  scenario: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export const SimulationHUD: React.FC<SimulationHUDProps> = ({ scenario, severity }) => {
  const isCrisis = severity === 'high' || severity === 'critical';

  // 10 AI Predictions
  const predictions = [
    { label: 'Crowd Flow', value: isCrisis ? '88% Peak' : '42% Nominal', icon: Users, state: isCrisis ? 'alert' : 'normal' },
    { label: 'Volunteers Req', value: isCrisis ? '+12 Staff' : '+2 Staff', icon: UserCheck, state: isCrisis ? 'warning' : 'normal' },
    { label: 'Security Impact', value: isCrisis ? 'STRETCHED' : 'NOMINAL', icon: ShieldAlert, state: isCrisis ? 'warning' : 'normal' },
    { label: 'Medical Readiness', value: isCrisis ? '2 Dispatched' : 'Ready', icon: HeartPulse, state: isCrisis ? 'alert' : 'normal' },
    { label: 'Transport Delay', value: isCrisis ? '+14 mins' : '+3 mins', icon: Clock, state: isCrisis ? 'warning' : 'normal' },
    { label: 'Parking Overflow', value: isCrisis ? 'Lot C at 98%' : 'Lot C at 74%', icon: Coins, state: isCrisis ? 'warning' : 'normal' },
    { label: 'Food Demand', value: isCrisis ? 'Sectors B peak' : 'Nominal', icon: FileText, state: 'normal' },
    { label: 'Water Demand', value: isCrisis ? 'Normal flow' : 'Normal flow', icon: Clock, state: 'normal' },
    { label: 'Energy Usage', value: isCrisis ? '840 kW/h' : '420 kW/h', icon: Zap, state: 'normal' },
    { label: 'Recovery Time', value: isCrisis ? '42 mins' : '10 mins', icon: Clock, state: 'normal' },
  ];

  // 8 Impact Analysis Metrics
  const impactMetrics = [
    { label: 'Risk Score', value: isCrisis ? '0.84 (CRITICAL)' : '0.12 (LOW)', state: isCrisis ? 'text-system-crimson font-bold' : 'text-system-cyan' },
    { label: 'Affected Fans', value: isCrisis ? '1,850 fans' : '120 fans', state: 'text-white' },
    { label: 'Affected Volunteers', value: isCrisis ? '14 volunteers' : '2 volunteers', state: 'text-white' },
    { label: 'Expected Queue', value: isCrisis ? '24 mins wait' : '8 mins wait', state: 'text-white' },
    { label: 'Revenue Impact', value: isCrisis ? '-$8,400 est' : '-$200 est', state: 'text-white' },
    { label: 'Operational Cost', value: isCrisis ? '+$4,200' : '+$500', state: 'text-white' },
    { label: 'Recovery ETA', value: isCrisis ? '35 mins' : '10 mins', state: 'text-white' },
    { label: 'Carbon Impact', value: isCrisis ? '94kg CO₂ offset' : '12kg CO₂ offset', state: 'text-system-green' },
  ];

  return (
    <div className="bg-obsidian-muted border border-system-border rounded-md p-lg select-none shadow-high flex flex-col gap-lg">
      
      {/* 1. AI Predictions Section */}
      <div className="flex flex-col gap-md">
        <div className="flex items-center justify-between border-b border-system-border/50 pb-sm">
          <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">AI Sub-system Predictions</span>
          <span className="font-mono text-[9px] text-system-purple">Real-time model synthesis</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-md">
          {predictions.map((pred, i) => {
            const Icon = pred.icon;
            const isAlert = pred.state === 'alert';
            const isWarning = pred.state === 'warning';
            
            let colorClass = 'text-system-cyan';
            let borderClass = 'border-system-border/60';
            if (isAlert) {
              colorClass = 'text-system-crimson';
              borderClass = 'border-system-crimson/30 shadow-alert-glow';
            } else if (isWarning) {
              colorClass = 'text-system-amber';
              borderClass = 'border-system-amber/30';
            }

            return (
              <div 
                key={i} 
                className={`bg-obsidian-elevated/40 border rounded-xs p-sm flex flex-col gap-2xs hover:border-system-border transition-colors ${borderClass}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[10px] text-system-mutedText font-medium tracking-wide">
                    {pred.label}
                  </span>
                  <Icon className={`w-3.5 h-3.5 ${colorClass}`} />
                </div>
                <span className="font-mono text-xs font-bold text-white tracking-wide">
                  {pred.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Impact Analysis Section */}
      <div className="flex flex-col gap-md">
        <div className="flex items-center justify-between border-b border-system-border/50 pb-sm">
          <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">Simulation Quantitative Impact Analysis</span>
          <span className="font-mono text-[9px] text-system-mutedText">Forecast metrics variance</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
          {impactMetrics.map((imp, i) => (
            <div key={i} className="bg-obsidian-elevated/20 border border-system-border/60 rounded-xs p-sm flex justify-between items-center text-xs">
              <span className="text-system-mutedText font-medium">{imp.label}</span>
              <span className={`font-mono ${imp.state}`}>{imp.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Mission Recommendations Section */}
      <div className="border-t border-system-border/40 pt-md grid grid-cols-1 md:grid-cols-2 gap-md">
        <div className="flex flex-col gap-sm">
          <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">Mission Recommendations</span>
          
          <div className="space-y-sm">
            <div className="flex items-start gap-xs bg-obsidian-elevated/40 border border-system-border/40 rounded-xs p-sm text-xs">
              <CheckCircle className="w-4 h-4 text-system-purple shrink-0 mt-[2px]" />
              <div className="flex flex-col">
                <span className="text-white font-semibold">Immediate Operations Command</span>
                <span className="text-system-mutedText pt-[1px]">
                  {scenario === 'fire' 
                    ? 'Unlock all emergency exit gates in Concourse B. Reroute pedestrian paths to East safe assembly field.' 
                    : 'Deploy standby volunteer teams. Shift concourse barriers to expand buffers.'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-xs bg-obsidian-elevated/40 border border-system-border/40 rounded-xs p-sm text-xs">
              <CheckCircle className="w-4 h-4 text-system-cyan shrink-0 mt-[2px]" />
              <div className="flex flex-col">
                <span className="text-white font-semibold">Next Sequential Steps</span>
                <span className="text-system-mutedText pt-[1px]">
                  Adjust shuttle route timings for Transport hub C to prevent queue spillbacks to outer corridors.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-xs bg-obsidian-elevated/40 border border-system-border/40 rounded-xs p-sm text-xs">
              <CheckCircle className="w-4 h-4 text-system-cyan shrink-0 mt-[2px]" />
              <div className="flex flex-col">
                <span className="text-white font-semibold">Long-Term Adjustments</span>
                <span className="text-system-mutedText pt-[1px]">
                  Evaluate ticket checking intervals during weather anomalies to prevent future entrance bottlenecks.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Resource allocation & broadcasts details */}
        <div className="flex flex-col gap-sm">
          <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">Resource Allocation & Alerts</span>
          
          <div className="space-y-sm">
            <div className="flex items-start gap-xs bg-obsidian-elevated/40 border border-system-border/40 rounded-xs p-sm text-xs">
              <UserCheck className="w-4 h-4 text-system-green shrink-0 mt-[2px]" />
              <div className="flex flex-col">
                <span className="text-white font-semibold">Volunteer Assignments</span>
                <span className="text-system-mutedText pt-[1px]">
                  Assign Squad 4 (12 staff) from North Concourse to auxiliary Gate B4 turnstiles.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-xs bg-obsidian-elevated/40 border border-system-border/40 rounded-xs p-sm text-xs">
              <MessageSquare className="w-4 h-4 text-system-cyan shrink-0 mt-[2px]" />
              <div className="flex flex-col">
                <span className="text-white font-semibold">Broadcast Message Drafts</span>
                <span className="text-system-mutedText pt-[1px] italic">
                  "Notice: Heavy entry flows near Gate B4 turnstiles. Please follow route guides to auxiliary Gate C."
                </span>
              </div>
            </div>

            <div className="flex items-start gap-xs bg-obsidian-elevated/40 border border-system-border/40 rounded-xs p-sm text-xs">
              <ShieldAlert className="w-4 h-4 text-system-amber shrink-0 mt-[2px]" />
              <div className="flex flex-col">
                <span className="text-white font-semibold">Security Asset Allocation</span>
                <span className="text-system-mutedText pt-[1px]">
                  Reroute Security Patrol Team Alpha to Gate B4 coordinates to oversee flow control.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. AI Confidence Models info */}
      <div className="border-t border-system-border/40 pt-md grid grid-cols-1 md:grid-cols-2 gap-md items-center">
        <div className="flex items-center gap-md">
          <div className="flex flex-col">
            <span className="font-mono text-[9px] text-system-mutedText uppercase">Confidence Score</span>
            <span className="font-mono text-lg font-bold text-system-purple">94.8% OPTIMAL</span>
          </div>
          <div className="flex flex-col border-l border-system-border pl-md">
            <span className="font-mono text-[9px] text-system-mutedText uppercase">Evidence Checked</span>
            <span className="font-mono text-xs font-semibold text-white">14 telemetry node feeds</span>
          </div>
        </div>

        <div className="flex items-center gap-xs flex-wrap justify-end font-mono text-[9px] text-system-mutedText">
          <span>MODELS_USED:</span>
          <span className="px-2xs py-[1px] bg-obsidian-elevated border border-system-border rounded-2xs text-white">Historical Matches</span>
          <span className="px-2xs py-[1px] bg-obsidian-elevated border border-system-border rounded-2xs text-white">Weather Sensors</span>
          <span className="px-2xs py-[1px] bg-obsidian-elevated border border-system-border rounded-2xs text-white">CCTV Telemetry</span>
        </div>
      </div>

    </div>
  );
};
export default SimulationHUD;
