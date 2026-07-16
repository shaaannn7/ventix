import React from 'react';
import Sidebar from '@/components/navigation/Sidebar';
import TopBar from '@/components/navigation/TopBar';
import BottomTelemetryBar from '@/components/navigation/BottomTelemetryBar';
import AICopilotSidebar from '@/components/ai/AICopilotSidebar';
import AuraFAB from '@/components/ai/AuraFAB';
const Sustainability: React.FC = () => {
  return (
    <div className="flex flex-col h-screen w-screen bg-obsidian text-white overflow-hidden font-sans select-none">
      <TopBar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main id="main" className="flex-1 overflow-y-auto p-md space-y-md flex flex-col scrollbar-none">
          
          {/* Header */}
          <div className="flex flex-col gap-2xs">
            <span className="font-mono text-xs text-system-green uppercase tracking-widest font-semibold">
              Resource Optimization
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-white font-sans sm:text-3xl">
              Sustainability & Resource HUD
            </h1>
            <p className="text-xs text-system-mutedText">
              Real-time energy power meters, water flow pressures, and smart carbon offset calculations.
            </p>
          </div>

          {/* KPI meters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm flex flex-col gap-2xs">
              <span className="text-[10px] text-system-mutedText uppercase font-mono">Grid Power Load</span>
              <span className="text-lg font-bold text-white tracking-wide">840 kW/h</span>
            </div>
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm flex flex-col gap-2xs">
              <span className="text-[10px] text-system-mutedText uppercase font-mono">Water Flow pressure</span>
              <span className="text-lg font-bold text-system-cyan tracking-wide">4.2 bar</span>
            </div>
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm flex flex-col gap-2xs">
              <span className="text-[10px] text-system-mutedText uppercase font-mono">Carbon offset index</span>
              <span className="text-lg font-bold text-system-green tracking-wide">94kg CO₂ offset</span>
            </div>
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm flex flex-col gap-2xs">
              <span className="text-[10px] text-system-mutedText uppercase font-mono">Waste tonnage recycling</span>
              <span className="text-lg font-bold text-system-purple tracking-wide">74% Recycle rate</span>
            </div>
          </div>

          {/* Detail card */}
          <div className="bg-obsidian-muted border border-system-border rounded-md p-lg flex flex-col gap-md">
            <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">Resource Allocation status</span>
            <p className="text-xs text-system-mutedText leading-relaxed">
              Azteca Arena power grids are operating within optimized bounds. Standard sustainability presets (low-power intermissions, LED dimmers) have offset local carbon outputs by an estimated 14% relative to standard matches.
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

export default Sustainability;
