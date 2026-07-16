import React from 'react';
import Sidebar from '@/components/navigation/Sidebar';
import TopBar from '@/components/navigation/TopBar';
import BottomTelemetryBar from '@/components/navigation/BottomTelemetryBar';
import AICopilotSidebar from '@/components/ai/AICopilotSidebar';
import AuraFAB from '@/components/ai/AuraFAB';
import { 
  Map
} from 'lucide-react';

const CrowdIntelligence: React.FC = () => {
  const sectors = [
    { name: 'Sector North-A', status: 'Optimal', load: '32%', wait: '4m' },
    { name: 'Sector North-B (Gate B4)', status: 'Congested', load: '94%', wait: '24m' },
    { name: 'Sector South-A', status: 'Optimal', load: '48%', wait: '6m' },
    { name: 'Sector East-A', status: 'Nominal', load: '61%', wait: '11m' },
  ];

  return (
    <div className="flex flex-col h-screen w-screen bg-obsidian text-white overflow-hidden font-sans select-none">
      <TopBar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main id="main" className="flex-1 overflow-y-auto p-md space-y-md flex flex-col scrollbar-none">
          
          {/* Header */}
          <div className="flex flex-col gap-2xs">
            <span className="font-mono text-xs text-system-cyan uppercase tracking-widest font-semibold">
              Telemetry Workspace
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-white font-sans sm:text-3xl">
              Crowd Intelligence Center
            </h1>
            <p className="text-xs text-system-mutedText">
              Real-time pedestrian density trackers, queue throughputs, and predictive stampede modeling.
            </p>
          </div>

          {/* KPI grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm flex flex-col gap-2xs">
              <span className="text-[10px] text-system-mutedText uppercase font-mono">Arena Attendance</span>
              <span className="text-lg font-bold text-white tracking-wide">88,420 / 90,000</span>
            </div>
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm flex flex-col gap-2xs">
              <span className="text-[10px] text-system-mutedText uppercase font-mono">Avg Wait Time</span>
              <span className="text-lg font-bold text-system-cyan tracking-wide">12 mins</span>
            </div>
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm flex flex-col gap-2xs">
              <span className="text-[10px] text-system-mutedText uppercase font-mono">Gate Inflow Rate</span>
              <span className="text-lg font-bold text-system-purple tracking-wide">412 scans/min</span>
            </div>
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm flex flex-col gap-2xs">
              <span className="text-[10px] text-system-mutedText uppercase font-mono">Stampede Risk index</span>
              <span className="text-lg font-bold text-system-green tracking-wide">0.12 (LOW)</span>
            </div>
          </div>

          {/* Sector metrics list */}
          <div className="bg-obsidian-muted border border-system-border rounded-md p-lg flex flex-col gap-md">
            <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">Sector Telemetry Diagnostics</span>
            <div className="space-y-sm">
              {sectors.map((sec, i) => (
                <div key={i} className="bg-obsidian-elevated/40 border border-system-border/60 rounded-xs p-sm flex items-center justify-between hover:border-system-border transition-colors">
                  <div className="flex items-center gap-sm">
                    <Map className="w-4 h-4 text-system-cyan" />
                    <span className="text-xs font-semibold text-white">{sec.name}</span>
                  </div>
                  <div className="flex items-center gap-xl font-mono text-xs text-right">
                    <div>
                      <span className="text-[9px] text-system-mutedText block">Load</span>
                      <span className={sec.load.includes('94%') ? 'text-system-crimson' : 'text-white'}>{sec.load}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-system-mutedText block">Wait</span>
                      <span className="text-white">{sec.wait}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-system-mutedText block">Status</span>
                      <span className={sec.status === 'Congested' ? 'text-system-crimson font-bold' : 'text-system-green'}>{sec.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI queue prediction models */}
          <div className="bg-obsidian-muted border border-system-border rounded-md p-lg flex flex-col gap-sm">
            <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">AI Forecast Models (+30 mins)</span>
            <p className="text-xs text-system-mutedText">
              Predictive models show high entry congestion at Gate B4 turnstiles is likely to persist due to local transit delays, but should decline below 40% loads once auxiliary gates open.
            </p>
          </div>
        </main>
        <AICopilotSidebar />
      </div>
      <BottomTelemetryBar />
      <AuraFAB />
    </div>
  );
};

export default CrowdIntelligence;
