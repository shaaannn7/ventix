import React from 'react';
import Sidebar from '@/components/navigation/Sidebar';
import TopBar from '@/components/navigation/TopBar';
import BottomTelemetryBar from '@/components/navigation/BottomTelemetryBar';
import AICopilotSidebar from '@/components/ai/AICopilotSidebar';
import AuraFAB from '@/components/ai/AuraFAB';
import AIMissionSummary from '@/components/ai/AIMissionSummary';
import LiveDigitalTwin from '@/components/digitalTwin/LiveDigitalTwin';
import CenterHero from '@/components/dashboard/CenterHero';
import MissionStatusCard from '@/components/dashboard/MissionStatusCard';
import LiveEventTimeline from '@/components/dashboard/LiveEventTimeline';
import KPIGrid from '@/components/dashboard/KPIGrid';

const MissionControl: React.FC = () => {
  return (
    <div className="flex flex-col h-screen w-screen bg-obsidian text-white overflow-hidden font-sans select-none">
      {/* Top Navigation */}
      <TopBar />

      {/* Main workspace */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Icon Sidebar (56px) */}
        <div className="hidden md:block shrink-0 h-full">
          <Sidebar />
        </div>

        {/* Center workspace */}
        <main id="main" className="flex-1 flex gap-md p-md overflow-hidden bg-obsidian min-w-0">

          {/* Left: 3D Digital Twin hero */}
          <div className="flex-[7] h-full min-h-0 flex flex-col">
            <LiveDigitalTwin />
          </div>

          {/* Right: Command panel */}
          <div className="flex-[3] min-w-[320px] max-w-[400px] shrink-0 h-full flex flex-col gap-md overflow-y-auto scrollbar-none">
            <CenterHero />
            <AIMissionSummary />
            <LiveEventTimeline />
            <MissionStatusCard />
            <div className="pb-[100px]">
              <KPIGrid />
            </div>
          </div>
        </main>

        {/* Right AI Copilot panel */}
        <div className="hidden lg:block shrink-0 h-full">
          <AICopilotSidebar />
        </div>
      </div>

      {/* Bottom feed */}
      <BottomTelemetryBar />

      {/* Floating AI button */}
      <AuraFAB />
    </div>
  );
};

export default MissionControl;
