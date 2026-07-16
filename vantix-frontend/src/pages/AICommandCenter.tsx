import React, { useState } from 'react';
import Sidebar from '@/components/navigation/Sidebar';
import TopBar from '@/components/navigation/TopBar';
import BottomTelemetryBar from '@/components/navigation/BottomTelemetryBar';
import AICopilotSidebar from '@/components/ai/AICopilotSidebar';
import AuraFAB from '@/components/ai/AuraFAB';
import LiveAIStream from '@/components/ai/LiveAIStream';
import MissionCommander from '@/components/ai/MissionCommander';
import DecisionCards from '@/components/ai/DecisionCards';
import AIThinkingPipeline from '@/components/ai/AIThinkingPipeline';
import AIReasoningPanel from '@/components/ai/AIReasoningPanel';
import ConfidenceEngine from '@/components/ai/ConfidenceEngine';
import WhatIfSimulator from '@/components/ai/WhatIfSimulator';
import MultiAgentView from '@/components/ai/MultiAgentView';
import AIMemory from '@/components/ai/AIMemory';
import QuickPrompts from '@/components/ai/QuickPrompts';
import VoiceMode from '@/components/ai/VoiceMode';

const AICommandCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'orchestrator' | 'simulation' | 'reasoning'>('orchestrator');

  return (
    <div className="flex flex-col h-screen w-screen bg-obsidian text-white overflow-hidden font-sans select-none">
      {/* Top Bar HUD */}
      <TopBar />

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <div className="hidden md:block shrink-0 h-full">
          <Sidebar />
        </div>

        {/* Center Workspace */}
        <main id="main" className="flex-1 flex gap-md p-md overflow-hidden bg-obsidian">
          {/* Left Column: Decision Core (60% width) */}
          <div className="flex-[6] h-full min-h-0 flex flex-col gap-md overflow-y-auto scrollbar-none pr-xs">
            {/* Headline */}
            <div className="flex flex-col gap-2xs">
              <span className="font-mono text-xs text-system-purple uppercase tracking-widest font-semibold">
                Operational Brain HUD
              </span>
              <h1 className="text-2xl font-bold tracking-tight text-white font-sans sm:text-3xl">
                AI Decision Intelligence Center
              </h1>
              <p className="text-xs text-system-mutedText">
                Real-time multi-agent orchestration console & predictive simulation deck.
              </p>
            </div>

            {/* Active background process streamer */}
            <LiveAIStream />

            {/* Mission Commander global orchestrated recommendation */}
            <MissionCommander />
            
            {/* Decision Cards list of triages */}
            <div className="space-y-sm">
              <span className="font-mono text-[9px] text-system-mutedText uppercase tracking-widest block">
                Pending Dispatch Actions
              </span>
              <DecisionCards />
            </div>

            {/* Pipeline progress map */}
            <AIThinkingPipeline />
          </div>

          {/* Right Column: Diagnostic & Simulator Deck (40% width) */}
          <div className="flex-[4] min-w-[320px] max-w-[420px] shrink-0 h-full flex flex-col bg-obsidian-muted border border-system-border rounded-md overflow-hidden">
            {/* Tab selector menu */}
            <div className="flex border-b border-system-border/60 shrink-0 bg-obsidian-elevated/40">
              <button 
                onClick={() => setActiveTab('orchestrator')}
                className={`flex-1 py-md font-mono text-[9px] uppercase tracking-wider text-center border-b-2 transition-all ${activeTab === 'orchestrator' ? 'text-system-purple font-bold border-system-purple bg-system-purple/5' : 'text-system-mutedText border-transparent hover:text-white'}`}
              >
                Orchestrator
              </button>
              <button 
                onClick={() => setActiveTab('simulation')}
                className={`flex-1 py-md font-mono text-[9px] uppercase tracking-wider text-center border-b-2 transition-all ${activeTab === 'simulation' ? 'text-system-cyan font-bold border-system-cyan bg-system-cyan/5' : 'text-system-mutedText border-transparent hover:text-white'}`}
              >
                Simulation
              </button>
              <button 
                onClick={() => setActiveTab('reasoning')}
                className={`flex-1 py-md font-mono text-[9px] uppercase tracking-wider text-center border-b-2 transition-all ${activeTab === 'reasoning' ? 'text-system-green font-bold border-system-green bg-system-green/5' : 'text-system-mutedText border-transparent hover:text-white'}`}
              >
                Reasoning & Logs
              </button>
            </div>

            {/* Tab viewports */}
            <div className="flex-1 overflow-y-auto p-md pb-[100px] space-y-md scrollbar-none">
              {activeTab === 'orchestrator' && (
                <>
                  <ConfidenceEngine />
                  <MultiAgentView />
                </>
              )}
              {activeTab === 'simulation' && (
                <>
                  <VoiceMode />
                  <WhatIfSimulator />
                </>
              )}
              {activeTab === 'reasoning' && (
                <>
                  <AIReasoningPanel />
                  <QuickPrompts />
                  <AIMemory />
                </>
              )}
            </div>
          </div>
        </main>

        {/* Right Sidebar */}
        <div className="hidden lg:block shrink-0 h-full">
          <AICopilotSidebar />
        </div>
      </div>

      {/* Bottom Telemetry ticker strip */}
      <BottomTelemetryBar />

      {/* Floating Aura FAB */}
      <AuraFAB />
    </div>
  );
};

export default AICommandCenter;
