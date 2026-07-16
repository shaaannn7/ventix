import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Search, 
  Activity, 
  ShieldAlert, 
  Download, 
  X, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2
} from 'lucide-react';
import { useTelemetryStore } from '@/store/telemetryStore';

interface ToastMessage {
  id: string;
  type: 'info' | 'alert' | 'success';
  title: string;
  body: string;
}

export const DemoSystem: React.FC = () => {
  const navigate = useNavigate();
  const { setIncidents, setSystemStatus, showSearch, setShowSearch } = useTelemetryStore();

  // State Variables
  const [demoActive, setDemoActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Judge / Presentation Mode states
  const [judgeModeActive, setJudgeModeActive] = useState(false);
  const [judgeStep, setJudgeStep] = useState(1);
  const [showAARReport, setShowAARReport] = useState(false);
  
  // Toast notifications list
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sound effects or visual feedback
  const triggerToast = (type: 'info' | 'alert' | 'success', title: string, body: string) => {
    const id = Math.random().toString();
    setToasts(prev => [...prev, { id, type, title, body }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  };

  // Listen to window-level custom toasts
  useEffect(() => {
    const handleToastEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ type: 'info' | 'alert' | 'success'; title: string; body: string }>;
      const { type, title, body } = customEvent.detail;
      triggerToast(type, title, body);
    };
    window.addEventListener('vantix-toast', handleToastEvent);
    return () => window.removeEventListener('vantix-toast', handleToastEvent);
  }, []);

  // Keyboard Shortcuts Handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'd' || e.key === 'D') {
          e.preventDefault();
          toggleDemoMode();
        } else if (e.key === 'j' || e.key === 'J') {
          e.preventDefault();
          startJudgeMode();
        } else if (e.key === 'k' || e.key === 'K') {
          e.preventDefault();
          setShowSearch(!showSearch);
        } else if (e.key === 's' || e.key === 'S') {
          e.preventDefault();
          navigate('/simulation');
          triggerToast('info', 'Navigation Shortcut', 'Opened AI Decision Lab');
        } else if (e.key === 'm' || e.key === 'M') {
          e.preventDefault();
          navigate('/ai-operations');
          triggerToast('info', 'Navigation Shortcut', 'Opened AI Operations Command');
        } else if (e.key === 't' || e.key === 'T') {
          e.preventDefault();
          navigate('/');
          triggerToast('info', 'Navigation Shortcut', 'Opened Mission Control Dashboard');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, showSearch, setShowSearch]);

  // Synchronize judge mode active class to body element to prevent TopBar overlapping
  useEffect(() => {
    if (judgeModeActive) {
      document.body.classList.add('has-judge-banner');
    } else {
      document.body.classList.remove('has-judge-banner');
    }
    return () => {
      document.body.classList.remove('has-judge-banner');
    };
  }, [judgeModeActive]);

  // Live Telemetry Event Loop when Demo Mode is active
  useEffect(() => {
    if (!demoActive) return;

    const events = [
      { type: 'alert', title: 'Security Alert: Sector B4', body: 'Queue build-up exceeds capacity thresholds. Deploying staff.' },
      { type: 'info', title: 'Transit Update: Shuttle Line A', body: 'Frequency increased. Next shuttle ETA is under 2 mins.' },
      { type: 'success', title: 'AI Automation Dispatch', body: 'Open Gate B recommendation approved. Directing 850 fans.' },
      { type: 'alert', title: 'Medical Alert: Gate C Concourse', body: 'Heat fatigue reported. Dispatching first-aid response team.' },
    ] as const;

    let index = 0;
    const interval = setInterval(() => {
      const ev = events[index % events.length];
      triggerToast(ev.type, ev.title, ev.body);
      
      setSystemStatus({ latencyMs: 8 + Math.floor(Math.random() * 6) });
      
      if (ev.type === 'alert') {
        setIncidents([
          {
            id: `inc-demo-${Date.now()}`,
            title: ev.title,
            location: 'Gate B4 concourse',
            severity: 'high',
            status: 'reported',
            reporter: 'CCTV AI Agent',
            timestamp: Date.now(),
            coordinates: [19.3029, -99.1505]
          }
        ]);
      }
      index++;
    }, 7000);

    return () => clearInterval(interval);
  }, [demoActive, setIncidents, setSystemStatus]);

  const toggleDemoMode = () => {
    setDemoActive(prev => {
      const next = !prev;
      if (next) {
        triggerToast('success', 'Demo Mode Activated', 'Simulating real-time match telemetry feed.');
      } else {
        triggerToast('info', 'Demo Mode Disabled', 'Live API synchronization resumed.');
      }
      return next;
    });
  };

  const startJudgeMode = () => {
    setJudgeModeActive(true);
    setJudgeStep(1);
    navigate('/');
    triggerToast('success', 'Judge Walkthrough Mode Active', 'Highlighting key Vantix features.');
  };

  const handleNextStep = () => {
    const nextStep = judgeStep + 1;
    if (nextStep === 2) {
      navigate('/ai-operations');
      setJudgeStep(2);
    } else if (nextStep === 3) {
      navigate('/simulation');
      setJudgeStep(3);
    } else if (nextStep === 4) {
      setShowAARReport(true);
      setJudgeStep(4);
    } else if (nextStep === 5) {
      setJudgeStep(5);
    } else {
      exitJudgeMode();
    }
  };

  const handlePrevStep = () => {
    const prev = judgeStep - 1;
    if (prev < 1) return;
    setJudgeStep(prev);
    if (prev === 1) navigate('/');
    if (prev === 2) navigate('/ai-operations');
    if (prev === 3) {
      navigate('/simulation');
      setShowAARReport(false);
    }
  };

  const exitJudgeMode = () => {
    setJudgeModeActive(false);
    setShowAARReport(false);
    navigate('/');
    triggerToast('info', 'Tours Complete', 'Exited presentation mode.');
  };

  // Search Results Filtering
  const SEARCH_ITEMS = [
    { label: 'Mission Control Dashboard', path: '/' },
    { label: 'AI Operations Center', path: '/ai-operations' },
    { label: 'AI Decision Simulator Lab', path: '/simulation' },
    { label: 'Volunteers App', path: '/volunteers' },
    { label: 'Security Patrol Command', path: '/security' },
    { label: 'AI Fan Assistant', path: '/fan' },
    { label: 'System Settings', path: '/settings' },
  ];

  const filteredItems = SEARCH_ITEMS.filter(item => 
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* 1. Global Floating Toast Alerts Container */}
      <div className="fixed top-xl right-xl z-[9999] flex flex-col gap-sm max-w-sm pointer-events-none">
        {toasts.map((toast) => {
          let themeClass = 'border-system-cyan bg-obsidian-elevated/95';
          if (toast.type === 'alert') themeClass = 'border-system-crimson bg-system-crimson/[0.04] shadow-alert-glow';
          if (toast.type === 'success') themeClass = 'border-system-green bg-system-green/[0.02]';

          return (
            <div 
              key={toast.id}
              className={`p-sm border rounded-xs backdrop-blur-command flex gap-sm animate-fadeIn pointer-events-auto ${themeClass}`}
            >
              {toast.type === 'alert' && <ShieldAlert className="w-5 h-5 text-system-crimson shrink-0" />}
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-system-green shrink-0" />}
              {toast.type === 'info' && <Activity className="w-5 h-5 text-system-cyan shrink-0" />}
              
              <div className="flex flex-col gap-[2px]">
                <span className="text-xs font-bold text-white leading-none">{toast.title}</span>
                <span className="text-[10px] text-system-mutedText">{toast.body}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Spotlight Command Search Bar Modal Overlay */}
      {showSearch && (
        <div 
          className="fixed inset-0 bg-obsidian/70 backdrop-blur-sm z-[9000] flex items-center justify-center p-md"
          onClick={() => setShowSearch(false)}
        >
          <div 
            className="w-full max-w-lg bg-obsidian-muted border border-system-border/80 p-lg rounded-md shadow-high flex flex-col gap-md animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <Search className="w-4 h-4 text-system-mutedText absolute left-md top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type a directory path or command..."
                className="w-full h-sm pl-xl pr-md bg-obsidian-elevated border border-system-border rounded-xs text-xs text-white placeholder-system-mutedText focus:outline-none focus:border-system-cyan"
              />
            </div>

            <div className="flex flex-col gap-xs">
              <span className="font-mono text-[9px] text-system-mutedText uppercase px-xs">System Directory Links</span>
              {filteredItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    navigate(item.path);
                    setShowSearch(false);
                    setSearchQuery('');
                  }}
                  aria-label={`Jump to page ${item.label}`}
                  className="w-full text-left px-md py-sm bg-obsidian-elevated/40 hover:bg-obsidian-sub rounded-xs border border-transparent hover:border-system-border/60 transition-all flex items-center justify-between text-xs text-white"
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-system-mutedText" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. Judge Presentation Mode Header Banner */}
      {judgeModeActive && (
        <div className="fixed top-0 inset-x-0 h-[42px] bg-system-purple/10 border-b border-system-purple/35 backdrop-blur-md z-[8000] flex items-center justify-between px-lg select-none">
          <div className="flex items-center gap-md">
            <span className="w-2.5 h-2.5 bg-system-purple rounded-full animate-pulse-slow shadow-ai-glow" />
            <span className="font-mono text-xs font-bold text-white tracking-widest uppercase">
              Vantix Showcase // Step {judgeStep} of 5
            </span>
          </div>

          <span className="font-mono text-[10px] text-system-purple font-semibold">
            {judgeStep === 1 && "Highlighting: Real-time 3D Digital Twin Coordinate Beacons"}
            {judgeStep === 2 && "Highlighting: AI Operations Decision Pipeline Triage"}
            {judgeStep === 3 && "Highlighting: What-If Operations Consequence Simulator"}
            {judgeStep === 4 && "Highlighting: Auto-Generated After Action Report summaries"}
            {judgeStep === 5 && "Completed: Hackathon Winner Pitch ready"}
          </span>

          <div className="flex items-center gap-md">
            <button 
              onClick={handlePrevStep}
              disabled={judgeStep === 1}
              aria-label="Previous presentation walkthrough step"
              className="p-xs bg-obsidian border border-system-border rounded-xs text-system-mutedText hover:text-white disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={handleNextStep}
              aria-label="Next presentation walkthrough step"
              className="p-xs bg-obsidian border border-system-purple rounded-xs text-system-purple hover:text-white"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="w-[1px] bg-system-border h-4" />
            <button 
              onClick={exitJudgeMode}
              aria-label="Exit presentation showcase mode"
              className="p-xs hover:bg-system-crimson/10 text-system-mutedText hover:text-system-crimson rounded-xs transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 4. One-Click Show Why Vantix Wins FAB overlay */}
      {!judgeModeActive && (
        <div className="fixed bottom-[32px] right-[80px] lg:right-[400px] z-[7000]">
          <button
            onClick={startJudgeMode}
            aria-label="Start interactive presentation showcase tour"
            className="flex items-center gap-xs px-md py-sm bg-system-purple hover:bg-system-purple/90 border border-system-purple/40 text-white rounded-full shadow-ai-glow font-mono text-[10px] uppercase font-bold tracking-wider transition-all duration-200 active:scale-95 group"
          >
            <Sparkles className="w-4 h-4 text-white group-hover:animate-pulse" />
            <span>Show Why Vantix Wins</span>
          </button>
        </div>
      )}

      {/* 5. AAR Report Preview Modal */}
      {showAARReport && (
        <div className="fixed inset-0 bg-obsidian/75 backdrop-blur-md z-[9500] flex items-center justify-center p-md">
          <div className="w-full max-w-xl bg-obsidian-muted border border-system-border p-xl rounded-md shadow-high flex flex-col gap-md relative animate-fadeIn">
            <div className="flex items-center justify-between border-b border-system-border pb-sm">
              <span className="font-mono text-xs text-system-cyan uppercase font-bold">Generated After Action Report</span>
              <button 
                onClick={() => setShowAARReport(false)} 
                aria-label="Close after action report details panel"
                className="text-system-mutedText hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-obsidian-elevated/40 border border-system-border/60 rounded-xs p-md space-y-sm text-xs select-text">
              <div className="flex justify-between items-center font-mono border-b border-system-border/20 pb-2xs">
                <span>SIMULATION_ID: VANTIX-94A2</span>
                <span className="text-system-green">SUCCESSFUL RESOLUTION</span>
              </div>

              <p className="text-white leading-relaxed">
                **Incident Scenario:** Local concourse bottleneck at Gate B4 turnstiles during pre-match ingress.
              </p>
              
              <div className="grid grid-cols-2 gap-sm font-mono text-[10px] text-system-mutedText">
                <div>Median Response Time: **3.2 minutes**</div>
                <div>Volunteers Reallocated: **12 staff**</div>
                <div>Queue Wait Reduction: **-16 minutes**</div>
                <div>Carbon Offset: **94kg CO₂ saved**</div>
              </div>

              <div className="pt-xs space-y-[4px]">
                <div className="font-semibold text-white">AI Recommendations Applied:</div>
                <ul className="list-disc pl-md text-system-mutedText space-y-[2px]">
                  <li>Redistributed Sector A volunteers to Gate B4 concourse corridors.</li>
                  <li>Dispatched standby medical ambulance to target turnstiles zone.</li>
                  <li>Adjusted local shuttle service arrival rates.</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-end gap-sm">
              <button 
                onClick={() => setShowAARReport(false)}
                aria-label="Close after action report"
                className="px-md py-xs bg-obsidian hover:bg-obsidian-sub border border-system-border rounded-xs text-xs"
              >
                Close View
              </button>
              <a 
                href="data:text/plain;charset=utf-8,Vantix After Action Report%0AStatus: SUCCESS%0AResponse Time: 3.2m%0AQueue Wait Reduction: 16m%0A"
                download="vantix_after_action_report.txt"
                aria-label="Download after action report summary text file"
                className="flex items-center gap-xs px-md py-xs bg-system-cyan hover:bg-system-cyan/90 text-obsidian rounded-xs text-xs font-bold transition-all shadow-glow"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Report PDF</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default DemoSystem;
