import React, { useState, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Line } from '@react-three/drei';
import { PlayerCoordinateTracker } from './PlayerCoordinateTracker';
import * as THREE from 'three';
import { 
  Map, 
  Users, 
  UserCheck, 
  ShieldAlert, 
  Train, 
  Play, 
  Pause, 
  Compass, 
  AlertTriangle
} from 'lucide-react';

// --- Types ---
interface IncidentPin {
  id: string;
  type: 'medical' | 'fire' | 'security' | 'transport';
  title: string;
  position: [number, number, number];
  detail: string;
}

interface Volunteer {
  id: string;
  name: string;
  position: [number, number, number];
  status: 'active' | 'idle';
  eta: string;
}

import { StadiumMesh } from './StadiumMesh';
import { CrowdParticles } from './CrowdParticles';

// --- Custom Camera Controller (Orbit Target Animator) ---
const CameraController: React.FC<{ cameraView: string }> = ({ cameraView }) => {
  const { camera } = useThree();

  useEffect(() => {
    const duration = 1000;
    const startTime = performance.now();
    
    let targetPos = new THREE.Vector3(0, 30, 38);
    if (cameraView === 'top') targetPos.set(0, 42, 0.1);
    if (cameraView === 'isometric') targetPos.set(30, 22, 30);
    if (cameraView === 'north') targetPos.set(0, 12, -36);
    if (cameraView === 'south') targetPos.set(0, 12, 36);
    if (cameraView === 'pitch') targetPos.set(0, 3, 14);

    const startPos = camera.position.clone();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Snappy spring easing
      const ease = 1 - Math.pow(1 - progress, 4);

      camera.position.lerpVectors(startPos, targetPos, ease);
      camera.lookAt(0, 0, 0);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [cameraView, camera]);

  return null;
};

// --- Real-time Player Coordinate Tracking layer ---
const PlayerTrackingLayer: React.FC<{ playbackActive: boolean }> = ({ playbackActive }) => {
  const tracker = React.useMemo(() => new PlayerCoordinateTracker(), []);

  const playersList = [
    { id: 'p-mex-10', name: 'G. Dos Santos', team: 'MEX', color: '#10b981', text: '#ffffff', number: 10 },
    { id: 'p-bra-09', name: 'Neymar Jr', team: 'BRA', color: '#eab308', text: '#1e3a5f', number: 9 },
    { id: 'p-mex-04', name: 'R. Marquez', team: 'MEX', color: '#059669', text: '#ffffff', number: 4 }
  ];

  // Ingest initial coordinates
  React.useEffect(() => {
    tracker.ingestCoordinates({ playerId: 'p-mex-10', x: 12.4, z: -4.8 });
    tracker.ingestCoordinates({ playerId: 'p-bra-09', x: 14.8, z: -2.2 });
    tracker.ingestCoordinates({ playerId: 'p-mex-04', x: 8.1, z: -8.5 });
  }, [tracker]);

  // Simulate active movement over time inside ThreeJS frame ticks
  useFrame(({ clock }) => {
    if (!playbackActive) return;
    const t = clock.getElapsedTime();

    tracker.ingestCoordinates({
      playerId: 'p-mex-10',
      x: 14 + Math.cos(t * 1.2) * 5,
      z: -3 + Math.sin(t * 0.8) * 4
    });

    tracker.ingestCoordinates({
      playerId: 'p-bra-09',
      x: 18 + Math.sin(t * 1.5) * 6,
      z: 1 + Math.cos(t * 1.1) * 5
    });

    tracker.ingestCoordinates({
      playerId: 'p-mex-04',
      x: 10 + Math.sin(t * 1.5) * 5.2,
      z: -6 + Math.cos(t * 1.1) * 4.2
    });

    // Apply linear interpolation smoothing
    tracker.updateSmoothing(0.08);
  });

  return (
    <group>
      {playersList.map((p) => {
        const pos = tracker.getPlayerPosition(p.id);
        if (!pos) return null;
        return (
          <group key={p.id} position={[pos.x, pos.y, pos.z]}>
            {/* Player 3D Disc */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.32, 0.32, 0.06, 16]} />
              <meshStandardMaterial color={p.color} roughness={0.3} metalness={0.6} />
            </mesh>
            {/* Player Ring indicator */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
              <ringGeometry args={[0.35, 0.42, 16]} />
              <meshBasicMaterial color="#ffffff" opacity={0.6} transparent />
            </mesh>

            {/* Floating Jersey / Name Badge */}
            <Html distanceFactor={14} position={[0, 0.45, 0]}>
              <div className="flex items-center gap-xs bg-obsidian-elevated/90 border border-system-border px-sm py-[2px] rounded-xs text-[9px] font-mono whitespace-nowrap shadow-high text-white">
                <span className="font-bold px-[4px] py-[1px] rounded-2xs text-[8px]" style={{ backgroundColor: p.color, color: p.text }}>
                  {p.number}
                </span>
                <span>{p.name}</span>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
};

// --- Main Interactive Viewport ---
export const LiveDigitalTwin: React.FC = () => {
  // Navigation & Layers States
  const [activeLayers, setActiveLayers] = useState({
    heatmap: true,
    crowd: true,
    volunteers: true,
    emergency: true,
    transport: false,
  });

  const [activeDeck, setActiveDeck] = useState('lower');
  const [cameraView, setCameraView] = useState('isometric');
  const [predictionOffset, setPredictionOffset] = useState(0); // 0, 5, 15, 30 min
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [roofOpen, setRoofOpen] = useState(true);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [playbackActive, setPlaybackActive] = useState(true);
  const [selectedIncident, setSelectedIncident] = useState<IncidentPin | null>(null);

  // Mock Telemetry Anchors
  const mockIncidents: IncidentPin[] = [
    { id: 'inc-1', type: 'medical', title: 'Medical Alert: Sector 4', position: [-12, 1.5, 6], detail: 'Fan dehydration reported at Turnstile 14B.' },
    { id: 'inc-2', type: 'security', title: 'Security Alert: Gate C', position: [16, 0.5, -8], detail: 'Queue bottleneck forming at auxiliary lanes.' },
  ];

  const mockVolunteers: Volunteer[] = [
    { id: 'v-1', name: 'R. Garcia', position: [-5, 0.4, 13], status: 'active', eta: '3 mins' },
    { id: 'v-2', name: 'L. Chen', position: [10, 0.4, -11], status: 'idle', eta: 'N/A' },
  ];

  const mockTransitHubs = [
    { id: 't-1', name: 'Shuttle Line A', position: [-22, 0.2, -18] as [number, number, number], status: 'FREQUENCY_HIGH' },
    { id: 't-2', name: 'Metro Azteca', position: [22, 0.2, 18] as [number, number, number], status: 'NOMINAL' },
  ];

  const toggleLayer = (layer: keyof typeof activeLayers) => {
    setActiveLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  return (
    <div className="bg-obsidian-muted border border-system-border rounded-md flex flex-col h-full relative overflow-hidden select-none shadow-high">
      
      {/* 1. HUD Header Info */}
      <div className="absolute top-md left-md z-10 flex flex-col gap-2xs bg-obsidian-elevated/80 border border-system-border/60 p-sm rounded-xs backdrop-blur-command">
        <span className="font-mono text-[9px] text-system-mutedText uppercase tracking-widest">Digital Twin</span>
        <span className="text-xs font-bold text-white tracking-wide">Azteca Arena 3D HUD</span>
        <div className="flex items-center gap-xs font-mono text-[8px] text-system-cyan mt-[2px]">
          <span className="w-1.5 h-1.5 bg-system-green rounded-full animate-ping" />
          <span>L3_RENDER_120FPS</span>
        </div>
      </div>

      {/* 2. Top Right Camera view selector */}
      <div className="absolute top-md right-md z-10 flex items-center gap-xs bg-obsidian-elevated/80 border border-system-border/60 p-xs rounded-xs backdrop-blur-command">
        <button 
          onClick={() => setCameraView('top')}
          className={`p-xs font-mono text-[9px] uppercase rounded-2xs ${cameraView === 'top' ? 'text-system-cyan font-bold bg-system-cyan/10' : 'text-system-mutedText hover:text-white'}`}
        >
          Top View
        </button>
        <div className="w-[1px] bg-system-border h-3" />
        <button 
          onClick={() => setCameraView('isometric')}
          className={`p-xs font-mono text-[9px] uppercase rounded-2xs ${cameraView === 'isometric' ? 'text-system-cyan font-bold bg-system-cyan/10' : 'text-system-mutedText hover:text-white'}`}
        >
          Isometric
        </button>
        <div className="w-[1px] bg-system-border h-3" />
        <button 
          onClick={() => setCameraView('pitch')}
          className={`p-xs font-mono text-[9px] uppercase rounded-2xs ${cameraView === 'pitch' ? 'text-system-cyan font-bold bg-system-cyan/10' : 'text-system-mutedText hover:text-white'}`}
        >
          Pitch View
        </button>
      </div>

      {/* 3. Left floor Deck levels controls */}
      <div className="absolute bottom-[80px] left-md z-10 flex flex-col gap-2xs bg-obsidian-elevated/80 border border-system-border/60 p-xs rounded-xs backdrop-blur-command">
        {['upper', 'mid', 'lower'].map((deck) => (
          <button 
            key={deck}
            onClick={() => setActiveDeck(deck)}
            className={`px-sm py-[4px] rounded-2xs text-[9px] font-mono uppercase text-left transition-colors ${
              activeDeck === deck 
                ? 'bg-system-cyan/20 border border-system-cyan/30 text-system-cyan font-bold' 
                : 'text-system-mutedText hover:text-white'
            }`}
          >
            {deck} deck
          </button>
        ))}
      </div>

      {/* 4. Left side Emergency Mode activator */}
      <div className="absolute top-[90px] left-md z-10 flex flex-col gap-xs">
        <button 
          onClick={() => setEmergencyMode(!emergencyMode)}
          className={`flex items-center gap-xs px-sm py-xs border rounded-xs font-mono text-[9px] uppercase transition-all duration-200 ${
            emergencyMode 
              ? 'bg-system-crimson border-system-crimson/40 text-white shadow-alert-glow animate-strobe font-bold' 
              : 'bg-obsidian-elevated/80 border-system-border text-system-mutedText hover:text-white hover:bg-obsidian-sub'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>{emergencyMode ? 'EMERGENCY: ACTIVE' : 'Emergency Mode'}</span>
        </button>

        <button 
          onClick={() => setRoofOpen(!roofOpen)}
          className={`flex items-center justify-center px-sm py-xs border rounded-xs font-mono text-[9px] uppercase transition-all duration-200 bg-obsidian-elevated/80 ${
            roofOpen 
              ? 'border-system-cyan/50 text-system-cyan font-bold hover:border-system-cyan' 
              : 'border-system-border text-system-mutedText hover:text-white hover:bg-obsidian-sub'
          }`}
        >
          <span>Roof: {roofOpen ? 'Retracted' : 'Closed'}</span>
        </button>
      </div>

      {/* 5. Right side Layer Selectors */}
      <div className="absolute right-md top-[56px] z-10 flex flex-col gap-xs bg-obsidian-elevated/80 border border-system-border/60 p-sm rounded-xs backdrop-blur-command">
        <span className="font-mono text-[8px] text-system-mutedText uppercase pb-2xs">Layers</span>
        
        <button 
          onClick={() => toggleLayer('heatmap')}
          className={`flex items-center gap-sm px-sm py-[5px] rounded-2xs text-[10px] font-mono border transition-colors ${
            activeLayers.heatmap 
              ? 'bg-system-purple/10 border-system-purple/20 text-system-purple' 
              : 'bg-transparent border-transparent text-system-mutedText'
          }`}
        >
          <Map className="w-3.5 h-3.5" />
          <span>Density Map</span>
        </button>

        <button 
          onClick={() => toggleLayer('crowd')}
          className={`flex items-center gap-sm px-sm py-[5px] rounded-2xs text-[10px] font-mono border transition-colors ${
            activeLayers.crowd 
              ? 'bg-system-cyan/10 border-system-cyan/20 text-system-cyan' 
              : 'bg-transparent border-transparent text-system-mutedText'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Crowd Flow</span>
        </button>

        <button 
          onClick={() => toggleLayer('volunteers')}
          className={`flex items-center gap-sm px-sm py-[5px] rounded-2xs text-[10px] font-mono border transition-colors ${
            activeLayers.volunteers 
              ? 'bg-system-green/10 border-system-green/20 text-system-green' 
              : 'bg-transparent border-transparent text-system-mutedText'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>Volunteer Locs</span>
        </button>

        <button 
          onClick={() => toggleLayer('emergency')}
          className={`flex items-center gap-sm px-sm py-[5px] rounded-2xs text-[10px] font-mono border transition-colors ${
            activeLayers.emergency 
              ? 'bg-system-crimson/10 border-system-crimson/20 text-system-crimson' 
              : 'bg-transparent border-transparent text-system-mutedText'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Alert Nodes</span>
        </button>

        <button 
          onClick={() => toggleLayer('transport')}
          className={`flex items-center gap-sm px-sm py-[5px] rounded-2xs text-[10px] font-mono border transition-colors ${
            activeLayers.transport 
              ? 'bg-system-amber/10 border-system-amber/20 text-system-amber' 
              : 'bg-transparent border-transparent text-system-mutedText'
          }`}
        >
          <Train className="w-3.5 h-3.5" />
          <span>Transit Hubs</span>
        </button>
      </div>

      {/* 6. Main 3D Canvas viewport */}
      <div className="flex-1 bg-obsidian relative min-h-[440px]">
        <Canvas camera={{ position: [30, 22, 30], fov: 42 }}>
          <fog attach="fog" args={['#050506', 35, 75]} />
          <ambientLight intensity={0.45} />
          <directionalLight position={[20, 30, 15]} intensity={1.8} />
          <directionalLight position={[-20, 20, -10]} intensity={0.6} color="#bae6fd" />
          <hemisphereLight args={['#0ea5e9', '#1e293b', 0.4]} />
          
          {/* Main 3D Stadium mesh layout */}
          <StadiumMesh activeDeck={activeDeck} emergencyMode={emergencyMode} roofOpen={roofOpen} />

          {/* Crowd Simulation particles layer */}
          {activeLayers.crowd && (
            <CrowdParticles 
              densityFactor={playbackActive ? (1 + predictionOffset * 0.05) : 0} 
              heatmapActive={activeLayers.heatmap} 
              emergencyMode={emergencyMode}
            />
          )}

          {/* Live Player Telemetry Tracking Layer */}
          <PlayerTrackingLayer playbackActive={playbackActive} />

          {/* Incident beacons (pins) layer */}
          {activeLayers.emergency && mockIncidents.map((inc) => (
            <group key={inc.id} position={inc.position}>
              {/* Beacons cylinder */}
              <mesh>
                <cylinderGeometry args={[0.02, 0.4, 3, 16]} />
                <meshBasicMaterial color="#ef4444" opacity={0.35} transparent />
              </mesh>
              {/* Beacons head */}
              <mesh position={[0, 1.5, 0]} onClick={() => setSelectedIncident(inc)}>
                <sphereGeometry args={[0.3, 16, 16]} />
                <meshBasicMaterial color="#ef4444" />
              </mesh>

              {/* Floating HTML 2D Label */}
              <Html distanceFactor={14} position={[0, 2, 0]}>
                <button 
                  onClick={() => setSelectedIncident(inc)}
                  className="bg-obsidian-elevated/90 border border-system-crimson/50 text-[9px] font-mono text-white px-sm py-[2px] rounded-2xs whitespace-nowrap hover:bg-system-crimson transition-colors"
                >
                  {inc.title}
                </button>
              </Html>
            </group>
          ))}

          {/* Volunteer positions layer */}
          {activeLayers.volunteers && mockVolunteers.map((vol) => (
            <group key={vol.id} position={vol.position}>
              <mesh>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshBasicMaterial color="#10b981" />
              </mesh>
              <Html distanceFactor={12} position={[0, 0.5, 0]}>
                <div className="bg-obsidian-muted/90 border border-system-green/40 text-[8px] font-mono text-white px-xs rounded-2xs whitespace-nowrap">
                  {vol.name} // {vol.status}
                </div>
              </Html>
            </group>
          ))}

          {/* Transit Hubs layer */}
          {activeLayers.transport && mockTransitHubs.map((hub) => (
            <group key={hub.id} position={hub.position}>
              <mesh>
                <boxGeometry args={[0.4, 0.4, 0.4]} />
                <meshBasicMaterial color="#f59e0b" />
              </mesh>
              <Html distanceFactor={12} position={[0, 0.6, 0]}>
                <div className="bg-obsidian-muted/90 border border-system-amber/40 text-[8px] font-mono text-white px-xs rounded-2xs whitespace-nowrap">
                  🚍 {hub.name} ({hub.status})
                </div>
              </Html>
            </group>
          ))}

          {/* Emergency Evacuation Spline Path */}
          {emergencyMode && (
            <Line 
              points={[[-12, 0.5, 6], [-8, 0.3, 2], [0, 0.3, -10], [16, 0.4, -18]]} 
              color="#10b981" 
              lineWidth={2.5} 
              dashed 
            />
          )}

          {/* Navigation Spline Path */}
          {selectedSeat && (
            <Line 
              points={[[-2, 0.2, -2], [2, 0.2, 2], [6, 0.2, 8]]} 
              color="#06b6d4" 
              lineWidth={3} 
            />
          )}

          {/* Orbit camera controls */}
          <OrbitControls 
            enablePan={true} 
            enableZoom={true} 
            maxPolarAngle={Math.PI / 2.05} 
            minDistance={12} 
            maxDistance={70} 
          />

          {/* Custom Camera views controls binder */}
          <CameraController cameraView={cameraView} />
        </Canvas>

        {/* Dynamic tooltip box overlay (bottom right) */}
        {selectedIncident && (
          <div className="absolute bottom-[64px] right-md z-10 w-[240px] bg-obsidian-elevated/90 border border-system-crimson rounded-xs p-sm backdrop-blur-command animate-fadeIn">
            <div className="flex items-center justify-between border-b border-system-border/40 pb-2xs mb-xs">
              <span className="font-mono text-[9px] text-system-crimson font-bold uppercase">Critical Dispatch Alert</span>
              <button onClick={() => setSelectedIncident(null)} className="text-system-mutedText hover:text-white font-mono text-[9px]">Close</button>
            </div>
            <p className="text-xs font-semibold text-white">{selectedIncident.title}</p>
            <p className="text-[11px] text-system-mutedText mt-[2px]">{selectedIncident.detail}</p>
          </div>
        )}
      </div>

      {/* 7. Bottom Playback and Prediction Timeline Bar Controls */}
      <div className="h-[48px] bg-obsidian-elevated border-t border-system-border px-lg flex items-center justify-between gap-xl shrink-0 select-none">
        
        {/* Playback simulation status triggers */}
        <div className="flex items-center gap-md shrink-0">
          <button 
            onClick={() => setPlaybackActive(!playbackActive)}
            className="p-xs bg-obsidian hover:bg-obsidian-sub border border-system-border rounded-2xs text-system-cyan hover:text-white transition-colors"
          >
            {playbackActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          
          <div className="flex items-center gap-xs font-mono text-[9px] text-system-mutedText uppercase">
            <Compass className="w-3.5 h-3.5" />
            <span>Telemetry playback</span>
          </div>
        </div>

        {/* Prediction time slider */}
        <div className="flex-1 max-w-md flex items-center gap-md">
          <span className="font-mono text-[9px] text-system-mutedText uppercase shrink-0">Prediction offset:</span>
          <input 
            type="range" 
            min="0" 
            max="3" 
            value={predictionOffset === 0 ? 0 : predictionOffset === 5 ? 1 : predictionOffset === 15 ? 2 : 3}
            onChange={(e) => {
              const vals = [0, 5, 15, 30];
              setPredictionOffset(vals[parseInt(e.target.value)]);
            }}
            className="flex-1 h-[2px] bg-obsidian border border-system-border accent-system-cyan rounded-full appearance-none cursor-pointer"
          />
          <span className="font-mono text-[10px] text-system-cyan font-bold shrink-0 min-w-[48px] text-right">
            {predictionOffset === 0 ? 'CURRENT' : `+${predictionOffset} MIN`}
          </span>
        </div>

        {/* Seat navigation mode toggle */}
        <div className="shrink-0 flex items-center gap-sm">
          <button 
            onClick={() => setSelectedSeat(selectedSeat ? null : 'SEC-104')}
            className={`px-sm py-xs border rounded-xs font-mono text-[9px] uppercase transition-colors ${
              selectedSeat 
                ? 'bg-system-cyan/20 border-system-cyan/40 text-system-cyan font-bold' 
                : 'bg-obsidian hover:bg-obsidian-sub border-system-border text-system-mutedText hover:text-white'
            }`}
          >
            {selectedSeat ? 'Seat Routing: Active' : 'Seat Route Guide'}
          </button>
        </div>
      </div>
    </div>
  );
};
export default LiveDigitalTwin;
