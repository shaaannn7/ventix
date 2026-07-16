import React, { useState } from 'react';
import { 
  Mic, 
  MicOff, 
  Sparkles 
} from 'lucide-react';

export const VoiceMode: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState<'idle' | 'listening' | 'transcribing' | 'generating' | 'speaking'>('idle');

  const toggleVoice = () => {
    if (isActive) {
      setIsActive(false);
      setVoiceStatus('idle');
    } else {
      setIsActive(true);
      setVoiceStatus('listening');
      
      // Simulate voice lifecycle loop
      setTimeout(() => {
        setVoiceStatus('transcribing');
        setTimeout(() => {
          setVoiceStatus('generating');
          setTimeout(() => {
            setVoiceStatus('speaking');
          }, 1200);
        }, 1000);
      }, 2500);
    }
  };

  return (
    <div className="bg-obsidian-muted border border-system-border rounded-md p-lg select-none shadow-high flex flex-col gap-md relative overflow-hidden">
      {/* Background highlight */}
      {isActive && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(168,85,247,0.06),transparent)] pointer-events-none" />
      )}

      {/* Header */}
      <div className="flex items-center justify-between border-b border-system-border/50 pb-sm shrink-0">
        <div className="flex items-center gap-xs">
          <Mic className="w-4 h-4 text-system-purple" />
          <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">Voice Operational Command Dispatch</span>
        </div>
        
        {isActive && (
          <div className="flex items-center gap-xs text-system-purple font-mono text-[9px] uppercase animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Voice Session Connected</span>
          </div>
        )}
      </div>

      {/* Voice Core HUD body */}
      <div className="flex flex-col sm:flex-row items-center gap-lg py-sm">
        {/* Toggle Button */}
        <button
          onClick={toggleVoice}
          className={`w-[64px] h-[64px] rounded-full border flex items-center justify-center transition-all duration-300 active:scale-95 shrink-0 ${
            isActive 
              ? 'bg-system-purple border-system-purple/40 text-white shadow-ai-glow scale-105' 
              : 'bg-obsidian-elevated border-system-border text-system-mutedText hover:text-white hover:bg-obsidian-sub'
          }`}
        >
          {isActive ? (
            <Mic className="w-6 h-6 animate-pulse" />
          ) : (
            <MicOff className="w-6 h-6" />
          )}
        </button>

        {/* Waveform indicator / Text summary */}
        <div className="flex-1 flex flex-col gap-xs w-full">
          <div className="flex items-center justify-between font-mono text-[10px] text-system-mutedText">
            <span>Voice Status:</span>
            <span className={`uppercase font-bold ${isActive ? 'text-system-purple' : 'text-system-mutedText'}`}>
              {voiceStatus}
            </span>
          </div>

          {/* Graphical animated waveform indicator */}
          <div className="h-[24px] bg-obsidian-elevated/40 border border-system-border/50 rounded-xs flex items-center justify-center gap-[3px] px-md">
            {isActive ? (
              <>
                {/* Looping waveform bars */}
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((bar) => {
                  let animationDuration = '1.2s';
                  if (voiceStatus === 'listening') {
                    animationDuration = `${0.6 + bar * 0.1}s`;
                  } else if (voiceStatus === 'speaking') {
                    animationDuration = `${0.4 + bar * 0.08}s`;
                  } else if (voiceStatus === 'generating') {
                    animationDuration = '0.4s';
                  }
                  
                  return (
                    <div 
                      key={bar} 
                      className="w-[2px] bg-system-purple rounded-2xs animate-pulse"
                      style={{ 
                        animationDuration, 
                        height: voiceStatus === 'listening' || voiceStatus === 'speaking' ? undefined : '8px'
                      }}
                    />
                  );
                })}
              </>
            ) : (
              <span className="font-mono text-[9px] text-system-mutedText uppercase">Voice Line Disconnected</span>
            )}
          </div>

          {/* Subtitle / Transcription preview */}
          <p className="text-[11px] text-system-mutedText italic font-sans leading-relaxed">
            {voiceStatus === 'listening' && 'Listening for commands... (e.g. "Optimize Gates")'}
            {voiceStatus === 'transcribing' && '"Summarize queue wait times at North Transit..."'}
            {voiceStatus === 'generating' && 'Synthesizing telemetry data models...'}
            {voiceStatus === 'speaking' && '"Analysis complete: Shuttle line C wait time is currently 8 minutes."'}
            {voiceStatus === 'idle' && 'Click the microphone to initiate voice operational routing commands.'}
          </p>
        </div>
      </div>
    </div>
  );
};
export default VoiceMode;
