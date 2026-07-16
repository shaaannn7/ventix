import React, { useState } from 'react';
import Sidebar from '@/components/navigation/Sidebar';
import TopBar from '@/components/navigation/TopBar';
import BottomTelemetryBar from '@/components/navigation/BottomTelemetryBar';
import AICopilotSidebar from '@/components/ai/AICopilotSidebar';
import AuraFAB from '@/components/ai/AuraFAB';
import ScenarioSelector from '@/components/simulation/ScenarioSelector';
import SimulationParameters from '@/components/simulation/SimulationParameters';
import SimulationCanvas from '@/components/simulation/SimulationCanvas';
import SimulationHUD from '@/components/simulation/SimulationHUD';
import WhatIfConsole from '@/components/simulation/WhatIfConsole';
import SideBySideComparison from '@/components/simulation/SideBySideComparison';
import { 
  Save, 
  Share2, 
  FileDown, 
  Play,
  Pause,
  Clock
} from 'lucide-react';

const AISimulationEngine: React.FC = () => {
  // Simulator configuration states
  const [selectedScenario, setSelectedScenario] = useState('surge');
  const [severity, setSeverity] = useState<'low' | 'medium' | 'high' | 'critical'>('high');
  const [location, setLocation] = useState('concourse_b');
  const [peopleCount, setPeopleCount] = useState(5000);
  const [weather, setWeather] = useState('clear');
  const [timeOffset, setTimeOffset] = useState(0); // 0, 5, 10, 15, 30, 60
  const [playbackActive, setPlaybackActive] = useState(true);

  const [simTime, setSimTime] = useState('pre_match');
  const [affectedArea, setAffectedArea] = useState('quadrant');
  const [durationMin, setDurationMin] = useState(30);
  const [transportStatus, setTransportStatus] = useState('nominal');

  return (
    <div className="flex flex-col h-screen w-screen bg-obsidian text-white overflow-hidden font-sans select-none">
      {/* Top Navigation HUD */}
      <TopBar />

      <div className="flex-1 flex overflow-hidden">
        {/* Left Navigation Sidebar */}
        <div className="hidden md:block shrink-0 h-full">
          <Sidebar />
        </div>

        {/* Central Workspace */}
        <main id="main" className="flex-1 overflow-y-auto p-md space-y-md flex flex-col scrollbar-none">
          {/* Headline details */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-md">
            <div className="flex flex-col gap-2xs">
              <span className="font-mono text-xs text-system-cyan uppercase tracking-widest font-semibold">
                Decision Laboratory
              </span>
              <h1 className="text-2xl font-bold tracking-tight text-white font-sans sm:text-3xl">
                AI Operations Simulation Engine
              </h1>
              <p className="text-xs text-system-mutedText">
                Test future operational conditions and safety evac models before they happen.
              </p>
            </div>

            {/* Export and Save actions bar */}
            <div className="flex items-center gap-sm shrink-0">
              <button className="flex items-center gap-xs px-md py-xs bg-obsidian hover:bg-obsidian-sub border border-system-border rounded-xs text-[11px] font-mono text-white transition-all active:scale-95">
                <Save className="w-3.5 h-3.5" />
                <span>Save Setup</span>
              </button>
              
              <button className="flex items-center gap-xs px-md py-xs bg-obsidian hover:bg-obsidian-sub border border-system-border rounded-xs text-[11px] font-mono text-white transition-all active:scale-95">
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Lab</span>
              </button>

              <button className="flex items-center gap-xs px-md py-xs bg-system-purple hover:bg-system-purple/90 border border-system-purple/40 rounded-xs text-[11px] font-mono text-white font-bold transition-all shadow-ai-glow active:scale-95">
                <FileDown className="w-3.5 h-3.5" />
                <span>Export PDF Report</span>
              </button>
            </div>
          </div>

          {/* Scenario selectors cards */}
          <ScenarioSelector selectedScenario={selectedScenario} onSelect={setSelectedScenario} />

          {/* Parameters configuration */}
          <SimulationParameters 
            severity={severity} 
            setSeverity={setSeverity}
            location={location}
            setLocation={setLocation}
            peopleCount={peopleCount}
            setPeopleCount={setPeopleCount}
            weather={weather}
            setWeather={setWeather}
            simTime={simTime}
            setSimTime={setSimTime}
            affectedArea={affectedArea}
            setAffectedArea={setAffectedArea}
            durationMin={durationMin}
            setDurationMin={setDurationMin}
            transportStatus={transportStatus}
            setTransportStatus={setTransportStatus}
          />

          {/* 3D Simulation Canvas and bottom playback controls */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-md items-stretch">
            {/* 3D Canvas */}
            <div className="xl:col-span-8 h-full min-h-[380px] flex flex-col gap-sm">
              <div className="flex-1">
                <SimulationCanvas scenario={selectedScenario} severity={severity} timeOffset={timeOffset} />
              </div>
              
              {/* Timeline simulation playback toolbar */}
              <div className="h-[48px] bg-obsidian-muted border border-system-border rounded-xs px-md flex items-center justify-between gap-md shrink-0">
                <div className="flex items-center gap-md shrink-0">
                  <button 
                    onClick={() => setPlaybackActive(!playbackActive)}
                    className="p-xs bg-obsidian hover:bg-obsidian-sub border border-system-border rounded-xs text-system-cyan hover:text-white transition-colors"
                  >
                    {playbackActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                  <span className="font-mono text-[9px] text-system-mutedText uppercase">Simulation Timeline</span>
                </div>

                {/* Time slider */}
                <div className="flex-1 max-w-sm flex items-center gap-md">
                  <input 
                    type="range" 
                    min="0" 
                    max="5" 
                    value={timeOffset === 0 ? 0 : timeOffset === 5 ? 1 : timeOffset === 10 ? 2 : timeOffset === 15 ? 3 : timeOffset === 30 ? 4 : 5}
                    onChange={(e) => {
                      const offsets = [0, 5, 10, 15, 30, 60];
                      setTimeOffset(offsets[parseInt(e.target.value)]);
                    }}
                    className="flex-1 h-[2px] bg-obsidian border border-system-border accent-system-cyan rounded-full appearance-none cursor-pointer"
                  />
                  <div className="flex items-center gap-xs font-mono text-[9px] text-system-cyan font-bold shrink-0 min-w-[56px] justify-end">
                    <Clock className="w-3 h-3" />
                    <span>+{timeOffset} MIN</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison Side HUD (4 cols) */}
            <div className="xl:col-span-4 h-full min-h-[380px]">
              <SideBySideComparison />
            </div>
          </div>

          {/* AI Consequence metrics HUD */}
          <SimulationHUD scenario={selectedScenario} severity={severity} />

          {/* What-If Custom Simulator Terminal */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-md pt-xs">
            <div className="lg:col-span-12">
              <WhatIfConsole />
            </div>
          </div>
        </main>

        {/* Right Sidebar */}
        <div className="hidden lg:block shrink-0 h-full">
          <AICopilotSidebar />
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <BottomTelemetryBar />

      {/* Floating FAB */}
      <AuraFAB />
    </div>
  );
};

export default AISimulationEngine;
