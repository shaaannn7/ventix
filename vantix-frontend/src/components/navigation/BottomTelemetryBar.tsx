import React from 'react';

const TICKERS = [
  { label: 'CAM-14', detail: 'Concourse B East — feed nominal', state: 'normal' },
  { label: 'BUS-ETA', detail: 'Line 4 Shuttles arriving in 4 min (Bay A)', state: 'normal' },
  { label: 'PRK-C', detail: 'Parking Lot C at 94% — redirecting to Lot E', state: 'warning' },
  { label: 'MED-UNIT', detail: 'Medical Team 3 dispatched — Concourse A sector 8', state: 'alert' },
  { label: 'NET', detail: 'Stadium 5G latency 8ms', state: 'normal' },
  { label: 'AI', detail: 'Gemini model sync verified', state: 'normal' },
];

const DOUBLED = [...TICKERS, ...TICKERS];

export const BottomTelemetryBar: React.FC = () => (
  <footer className="h-[26px] bg-obsidian-muted border-t border-system-border flex items-center overflow-hidden select-none font-mono text-[9px] shrink-0">
    {/* Static label */}
    <div className="flex items-center gap-xs px-md border-r border-system-border h-full shrink-0 bg-obsidian-muted z-10 relative">
      <span className="w-1.5 h-1.5 rounded-full bg-system-cyan animate-pulse" />
      <span className="text-system-mutedText uppercase tracking-widest">Live</span>
    </div>

    {/* Scrolling tickers */}
    <div className="flex-1 overflow-hidden relative">
      <div
        style={{ animation: 'marquee 40s linear infinite', display: 'flex', width: 'max-content' }}
        className="items-center gap-xl whitespace-nowrap"
      >
        {DOUBLED.map((t, i) => {
          const colorClass =
            t.state === 'alert'
              ? 'text-system-crimson'
              : t.state === 'warning'
              ? 'text-system-amber'
              : 'text-system-cyan';
          return (
            <span key={i} className="flex items-center gap-sm shrink-0">
              <span className={`font-bold ${colorClass}`}>{t.label}</span>
              <span className="text-system-mutedText">{t.detail}</span>
              <span className="text-system-border px-sm">·</span>
            </span>
          );
        })}
      </div>
    </div>
  </footer>
);

export default BottomTelemetryBar;
