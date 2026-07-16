import React, { useEffect, useState } from 'react';
import { Activity, Cpu, Shield, HeartPulse, Train, Users } from 'lucide-react';

const METRICS = [
  { label: 'Stadium', value: 98, icon: Activity, warn: false },
  { label: 'AI Engine', value: 99, icon: Cpu, warn: false },
  { label: 'Security', value: 95, icon: Shield, warn: false },
  { label: 'Medical', value: 100, icon: HeartPulse, warn: false },
  { label: 'Transit', value: 84, icon: Train, warn: true },
  { label: 'Crowd', value: 92, icon: Users, warn: false },
];

export const MissionStatusCard: React.FC = React.memo(() => {
  const [bars, setBars] = useState(METRICS.map(() => 0));

  useEffect(() => {
    METRICS.forEach((m, i) => {
      setTimeout(() => {
        setBars((prev) => {
          const next = [...prev];
          next[i] = m.value;
          return next;
        });
      }, i * 100);
    });
  }, []);

  return (
    <div className="bg-obsidian-elevated border border-system-border rounded-sm p-md">
      <p className="text-xs font-semibold text-white mb-md">Subsystem Status</p>
      <div className="space-y-sm">
        {METRICS.map((m, i) => {
          const Icon = m.icon;
          const color = m.warn ? '#f59e0b' : '#10b981';
          return (
            <div key={m.label} className="flex items-center gap-sm">
              <Icon className={`w-3 h-3 shrink-0 ${m.warn ? 'text-system-amber' : 'text-system-green'}`} />
              <span className="text-xs text-system-mutedText w-[60px] shrink-0">{m.label}</span>
              <div className="flex-1 h-[3px] bg-obsidian-sub rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${bars[i]}%`,
                    backgroundColor: color,
                    transition: `width 0.8s ease ${i * 100}ms`,
                  }}
                />
              </div>
              <span className={`text-[10px] font-mono font-semibold w-[32px] text-right shrink-0 ${m.warn ? 'text-system-amber' : 'text-system-green'}`}>
                {m.value}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
});

MissionStatusCard.displayName = 'MissionStatusCard';
export default MissionStatusCard;
