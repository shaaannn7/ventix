import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  X, 
  ShieldAlert, 
  MapPin, 
  Users, 
  Mic 
} from 'lucide-react';
import { useTelemetryStore } from '@/store/telemetryStore';

export const AuraFAB: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const addIncident = useTelemetryStore((state) => state.addIncident);

  const triggerGlobalToast = (type: 'info' | 'alert' | 'success', title: string, body: string) => {
    window.dispatchEvent(
      new CustomEvent('vantix-toast', {
        detail: { type, title, body }
      })
    );
  };

  const handleBroadcastAlert = () => {
    addIncident({
      id: `inc-aura-${Date.now()}`,
      title: 'Aura AI: Emergency Evac Broadcast',
      location: 'All Sectors',
      severity: 'high',
      status: 'reported',
      reporter: 'Aura Copilot FAB',
      timestamp: Date.now(),
      coordinates: [19.3029, -99.1505]
    });

    triggerGlobalToast(
      'alert',
      'Broadcast Safety Alert',
      'Emergency safety broadcast sent to all stadium concourse display networks.'
    );
    setIsOpen(false);
  };

  const handleRedistributeVolunteers = () => {
    triggerGlobalToast(
      'success',
      'Volunteer Reallocation Active',
      'Dispatched volunteer shift signals to Sector B4 turnstile entrance corridors.'
    );
    navigate('/volunteers');
    setIsOpen(false);
  };

  const handleLocatePatrols = () => {
    triggerGlobalToast(
      'info',
      'Active Security Patrols Located',
      'Displaying security patrol guard routes and threat checkpoints.'
    );
    navigate('/security');
    setIsOpen(false);
  };

  const handleVoiceDispatch = () => {
    triggerGlobalToast(
      'info',
      'Voice Dispatch Console Active',
      'Aura voice frequency tuner listening for active commands.'
    );
    navigate('/ai-operations');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-xl right-xl z-50 flex flex-col items-end gap-sm select-none">
      {/* Quick Action Expansion Menu */}
      {isOpen && (
        <div className="flex flex-col items-end gap-xs bg-obsidian-muted border border-system-border rounded-md shadow-high p-sm backdrop-blur-command transition-all">
          <div className="px-sm pb-2xs border-b border-system-border font-mono text-[9px] text-system-mutedText uppercase tracking-widest w-full">
            Aura AI Quick Dispatch
          </div>
          
          <button 
            onClick={handleBroadcastAlert}
            aria-label="Trigger Broadcast Safety Alert"
            className="flex items-center gap-xs px-sm py-xs w-full text-left text-xs font-sans text-white hover:bg-obsidian-elevated hover:text-system-cyan rounded-xs transition-colors"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-system-crimson" />
            <span>Broadcast Safety Alert</span>
          </button>
          
          <button 
            onClick={handleRedistributeVolunteers}
            aria-label="Trigger Redistribute Volunteer Staff"
            className="flex items-center gap-xs px-sm py-xs w-full text-left text-xs font-sans text-white hover:bg-obsidian-elevated hover:text-system-cyan rounded-xs transition-colors"
          >
            <Users className="w-3.5 h-3.5 text-system-cyan" />
            <span>Redistribute Volunteer Staff</span>
          </button>
 
          <button 
            onClick={handleLocatePatrols}
            aria-label="Trigger Locate Active Incident Patrols"
            className="flex items-center gap-xs px-sm py-xs w-full text-left text-xs font-sans text-white hover:bg-obsidian-elevated hover:text-system-green rounded-xs transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-system-green" />
            <span>Locate Active Incident Patrols</span>
          </button>
          
          <button 
            onClick={handleVoiceDispatch}
            aria-label="Trigger Voice Dispatch Command"
            className="flex items-center gap-xs px-sm py-xs w-full text-left text-xs font-sans text-white hover:bg-obsidian-elevated hover:text-system-purple rounded-xs transition-colors border-t border-system-border pt-xs"
          >
            <Mic className="w-3.5 h-3.5 text-system-purple" />
            <span>Voice Dispatch Command</span>
          </button>
        </div>
      )}
 
      {/* Floating Action Button Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Aura AI Quick Dispatch panel"
        aria-expanded={isOpen}
        className="w-[48px] h-[48px] bg-system-purple hover:bg-system-purple/90 border border-system-purple/40 text-white rounded-full flex items-center justify-center shadow-ai-glow transition-all hover:scale-105 active:scale-95"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <Sparkles className="w-5 h-5 text-white animate-pulse" />
        )}
      </button>
    </div>
  );
};
export default AuraFAB;
