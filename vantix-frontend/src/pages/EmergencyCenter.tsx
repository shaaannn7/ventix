import React from 'react';
import Sidebar from '@/components/navigation/Sidebar';
import TopBar from '@/components/navigation/TopBar';
import BottomTelemetryBar from '@/components/navigation/BottomTelemetryBar';
import AICopilotSidebar from '@/components/ai/AICopilotSidebar';
import AuraFAB from '@/components/ai/AuraFAB';
import { 
  ShieldAlert, 
  HeartPulse
} from 'lucide-react';

const EmergencyCenter: React.FC = () => {
  const activeIncidents = [
    { id: 'inc-101', title: 'Medical Case: Turnstile 14B', type: 'medical', severity: 'CRITICAL', status: 'DISPATCHED', response: '3m' },
    { id: 'inc-102', title: 'Queue Bottleneck: Sector East', type: 'security', severity: 'HIGH', status: 'MONITORING', response: '8m' },
  ];

  return (
    <div className="flex flex-col h-screen w-screen bg-obsidian text-white overflow-hidden font-sans select-none">
      <TopBar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main id="main" className="flex-1 overflow-y-auto p-md space-y-md flex flex-col scrollbar-none">
          
          {/* Header */}
          <div className="flex flex-col gap-2xs">
            <span className="font-mono text-xs text-system-crimson uppercase tracking-widest font-semibold animate-pulse">
              Emergency Operations Center
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-white font-sans sm:text-3xl">
              Incident Dispatch & Triage HUD
            </h1>
            <p className="text-xs text-system-mutedText">
              Real-time emergency tracking, medical team dispatches, and perimeter fire checklists.
            </p>
          </div>

          {/* KPI statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
            <div className="bg-obsidian-muted border border-system-crimson/30 rounded-xs p-sm flex flex-col gap-2xs shadow-alert-glow">
              <span className="text-[10px] text-system-mutedText uppercase font-mono">Active Incidents</span>
              <span className="text-lg font-bold text-system-crimson tracking-wide">2 Alerts</span>
            </div>
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm flex flex-col gap-2xs">
              <span className="text-[10px] text-system-mutedText uppercase font-mono">Dispatched Teams</span>
              <span className="text-lg font-bold text-system-cyan tracking-wide">4 Squads</span>
            </div>
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm flex flex-col gap-2xs">
              <span className="text-[10px] text-system-mutedText uppercase font-mono">Avg Response Time</span>
              <span className="text-lg font-bold text-system-purple tracking-wide">3.2 mins</span>
            </div>
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm flex flex-col gap-2xs">
              <span className="text-[10px] text-system-mutedText uppercase font-mono">AED Stations Online</span>
              <span className="text-lg font-bold text-system-green tracking-wide">100% Ready</span>
            </div>
          </div>

          {/* Incident cards list */}
          <div className="bg-obsidian-muted border border-system-border rounded-md p-lg flex flex-col gap-md">
            <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">Active Incident Registry</span>
            <div className="space-y-sm">
              {activeIncidents.map((inc, i) => (
                <div key={i} className="bg-obsidian-elevated/40 border border-system-crimson/25 rounded-xs p-sm flex items-center justify-between hover:border-system-crimson transition-colors">
                  <div className="flex items-center gap-sm">
                    {inc.type === 'medical' ? (
                      <HeartPulse className="w-4 h-4 text-system-crimson" />
                    ) : (
                      <ShieldAlert className="w-4 h-4 text-system-amber" />
                    )}
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-white">{inc.title}</span>
                      <span className="text-[9px] text-system-mutedText font-mono uppercase">// Location: Concourse B</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-xl font-mono text-xs text-right">
                    <div>
                      <span className="text-[9px] text-system-mutedText block">Severity</span>
                      <span className="text-system-crimson font-bold">{inc.severity}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-system-mutedText block">ETA</span>
                      <span className="text-white">{inc.response}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-system-mutedText block">Status</span>
                      <span className="text-system-cyan">{inc.status}</span>
                    </div>
                  </div>
                </div>
              ))}
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

export default EmergencyCenter;
