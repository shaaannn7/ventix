import React from 'react';
import Sidebar from '@/components/navigation/Sidebar';
import TopBar from '@/components/navigation/TopBar';
import BottomTelemetryBar from '@/components/navigation/BottomTelemetryBar';
import AICopilotSidebar from '@/components/ai/AICopilotSidebar';
import AuraFAB from '@/components/ai/AuraFAB';
const Settings: React.FC = () => {
  return (
    <div className="flex flex-col h-screen w-screen bg-obsidian text-white overflow-hidden font-sans select-none">
      <TopBar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main id="main" className="flex-1 overflow-y-auto p-md space-y-md flex flex-col scrollbar-none">
          
          {/* Header */}
          <div className="flex flex-col gap-2xs">
            <span className="font-mono text-xs text-system-cyan uppercase tracking-widest font-semibold">
              Admin Console
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-white font-sans sm:text-3xl">
              System Settings & Variables
            </h1>
            <p className="text-xs text-system-mutedText">
              Adjust multi-agent threshold constants, safety boundaries, and API integrations.
            </p>
          </div>

          {/* Settings list card */}
          <div className="bg-obsidian-muted border border-system-border rounded-md p-lg flex flex-col gap-md">
            <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">Operational parameters</span>
            
            <div className="space-y-md text-xs">
              <div className="flex justify-between items-center bg-obsidian-elevated/40 border border-system-border/60 p-sm rounded-xs">
                <div className="flex flex-col gap-2xs">
                  <span className="text-white font-semibold">AI Confidence Threshold</span>
                  <span className="text-system-mutedText">Lowest confidence score to auto-propose recommendations.</span>
                </div>
                <span className="font-mono text-system-cyan font-bold">85% Minimum</span>
              </div>

              <div className="flex justify-between items-center bg-obsidian-elevated/40 border border-system-border/60 p-sm rounded-xs">
                <div className="flex flex-col gap-2xs">
                  <span className="text-white font-semibold">Emergency Escalation Rule</span>
                  <span className="text-system-mutedText">Auto-escalate stampede index alerts if gate loads cross threshold.</span>
                </div>
                <span className="font-mono text-system-cyan font-bold">90% Queue Cap</span>
              </div>
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

export default Settings;
