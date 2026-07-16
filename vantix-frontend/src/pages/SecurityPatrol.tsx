import React, { useState } from 'react';
import Sidebar from '@/components/navigation/Sidebar';
import TopBar from '@/components/navigation/TopBar';
import BottomTelemetryBar from '@/components/navigation/BottomTelemetryBar';
import AICopilotSidebar from '@/components/ai/AICopilotSidebar';
import AuraFAB from '@/components/ai/AuraFAB';
import { 
  Shield, 
  MapPin, 
  Send, 
  Radio
} from 'lucide-react';

interface SecuritySquad {
  id: string;
  name: string;
  assignedZone: string;
  status: 'patrolling' | 'responding' | 'standby';
  size: number;
  currentTask?: string;
}

const SecurityPatrol: React.FC = () => {
  const [squads, setSquads] = useState<SecuritySquad[]>([
    { id: 'sq-1', name: 'Squad Alpha', assignedZone: 'Gate B4 Turnstiles', status: 'responding', size: 6, currentTask: 'Crowd control support at turnstile surge' },
    { id: 'sq-2', name: 'Squad Bravo', assignedZone: 'Sector West concourse', status: 'patrolling', size: 4 },
    { id: 'sq-3', name: 'Squad Charlie', assignedZone: 'VIP Entrance A', status: 'standby', size: 5 },
    { id: 'sq-4', name: 'Squad Delta', assignedZone: 'Transit Bus Terminus', status: 'patrolling', size: 4 },
  ]);

  const [selectedSquad, setSelectedSquad] = useState<string>('sq-3');
  const [dispatchZone, setDispatchZone] = useState<string>('Gate B4 Turnstiles');
  const [dispatchTask, setDispatchTask] = useState<string>('');

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dispatchTask.trim()) return;

    setSquads(prev => prev.map(s => {
      if (s.id === selectedSquad) {
        return {
          ...s,
          assignedZone: dispatchZone,
          status: 'responding',
          currentTask: dispatchTask
        };
      }
      return s;
    }));
    setDispatchTask('');
  };

  const threatLevel = 'Low (0.15)';
  const totalOfficers = squads.reduce((acc, s) => acc + s.size, 0);
  const activeAlerts = 2;

  return (
    <div className="flex flex-col h-screen w-screen bg-obsidian text-white overflow-hidden font-sans select-none">
      <TopBar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main id="main" className="flex-1 overflow-y-auto p-md space-y-md flex flex-col scrollbar-none">
          
          {/* Header */}
          <div className="flex flex-col gap-2xs">
            <span className="font-mono text-xs text-system-purple uppercase tracking-widest font-semibold">
              Tactical Operations Command
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-white font-sans sm:text-3xl">
              Security Patrol Command
            </h1>
            <p className="text-xs text-system-mutedText">
              Real-time monitoring of security personnel deployment, incident containment, and threat escalation gates.
            </p>
          </div>

          {/* Security Metrics KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm flex flex-col gap-2xs">
              <span className="text-[10px] text-system-mutedText uppercase font-mono">Total Guards Active</span>
              <span className="text-lg font-bold text-white tracking-wide">{totalOfficers} Officers</span>
            </div>
            <div className="bg-obsidian-muted border border-system-purple/35 rounded-xs p-sm flex flex-col gap-2xs shadow-ai-glow">
              <span className="text-[10px] text-system-mutedText uppercase font-mono">Squads Deployed</span>
              <span className="text-lg font-bold text-system-purple tracking-wide">{squads.length} Squads</span>
            </div>
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm flex flex-col gap-2xs">
              <span className="text-[10px] text-system-mutedText uppercase font-mono">Active Incidents</span>
              <span className="text-lg font-bold text-system-crimson tracking-wide">{activeAlerts} Alerts</span>
            </div>
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm flex flex-col gap-2xs">
              <span className="text-[10px] text-system-mutedText uppercase font-mono">Threat Index</span>
              <span className="text-lg font-bold text-system-green tracking-wide">{threatLevel}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-md items-stretch">
            {/* Left Box: Squad Registry (7 cols) */}
            <div className="lg:col-span-7 bg-obsidian-muted border border-system-border rounded-md p-lg flex flex-col gap-md">
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">Patrol Squad Registry</span>
              <div className="space-y-sm overflow-y-auto max-h-[360px] scrollbar-none pr-xs">
                {squads.map((sq) => (
                  <div 
                    key={sq.id} 
                    className={`bg-obsidian-elevated/40 border rounded-xs p-sm flex items-center justify-between transition-colors ${
                      sq.status === 'responding' 
                        ? 'border-system-crimson/25 hover:border-system-crimson/45' 
                        : sq.status === 'patrolling'
                        ? 'border-system-cyan/20'
                        : 'border-system-border/60 hover:border-system-border'
                    }`}
                  >
                    <div className="flex items-center gap-sm">
                      <div className="p-xs bg-obsidian border border-system-border rounded-xs">
                        <Shield className={`w-4 h-4 ${sq.status === 'responding' ? 'text-system-crimson' : sq.status === 'patrolling' ? 'text-system-cyan' : 'text-system-mutedText'}`} />
                      </div>
                      <div className="flex flex-col gap-[2px]">
                        <div className="flex items-center gap-xs">
                          <span className="text-xs font-semibold text-white">{sq.name}</span>
                          <span className="text-[9px] font-mono bg-obsidian-sub px-1 rounded-2xs text-system-mutedText">Size: {sq.size}</span>
                        </div>
                        {sq.currentTask ? (
                          <span className="text-[10px] text-system-crimson font-medium">{sq.currentTask}</span>
                        ) : (
                          <span className="text-[10px] text-system-mutedText">Routine area sweep patrols.</span>
                        )}
                        <div className="flex items-center gap-xs mt-[2px] font-mono text-[9px] text-system-cyan">
                          <MapPin className="w-3 h-3 text-system-mutedText" />
                          <span>{sq.assignedZone}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2xs font-mono text-right shrink-0">
                      <span className="text-[9px] text-system-mutedText uppercase">Activity</span>
                      <span className={`text-[10px] uppercase font-bold ${
                        sq.status === 'responding' 
                          ? 'text-system-crimson font-semibold' 
                          : sq.status === 'patrolling'
                          ? 'text-system-cyan'
                          : 'text-system-mutedText'
                      }`}>
                        {sq.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Box: Dispatch Console (5 cols) */}
            <div className="lg:col-span-5 bg-obsidian-muted border border-system-border rounded-md p-lg flex flex-col gap-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-system-purple/5 blur-[35px] pointer-events-none rounded-full" />
              <div className="flex items-center gap-xs border-b border-system-border/50 pb-sm">
                <Radio className="w-4 h-4 text-system-purple" />
                <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">Aura Tactical Dispatch Console</span>
              </div>

              <form onSubmit={handleDispatch} className="flex flex-col gap-sm text-xs">
                <div className="flex flex-col gap-2xs">
                  <label htmlFor="squad-select" className="font-mono text-[9px] text-system-mutedText uppercase">Select Squad</label>
                  <select 
                    id="squad-select"
                    value={selectedSquad}
                    onChange={(e) => setSelectedSquad(e.target.value)}
                    className="w-full h-sm px-md bg-obsidian-elevated border border-system-border rounded-xs text-xs text-white focus:outline-none focus:border-system-purple"
                  >
                    {squads.map(s => (
                      <option key={s.id} value={s.id}>{s.name} ({s.status} - size {s.size})</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2xs">
                  <label htmlFor="dispatch-zone" className="font-mono text-[9px] text-system-mutedText uppercase">Dispatch Target Zone</label>
                  <select 
                    id="dispatch-zone"
                    value={dispatchZone}
                    onChange={(e) => setDispatchZone(e.target.value)}
                    className="w-full h-sm px-md bg-obsidian-elevated border border-system-border rounded-xs text-xs text-white focus:outline-none focus:border-system-purple"
                  >
                    <option value="Gate B4 Turnstiles">Gate B4 Turnstiles</option>
                    <option value="Gate C Concourse">Gate C Concourse</option>
                    <option value="VIP Box West Entrance">VIP Box West Entrance</option>
                    <option value="Outer Stadium Parking lot">Outer Stadium Parking lot</option>
                    <option value="Transit Shuttle Terminus">Transit Shuttle Terminus</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2xs">
                  <label htmlFor="dispatch-task" className="font-mono text-[9px] text-system-mutedText uppercase">Dispatches Orders / Details</label>
                  <textarea 
                    id="dispatch-task"
                    value={dispatchTask}
                    onChange={(e) => setDispatchTask(e.target.value)}
                    placeholder="Provide incident containment orders..."
                    rows={3}
                    className="w-full p-md bg-obsidian-elevated border border-system-border rounded-xs text-xs text-white placeholder-system-mutedText focus:outline-none focus:border-system-purple resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="flex items-center justify-center gap-xs w-full py-sm bg-system-purple hover:bg-system-purple/90 border border-system-purple/40 text-white rounded-xs font-mono text-[10px] uppercase font-bold tracking-wider transition-all duration-200 active:scale-95 shadow-ai-glow"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Dispatch Signals</span>
                </button>
              </form>
            </div>
          </div>
        </main>
        <AICopilotSidebar />
      </div>
      <BottomTelemetryBar />
      <AuraFAB />
    </div>
  );
};

export default SecurityPatrol;
