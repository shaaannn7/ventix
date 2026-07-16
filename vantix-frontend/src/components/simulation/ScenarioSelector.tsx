import React from 'react';
import { 
  Flame, 
  HeartPulse, 
  Users, 
  CloudRain, 
  Zap, 
  Key, 
  Train, 
  ShieldAlert, 
  Award, 
  WifiOff, 
  Crown, 
  Bus, 
  ParkingCircle, 
  Utensils, 
  Droplet, 
  UserX, 
  Radar, 
  LogOut, 
  Clock 
} from 'lucide-react';

interface ScenarioSelectorProps {
  selectedScenario: string;
  onSelect: (scenario: string) => void;
}

const SCENARIO_LIST = [
  { id: 'fire', label: 'Fire Incident', icon: Flame, desc: 'Evac checklist' },
  { id: 'medical', label: 'Medical Emergency', icon: HeartPulse, desc: 'Squad dispatches' },
  { id: 'surge', label: 'Crowd Surge', icon: Users, desc: 'Congestion waves' },
  { id: 'rain', label: 'Heavy Rain', icon: CloudRain, desc: 'Entry flow slowdown' },
  { id: 'power', label: 'Power Failure', icon: Zap, desc: 'Backup grid sync' },
  { id: 'network', label: 'Network Failure', icon: WifiOff, desc: 'Offline systems sync' },
  { id: 'vip', label: 'VIP Arrival', icon: Crown, desc: 'Escort pathing' },
  { id: 'gate', label: 'Gate Closure', icon: Key, desc: 'Inflow redirect' },
  { id: 'bus', label: 'Bus Delay', icon: Bus, desc: 'Shuttle frequency' },
  { id: 'train', label: 'Train Delay', icon: Train, desc: 'Metro egress lag' },
  { id: 'parking', label: 'Parking Overflow', icon: ParkingCircle, desc: 'Traffic detour' },
  { id: 'food', label: 'Food Shortage', icon: Utensils, desc: 'Supply re-route' },
  { id: 'water', label: 'Water Shortage', icon: Droplet, desc: 'Pressure drops' },
  { id: 'security', label: 'Security Threat', icon: ShieldAlert, desc: 'Zone lockdown' },
  { id: 'lost', label: 'Lost Child', icon: UserX, desc: 'Alert broadcast' },
  { id: 'drone', label: 'Drone Detection', icon: Radar, desc: 'Airspace lock' },
  { id: 'evac', label: 'Emergency Evacuation', icon: LogOut, desc: 'Assembly paths' },
  { id: 'goal', label: 'Goal Celebration', icon: Award, desc: 'Vocal volume peak' },
  { id: 'end', label: 'Match End', icon: Clock, desc: 'Total egress rush' },
  { id: 'halftime', label: 'Half Time Rush', icon: Users, desc: 'Concourse peak' },
];

export const ScenarioSelector: React.FC<ScenarioSelectorProps> = ({ selectedScenario, onSelect }) => {
  return (
    <div className="bg-obsidian-muted border border-system-border rounded-md p-lg select-none shadow-high flex flex-col gap-md">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-system-border/50 pb-sm shrink-0">
        <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">Select Simulation Scenario</span>
        <span className="font-mono text-[9px] text-system-mutedText">20 operational scenarios compiled</span>
      </div>

      {/* Grid of 20 Scenario Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-sm max-h-[220px] overflow-y-auto pr-xs custom-scrollbar">
        {SCENARIO_LIST.map((sc) => {
          const Icon = sc.icon;
          const isSelected = selectedScenario === sc.id;
          
          let cardBorder = isSelected ? 'border-system-purple shadow-ai-glow' : 'border-system-border/60 hover:border-system-border/80';
          let iconColor = isSelected ? 'text-system-purple' : 'text-system-cyan';
          let bgClass = isSelected ? 'bg-system-purple/[0.04]' : 'bg-obsidian-elevated/40 hover:bg-obsidian-sub';

          return (
            <button
              key={sc.id}
              onClick={() => onSelect(sc.id)}
              className={`flex flex-col items-center justify-center text-center p-sm border rounded-xs gap-xs transition-all duration-150 active:scale-95 ${cardBorder} ${bgClass}`}
            >
              <Icon className={`w-4.5 h-4.5 ${iconColor}`} />
              <span className="text-xs font-semibold text-white tracking-wide">{sc.label}</span>
              <span className="text-[8px] text-system-mutedText uppercase font-mono">{sc.desc}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default ScenarioSelector;
