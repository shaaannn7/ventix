import React from 'react';
import { 
  Users, 
  Train, 
  CloudSun, 
  HeartPulse, 
  Shield, 
  Navigation, 
  UserCheck, 
  Sparkles,
  Cpu
} from 'lucide-react';

interface Agent {
  name: string;
  role: string;
  icon: typeof Users;
  status: 'Thinking' | 'Idle' | 'Busy' | 'Completed';
}

const AGENTS: Agent[] = [
  { name: 'Crowd Agent', role: 'Congestion modeling', icon: Users, status: 'Thinking' },
  { name: 'Transport Agent', role: 'Transit schedules', icon: Train, status: 'Completed' },
  { name: 'Weather Agent', role: 'Climatic indexing', icon: CloudSun, status: 'Idle' },
  { name: 'Medical Agent', role: 'Squad dispatches', icon: HeartPulse, status: 'Idle' },
  { name: 'Security Agent', role: 'Patrol routing', icon: Shield, status: 'Busy' },
  { name: 'Navigation Agent', role: 'Fan route guides', icon: Navigation, status: 'Idle' },
  { name: 'Resource Agent', role: 'Staff allocation', icon: UserCheck, status: 'Completed' },
  { name: 'Commander Agent', role: 'Core Orchestration', icon: Sparkles, status: 'Thinking' },
];

export const MultiAgentView: React.FC = () => {
  return (
    <div className="bg-obsidian-muted border border-system-border rounded-md p-lg select-none shadow-high flex flex-col gap-md">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-system-border/50 pb-sm shrink-0">
        <div className="flex items-center gap-xs">
          <Cpu className="w-4 h-4 text-system-purple" />
          <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">Multi-Agent Intelligence Network</span>
        </div>
        <span className="font-mono text-[9px] text-system-purple animate-pulse">8 AGENTS_ONLINE</span>
      </div>

      {/* Grid list of active agents */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-md">
        {AGENTS.map((agent, index) => {
          const Icon = agent.icon;
          
          let statusColor = 'text-system-mutedText';
          let statusCircle = 'bg-system-mutedText/30';
          if (agent.status === 'Thinking') {
            statusColor = 'text-system-purple font-bold';
            statusCircle = 'bg-system-purple animate-strobe';
          } else if (agent.status === 'Completed') {
            statusColor = 'text-system-green';
            statusCircle = 'bg-system-green';
          } else if (agent.status === 'Busy') {
            statusColor = 'text-system-amber';
            statusCircle = 'bg-system-amber';
          }

          return (
            <div 
              key={index}
              className="bg-obsidian-elevated/40 border border-system-border/60 rounded-xs p-sm flex items-center gap-md hover:border-system-border transition-colors"
            >
              {/* Agent avatar icon */}
              <div className="p-xs bg-obsidian-sub border border-system-border/80 rounded-xs text-system-cyan shrink-0">
                <Icon className="w-4 h-4" />
              </div>

              {/* Agent info */}
              <div className="flex-1 min-w-0 flex flex-col">
                <span className="text-xs font-semibold text-white truncate">{agent.name}</span>
                <span className="text-[9px] text-system-mutedText truncate">{agent.role}</span>
                
                {/* Agent status */}
                <div className="flex items-center gap-xs mt-[4px]">
                  <span className={`w-1.5 h-1.5 rounded-full ${statusCircle}`} />
                  <span className={`font-mono text-[8px] uppercase ${statusColor}`}>{agent.status}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default MultiAgentView;
