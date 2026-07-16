import React from 'react';
import Sidebar from '@/components/navigation/Sidebar';
import TopBar from '@/components/navigation/TopBar';
import BottomTelemetryBar from '@/components/navigation/BottomTelemetryBar';
import AICopilotSidebar from '@/components/ai/AICopilotSidebar';
import AuraFAB from '@/components/ai/AuraFAB';
import { 
  Train, 
  Bus
} from 'lucide-react';

const Transport: React.FC = () => {
  const routes = [
    { name: 'Metro Line A (Azteca North)', status: 'Nominal', headways: '4m headways', load: '65%' },
    { name: 'Bus Shuttle Line B', status: 'Delayed', headways: '14m delays', load: '92%' },
    { name: 'Taxi Ingress Corridor C', status: 'Nominal', headways: 'No queues', load: '32%' },
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
              Transit Telemetry
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-white font-sans sm:text-3xl">
              Transport Intelligence HUD
            </h1>
            <p className="text-xs text-system-mutedText">
              Real-time Metro line scheduling, parking lot capacity logs, and road traffic GPS monitoring.
            </p>
          </div>

          {/* KPI meters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm flex flex-col gap-2xs">
              <span className="text-[10px] text-system-mutedText uppercase font-mono">Metro Inflow</span>
              <span className="text-lg font-bold text-white tracking-wide">24,500/hr</span>
            </div>
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm flex flex-col gap-2xs">
              <span className="text-[10px] text-system-mutedText uppercase font-mono">Parking Lot C occupancy</span>
              <span className="text-lg font-bold text-system-amber tracking-wide">94% Capacity</span>
            </div>
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm flex flex-col gap-2xs">
              <span className="text-[10px] text-system-mutedText uppercase font-mono">Bus Shuttle Status</span>
              <span className="text-lg font-bold text-system-cyan tracking-wide">6/8 Active</span>
            </div>
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm flex flex-col gap-2xs">
              <span className="text-[10px] text-system-mutedText uppercase font-mono">Avg Ingress Delay</span>
              <span className="text-lg font-bold text-system-purple tracking-wide">+4.2 mins</span>
            </div>
          </div>

          {/* Transit lines list */}
          <div className="bg-obsidian-muted border border-system-border rounded-md p-lg flex flex-col gap-md">
            <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">Active Transit Line Diagnostics</span>
            <div className="space-y-sm">
              {routes.map((rt, i) => (
                <div key={i} className="bg-obsidian-elevated/40 border border-system-border/60 rounded-xs p-sm flex items-center justify-between hover:border-system-border transition-colors">
                  <div className="flex items-center gap-sm">
                    {rt.name.includes('Metro') ? (
                      <Train className="w-4 h-4 text-system-cyan" />
                    ) : (
                      <Bus className="w-4 h-4 text-system-purple" />
                    )}
                    <span className="text-xs font-semibold text-white">{rt.name}</span>
                  </div>
                  
                  <div className="flex items-center gap-xl font-mono text-xs text-right">
                    <div>
                      <span className="text-[9px] text-system-mutedText block">Interval</span>
                      <span className="text-white">{rt.headways}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-system-mutedText block">Load</span>
                      <span className={rt.load.includes('92%') ? 'text-system-crimson' : 'text-white'}>{rt.load}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-system-mutedText block">Status</span>
                      <span className={rt.status === 'Delayed' ? 'text-system-amber font-bold' : 'text-system-green'}>{rt.status}</span>
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

export default Transport;
