import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from '@/components/navigation/Sidebar';
import TopBar from '@/components/navigation/TopBar';
import BottomTelemetryBar from '@/components/navigation/BottomTelemetryBar';
import AICopilotSidebar from '@/components/ai/AICopilotSidebar';
import AuraFAB from '@/components/ai/AuraFAB';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import StadiumMesh from '@/components/digitalTwin/StadiumMesh';

import { 
  ShieldAlert, 
  Sliders, 
  Terminal, 
  Volume2, 
  UserCheck, 
  Play,
  RotateCcw
} from 'lucide-react';

// --- Types ---
type EmergencyType = 'fire' | 'medical' | 'crowd_surge' | 'security_threat' | 'evacuation';

interface IncidentConfig {
  type: EmergencyType;
  title: string;
  severity: 'LOW' | 'HIGH' | 'CRITICAL';
  sector: string;
  weather: string;
  crowdSize: string;
}

interface Resource {
  name: string;
  role: string;
  status: 'IDLE' | 'DISPATCHED' | 'ON_SCENE';
  eta: string;
}

export const EmergencyCenter: React.FC = () => {
  // 1. Simulation States
  const [incident, setIncident] = useState<IncidentConfig>({
    type: 'fire',
    title: 'Thermal Alarm: Sector West Lower',
    severity: 'CRITICAL',
    sector: 'Sector West',
    weather: 'Sunny / Dry',
    crowdSize: '82,400 (Max Capacity)',
  });

  const [simulationActive, setSimulationActive] = useState(true);
  const [timeline, setTimeline] = useState<string[]>([
    '15:02:14 - SCADA Thermal Sensor #104 triggered (94°C)',
    '15:02:40 - AI Mission Commander flags potential Fire Incident',
    '15:03:00 - Automated alarm broadcast to Sector West volunteers',
  ]);

  // Language translations state
  const [paLanguage, setPaLanguage] = useState<'EN' | 'ES' | 'FR' | 'AR' | 'HI' | 'PT'>('EN');
  const [broadcastLogged, setBroadcastLogged] = useState(false);

  // Command control locks
  const [hvacLocked, setHvacLocked] = useState(false);
  const [evacActive, setEvacActive] = useState(false);
  const [exitsOpened, setExitsOpened] = useState(false);

  // Dynamic resources list
  const [resources, setResources] = useState<Resource[]>([
    { name: 'Fire Squad 4B', role: 'Extinguishment', status: 'DISPATCHED', eta: '1.8 mins' },
    { name: 'Medical Response A', role: 'Triage / First Aid', status: 'ON_SCENE', eta: '0 mins' },
    { name: 'Sector West Security', role: 'Perimeter Block', status: 'DISPATCHED', eta: '0.5 mins' },
    { name: 'Concourse Volunteers', role: 'Egress Guidance', status: 'IDLE', eta: 'N/A' },
  ]);

  // Multilingual PA Announcements dictionary
  const announcements = {
    EN: 'ATTENTION: Please evacuate Sector West immediately using exit routes. Follow stadium host instructions.',
    ES: 'ATENCIÓN: Por favor evacúe el Sector Oeste de inmediato usando las rutas de salida. Siga las instrucciones.',
    FR: 'ATTENTION: Veuillez évacuer le secteur ouest immédiatement par les voies de sortie. Suivez les consignes.',
    AR: 'انتباه: يرجى إخلاء القطاع الغربي فوراً باستخدام طرق الخروج. اتبع تعليمات موظفي الملعب.',
    HI: 'ध्यान दें: कृपया निकास मार्गों का उपयोग करके तुरंत सेक्टर पश्चिम को खाली करें। स्टाफ के निर्देशों का पालन करें।',
    PT: 'ATENÇÃO: Por favor, evacue o Setor Oeste imediatamente usando as rotas de saída. Siga as instruções.',
  };

  // AI Recommendation engine computed properties
  const aiReasoning = useMemo(() => {
    switch (incident.type) {
      case 'fire':
        return {
          summary: 'High-heat reading from structural columns. Thermal progression maps suggest containment risk if not locked down within 3 minutes.',
          confidence: '96% (Verified by 3 CCTV streams + smoke sensors)',
          riskPeople: 'Approx. 4,200 seats in immediate block',
          outcome: 'Controlled containment in 8 minutes with local HVAC exhaust activation.',
          evidence: ['CCTV Camera 104', 'SCADA Column Terminals', 'Sector Ticket Registry', 'Weather: Dry winds'],
          actions: ['Deploy Fire Squad 4B', 'Shutdown local HVAC circulation', 'Unlock Emergency Exit Gates 12-14'],
        };
      case 'medical':
        return {
          summary: 'Cardiac distress reported at Gate C concession queue. Direct proximity to AED Station 12.',
          confidence: '98% (Volunteer mobile dispatch verification)',
          riskPeople: 'Individual critical event',
          outcome: 'Stabilization on-site; ambulance arrival at VIP service entrance tunnel.',
          evidence: ['Volunteer Staff App', 'Concourse C WiFi beacon telemetry', 'AED Station status log'],
          actions: ['Dispatch Medical Response A', 'Deploy local Gate C host with AED', 'Clear VIP service tunnel access'],
        };
      case 'crowd_surge':
        return {
          summary: 'High-density pinch point detected at Gate C main ingress line. Queue length exceeds safe boundary limits.',
          confidence: '91% (Optical crowd flow count)',
          riskPeople: '850+ fans in queue boundary',
          outcome: 'Ingress flow stabilization within 6 minutes by redirecting traffic to Gate D.',
          evidence: ['Ingress CCTV Counters', 'WiFi access point density maps', 'Gate turnstile scan rates'],
          actions: ['Redirect new arrivals to Gate D', 'Deploy auxiliary lane barriers', 'Broadcast transit delay announcements'],
        };
      case 'security_threat':
        return {
          summary: 'Unattended parcel reported in suite level corridor. Visual classification flags suspicious material.',
          confidence: '84% (CCTV Object Analysis)',
          riskPeople: 'Suite Level Sectors 12-15',
          outcome: 'Perimeter isolation completed; police K9 dispatch to verify contents.',
          evidence: ['CCTV Object Detection', 'Suite entry RFID log', 'Incident reports registry'],
          actions: ['Lockdown Suite Corridors 12-15', 'Deploy Security Patrol B', 'Request Police K9 dispatch'],
        };
      case 'evacuation':
        return {
          summary: 'Evacuation command initiated. Safe assembly routing requires immediate clear paths across North/South plazas.',
          confidence: '100% (Manual Operator Trigger)',
          riskPeople: 'Entire Stadium Seating Bowl',
          outcome: 'Safe egress completed in 11.2 minutes under guided pathing.',
          evidence: ['Operator Dispatch Override', 'Active GPS crowd flow arrays', 'Wind: Nominal'],
          actions: ['Open all Emergency Gates', 'Strobe lighting activation', 'PA Broadcast loop initialization'],
        };
    }
  }, [incident.type]);

  // Auto-simulation log generation loop
  useEffect(() => {
    if (!simulationActive) return;
    const interval = setInterval(() => {
      const time = new Date().toLocaleTimeString();
      let log = '';
      if (incident.type === 'fire') {
        const logs = [
          `[${time}] - Fire containment squad reports ingress to Concourse B`,
          `[${time}] - Main Arches temperature stabilizes at 34°C`,
          `[${time}] - Local Sector West crowd evacuated successfully`,
        ];
        log = logs[Math.floor(Math.random() * logs.length)];
      } else if (incident.type === 'medical') {
        const logs = [
          `[${time}] - AED Station 12 reports box opened`,
          `[${time}] - Medical squad confirms patient contact and vitals tracking`,
          `[${time}] - Ambulance cleared through North Plaza VIP barrier`,
        ];
        log = logs[Math.floor(Math.random() * logs.length)];
      } else {
        const logs = [
          `[${time}] - AI monitors sector crowd flow vector updates`,
          `[${time}] - Auxiliary staff deployed to security lines`,
        ];
        log = logs[Math.floor(Math.random() * logs.length)];
      }
      setTimeline(t => [log, ...t].slice(0, 8));
    }, 9000);

    return () => clearInterval(interval);
  }, [simulationActive, incident.type]);

  // Handle resource state dispatch changes
  const handleDispatch = (index: number) => {
    const updated = [...resources];
    updated[index].status = updated[index].status === 'IDLE' ? 'DISPATCHED' : 'ON_SCENE';
    if (updated[index].status === 'DISPATCHED') {
      updated[index].eta = '1.2 mins';
    }
    setResources(updated);
    setTimeline(t => [
      `15:08:12 - Emergency Dispatch: ${updated[index].name} status set to ${updated[index].status}`,
      ...t
    ]);
  };

  // Broadcast PA
  const handleBroadcast = () => {
    setBroadcastLogged(true);
    setTimeline(t => [
      `15:09:00 - PA Broadcast Strobe: [${paLanguage}] "${announcements[paLanguage]}"`,
      ...t
    ]);
    setTimeout(() => setBroadcastLogged(false), 2000);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-obsidian text-white overflow-hidden font-sans select-none">
      <TopBar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        
        {/* Main HUD workspace */}
        <main className="flex-1 flex overflow-hidden p-md gap-md">
          
          {/* LEFT PANEL: Crisis Simulator & AI Mission Commander */}
          <div className="w-1/3 flex flex-col gap-md overflow-y-auto pr-2xs scrollbar-none">
            
            {/* 1. Simulator Panel */}
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-md flex flex-col gap-sm">
              <div className="flex items-center gap-xs text-system-cyan font-mono text-xs uppercase font-bold">
                <Sliders className="w-3.5 h-3.5" />
                <span>Crisis Simulation Console</span>
              </div>
              
              <div className="grid grid-cols-2 gap-xs">
                <div>
                  <label className="text-[8px] text-system-mutedText uppercase font-mono block mb-[2px]">Incident Type</label>
                  <select
                    value={incident.type}
                    onChange={(e) => {
                      const val = e.target.value as EmergencyType;
                      setIncident({
                        ...incident,
                        type: val,
                        title: val === 'fire' ? 'Thermal Alarm: Sector West Lower' :
                               val === 'medical' ? 'Cardiac Case: Turnstile 14B' :
                               val === 'crowd_surge' ? 'Density Warning: Gate C Ingress' :
                               val === 'security_threat' ? 'Unattended Parcel: Sector East' :
                               'Evacuation Strobe triggered',
                      });
                      setTimeline([`15:05:00 - Simulation initialized: ${val.toUpperCase()}`]);
                    }}
                    className="w-full bg-obsidian border border-system-border rounded-xs px-xs py-[3px] text-[10px] font-mono text-white focus:outline-none focus:border-system-cyan"
                  >
                    <option value="fire">Fire / Thermal</option>
                    <option value="medical">Medical Case</option>
                    <option value="crowd_surge">Crowd Surge</option>
                    <option value="security_threat">Security Threat</option>
                    <option value="evacuation">Full Evacuation</option>
                  </select>
                </div>

                <div>
                  <label className="text-[8px] text-system-mutedText uppercase font-mono block mb-[2px]">Severity</label>
                  <select
                    value={incident.severity}
                    onChange={(e) => setIncident({ ...incident, severity: e.target.value as any })}
                    className="w-full bg-obsidian border border-system-border rounded-xs px-xs py-[3px] text-[10px] font-mono text-white focus:outline-none focus:border-system-cyan"
                  >
                    <option value="LOW">Low</option>
                    <option value="HIGH">High</option>
                    <option value="CRITICAL">Critical</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-xs mt-2xs">
                <button
                  onClick={() => setSimulationActive(!simulationActive)}
                  className={`flex-1 flex items-center justify-center gap-2xs py-xs rounded-xs font-mono text-[9px] uppercase border transition-all ${
                    simulationActive 
                      ? 'bg-system-cyan/20 border-system-cyan/40 text-system-cyan font-bold'
                      : 'bg-obsidian border-system-border text-system-mutedText hover:text-white'
                  }`}
                >
                  <Play className="w-3 h-3" />
                  <span>{simulationActive ? 'Running' : 'Paused'}</span>
                </button>
                
                <button
                  onClick={() => {
                    setTimeline([`15:05:00 - Simulation reset.`]);
                    setEvacActive(false);
                    setExitsOpened(false);
                    setHvacLocked(false);
                  }}
                  className="px-sm py-xs bg-obsidian hover:bg-obsidian-sub border border-system-border rounded-xs font-mono text-[9px] uppercase text-system-mutedText hover:text-white transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 2. AI Mission Commander */}
            <div className="bg-obsidian-muted border border-system-crimson/30 rounded-xs p-md flex flex-col gap-sm shadow-alert-glow">
              <div className="flex items-center gap-xs text-system-crimson font-mono text-xs uppercase font-bold">
                <ShieldAlert className="w-3.5 h-3.5 animate-pulse" />
                <span>AI Mission Commander</span>
              </div>

              {/* Triage summary */}
              <div className="bg-obsidian-elevated/40 border border-system-border/60 p-sm rounded-xs flex flex-col gap-2xs">
                <span className="text-[8px] font-mono text-system-crimson font-bold uppercase">Dynamic Crisis Assessment</span>
                <p className="text-[11px] text-white font-semibold leading-relaxed">{aiReasoning.summary}</p>
                
                <div className="grid grid-cols-2 gap-xs border-t border-system-border/40 mt-xs pt-xs font-mono text-[8px] text-system-mutedText">
                  <div>
                    <span>Confidence Score:</span>
                    <span className="block text-system-green font-bold">{aiReasoning.confidence}</span>
                  </div>
                  <div>
                    <span>Affected Sector:</span>
                    <span className="block text-white font-bold">{incident.sector}</span>
                  </div>
                </div>
              </div>

              {/* Explainable AI Reasoning */}
              <div className="flex flex-col gap-xs">
                <span className="text-[9px] font-mono text-system-cyan uppercase font-bold">Evidence Checked (Explainable AI)</span>
                <div className="flex flex-wrap gap-2xs">
                  {aiReasoning.evidence.map((ev, idx) => (
                    <span key={idx} className="bg-obsidian border border-system-border px-xs py-[2px] rounded-2xs text-[8px] font-mono text-system-mutedText">
                      🔍 {ev}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI Recommended Actions */}
              <div className="flex flex-col gap-xs border-t border-system-border/40 pt-sm">
                <span className="text-[9px] font-mono text-system-crimson uppercase font-bold">Immediate AI Action Log</span>
                <div className="space-y-xs">
                  {aiReasoning.actions.map((act, idx) => (
                    <div key={idx} className="flex items-center gap-xs text-[10px] text-white">
                      <input type="checkbox" defaultChecked className="accent-system-crimson w-3 h-3 cursor-pointer" />
                      <span className="font-medium">{act}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CENTER PANEL: Live 3D Digital Twin Viewport */}
          <div className="flex-1 flex flex-col border border-system-border rounded-xs overflow-hidden bg-obsidian-muted relative">
            {/* Viewport scanline grid overlay */}
            <div className="absolute inset-0 pointer-events-none z-10 opacity-5 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%]" />

            {/* Viewport header HUD */}
            <div className="h-[40px] bg-obsidian border-b border-system-border px-md flex items-center justify-between z-10">
              <div className="flex items-center gap-sm">
                <div className="w-2 h-2 rounded-full bg-system-crimson animate-ping" />
                <span className="font-mono text-xs font-bold text-white tracking-wide uppercase">Tactical 3D Command View</span>
              </div>
              <span className="font-mono text-[9px] text-system-mutedText">SECTOR: WEST-L3</span>
            </div>

            {/* 3D Canvas container */}
            <div className="flex-1 bg-obsidian relative min-h-[300px]">
              <Canvas camera={{ position: [30, 22, 30], fov: 42 }}>
                <fog attach="fog" args={['#050506', 35, 75]} />
                <StadiumMesh activeDeck="upper" emergencyMode={true} roofOpen={false} />
                
                {/* Visual incident locator beacon */}
                <group position={[-12, 1.5, 6]}>
                  <mesh>
                    <cylinderGeometry args={[0.02, 0.6, 6, 16]} />
                    <meshBasicMaterial color="#ef4444" opacity={0.35} transparent />
                  </mesh>
                  <mesh position={[0, 3, 0]}>
                    <sphereGeometry args={[0.4, 16, 16]} />
                    <meshBasicMaterial color="#ef4444" />
                  </mesh>
                </group>

                <OrbitControls 
                  enablePan={true} 
                  enableZoom={true} 
                  maxPolarAngle={Math.PI / 2.05} 
                  minDistance={15} 
                  maxDistance={65} 
                />
              </Canvas>

              {/* Viewport floating alert marker */}
              <div className="absolute top-sm left-sm bg-system-crimson/20 border border-system-crimson text-system-crimson text-[9px] font-mono px-sm py-[3px] rounded-xs font-bold shadow-alert-glow">
                BEACON DETECTED: SECTOR WEST (X: -12, Z: 6)
              </div>
            </div>

            {/* Tactical Action Command Panel (Footer of 3D view) */}
            <div className="bg-obsidian border-t border-system-border p-sm grid grid-cols-4 gap-xs z-10">
              <button
                onClick={() => {
                  setEvacActive(!evacActive);
                  setTimeline(t => [`[EVENT] - Evacuation protocol state set to ${!evacActive}`, ...t]);
                }}
                className={`py-[6px] rounded-xs font-mono text-[9px] uppercase border transition-all ${
                  evacActive 
                    ? 'bg-system-crimson text-white border-system-crimson shadow-alert-glow font-bold animate-pulse'
                    : 'bg-obsidian hover:bg-obsidian-sub border-system-border text-system-mutedText hover:text-white'
                }`}
              >
                🚨 Evacuation
              </button>

              <button
                onClick={() => {
                  setExitsOpened(!exitsOpened);
                  setTimeline(t => [`[EVENT] - Emergency Exit Gates state set to ${!exitsOpened}`, ...t]);
                }}
                className={`py-[6px] rounded-xs font-mono text-[9px] uppercase border transition-all ${
                  exitsOpened 
                    ? 'bg-system-green/20 text-system-green border-system-green/40 font-bold'
                    : 'bg-obsidian hover:bg-obsidian-sub border-system-border text-system-mutedText hover:text-white'
                }`}
              >
                🔓 Open Exits
              </button>

              <button
                onClick={() => {
                  setHvacLocked(!hvacLocked);
                  setTimeline(t => [`[EVENT] - HVAC local exhaust state set to ${!hvacLocked}`, ...t]);
                }}
                className={`py-[6px] rounded-xs font-mono text-[9px] uppercase border transition-all ${
                  hvacLocked 
                    ? 'bg-system-amber/20 text-system-amber border-system-amber/40 font-bold'
                    : 'bg-obsidian hover:bg-obsidian-sub border-system-border text-system-mutedText hover:text-white'
                }`}
              >
                💨 Lock HVAC
              </button>

              <button
                onClick={() => {
                  setTimeline(t => [`15:09:42 - Dispatch trigger: Police backup call sent`, ...t]);
                }}
                className="py-[6px] bg-obsidian hover:bg-obsidian-sub border border-system-border rounded-xs font-mono text-[9px] uppercase text-system-mutedText hover:text-white transition-colors"
              >
                👮 Request Police
              </button>
            </div>
          </div>

          {/* RIGHT PANEL: Live Timeline & Resource Logistics */}
          <div className="w-1/3 flex flex-col gap-md pb-[100px] overflow-y-auto pl-2xs scrollbar-none">
            
            {/* 1. Live Timeline log */}
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-md flex flex-col gap-sm flex-1 max-h-[300px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-xs text-white font-mono text-xs uppercase font-bold">
                  <Terminal className="w-3.5 h-3.5 text-system-cyan" />
                  <span>Tactical Incident Log</span>
                </div>
                <span className="font-mono text-[8px] bg-system-cyan/20 text-system-cyan px-[4px] py-[1px] rounded-2xs">LIVE FEED</span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-xs font-mono text-[9px] scrollbar-none pr-xs">
                {timeline.map((log, i) => (
                  <div key={i} className="text-system-mutedText border-b border-system-border/20 pb-[2px] leading-relaxed">
                    <span className="text-white font-semibold">{log}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Multilingual Announcements */}
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-md flex flex-col gap-sm">
              <div className="flex items-center gap-xs text-white font-mono text-xs uppercase font-bold">
                <Volume2 className="w-3.5 h-3.5 text-system-purple" />
                <span>Multilingual PA Broadcast</span>
              </div>

              <div className="flex gap-2xs font-mono text-[9px]">
                {['EN', 'ES', 'FR', 'AR', 'HI', 'PT'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setPaLanguage(lang as any)}
                    className={`px-[5px] py-[2px] rounded-2xs border ${
                      paLanguage === lang 
                        ? 'bg-system-purple/20 border-system-purple/40 text-system-purple font-bold'
                        : 'bg-obsidian border-system-border text-system-mutedText hover:text-white'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              <div className="bg-obsidian-elevated/40 border border-system-border/60 p-sm rounded-xs text-[10px] italic text-white min-h-[48px] leading-relaxed">
                "{announcements[paLanguage]}"
              </div>

              <button
                onClick={handleBroadcast}
                className={`py-xs rounded-xs font-mono text-[9px] uppercase border transition-all duration-200 ${
                  broadcastLogged 
                    ? 'bg-system-green text-white border-system-green font-bold shadow-high'
                    : 'bg-system-purple/20 hover:bg-system-purple/30 border-system-purple/40 text-system-purple hover:text-white'
                }`}
              >
                {broadcastLogged ? '✓ Broadcasted' : '📢 Broadcast to Stadium PA'}
              </button>
            </div>

            {/* 3. Resource Management */}
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-md flex flex-col gap-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-xs text-white font-mono text-xs uppercase font-bold">
                  <UserCheck className="w-3.5 h-3.5 text-system-green" />
                  <span>Crisis Responders Logistics</span>
                </div>
                <span className="font-mono text-[8px] text-system-mutedText">4 UNIT STATUS</span>
              </div>

              <div className="space-y-xs">
                {resources.map((res, i) => (
                  <div key={i} className="bg-obsidian border border-system-border/40 p-xs rounded-xs flex items-center justify-between text-[10px]">
                    <div className="flex flex-col gap-[1px]">
                      <span className="font-semibold text-white">{res.name}</span>
                      <span className="text-[8px] font-mono text-system-mutedText uppercase">{res.role}</span>
                    </div>

                    <div className="flex items-center gap-md">
                      <div className="text-right font-mono text-[8px]">
                        <span className="text-system-mutedText block">ETA</span>
                        <span className="text-white block font-semibold">{res.eta}</span>
                      </div>

                      <button
                        onClick={() => handleDispatch(i)}
                        className={`px-sm py-[3px] rounded-2xs font-mono text-[8px] uppercase transition-colors ${
                          res.status === 'ON_SCENE' 
                            ? 'bg-system-green/20 text-system-green font-bold border border-system-green/30'
                            : res.status === 'DISPATCHED'
                            ? 'bg-system-cyan/20 text-system-cyan font-bold border border-system-cyan/30 animate-pulse'
                            : 'bg-obsidian hover:bg-obsidian-sub text-system-mutedText hover:text-white border border-system-border'
                        }`}
                      >
                        {res.status === 'ON_SCENE' ? 'On Scene' : res.status === 'DISPATCHED' ? 'Dispatched' : 'Dispatch'}
                      </button>
                    </div>
                  </div>
                ))}
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

export default EmergencyCenter;
