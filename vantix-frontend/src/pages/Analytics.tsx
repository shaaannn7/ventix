import React from 'react';
import Sidebar from '@/components/navigation/Sidebar';
import TopBar from '@/components/navigation/TopBar';
import BottomTelemetryBar from '@/components/navigation/BottomTelemetryBar';
import AICopilotSidebar from '@/components/ai/AICopilotSidebar';
import AuraFAB from '@/components/ai/AuraFAB';
import { 
  Download
} from 'lucide-react';

const Analytics: React.FC = () => {
  return (
    <div className="flex flex-col h-screen w-screen bg-obsidian text-white overflow-hidden font-sans select-none">
      <TopBar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main id="main" className="flex-1 overflow-y-auto p-md space-y-md flex flex-col scrollbar-none">
          
          {/* Header */}
          <div className="flex flex-col gap-2xs">
            <span className="font-mono text-xs text-system-cyan uppercase tracking-widest font-semibold">
              Historical Diagnostics
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-white font-sans sm:text-3xl">
              Historical reports & analytics
            </h1>
            <p className="text-xs text-system-mutedText">
              Review KPI timelines, queue trends, and volunteer assignment efficiency logs.
            </p>
          </div>

          {/* KPI grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-md">
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm flex flex-col gap-2xs">
              <span className="text-[10px] text-system-mutedText uppercase font-mono">Operations Scorecard</span>
              <span className="text-lg font-bold text-white tracking-wide">94.2 / 100</span>
            </div>
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm flex flex-col gap-2xs">
              <span className="text-[10px] text-system-mutedText uppercase font-mono">Response wait delta</span>
              <span className="text-lg font-bold text-system-cyan tracking-wide">-4.8 mins avg</span>
            </div>
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm flex flex-col gap-2xs">
              <span className="text-[10px] text-system-mutedText uppercase font-mono">Peak load capacity</span>
              <span className="text-lg font-bold text-system-purple tracking-wide">94% at Gate B4</span>
            </div>
          </div>

          {/* Analytics files download options */}
          <div className="bg-obsidian-muted border border-system-border rounded-md p-lg flex flex-col gap-md">
            <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">Export Historical Analytics reports</span>
            <div className="flex flex-wrap gap-sm">
              <button className="flex items-center gap-xs px-md py-xs bg-obsidian hover:bg-obsidian-sub border border-system-border rounded-xs text-[11px] font-mono text-white transition-all active:scale-95">
                <Download className="w-3.5 h-3.5" />
                <span>Export Match Day 14 logs</span>
              </button>
              <button className="flex items-center gap-xs px-md py-xs bg-system-cyan hover:bg-system-cyan/90 border border-system-cyan/30 text-obsidian rounded-xs text-[11px] font-mono font-bold transition-all active:scale-95">
                <Download className="w-3.5 h-3.5" />
                <span>Download Executive Summary PDF</span>
              </button>
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

export default Analytics;
