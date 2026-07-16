import React from 'react';
import { ShieldAlert, HeartPulse, UserCheck, Train, Sparkles } from 'lucide-react';

const EVENTS = [
  {
    id: 'ev-1',
    time: '19:47',
    title: 'AI: Volunteer reallocation mapped',
    detail: 'Concourses B & D — projected ingress rate +25%',
    color: 'text-system-purple',
    icon: Sparkles,
  },
  {
    id: 'ev-2',
    time: '19:44',
    title: 'Turnstile overcrowd — Sector B4',
    detail: 'Security Team Alpha dispatched',
    color: 'text-system-crimson',
    icon: ShieldAlert,
  },
  {
    id: 'ev-3',
    time: '19:35',
    title: 'Volunteers assigned to Gate B4',
    detail: 'Manual queue control active',
    color: 'text-system-green',
    icon: UserCheck,
  },
  {
    id: 'ev-4',
    time: '19:28',
    title: 'Medical dispatch cleared',
    detail: 'MED-102 resolved — team returning to patrol',
    color: 'text-system-green',
    icon: HeartPulse,
  },
  {
    id: 'ev-5',
    time: '19:12',
    title: 'Metro Line 1 delays',
    detail: 'ETA extended +4 min due to congestion',
    color: 'text-system-amber',
    icon: Train,
  },
];

export const LiveEventTimeline: React.FC = () => (
  <div className="bg-obsidian-elevated border border-system-border rounded-sm p-md">
    <p className="text-xs font-semibold text-white mb-md">Recent Events</p>
    <div className="space-y-sm">
      {EVENTS.map((ev) => {
        const Icon = ev.icon;
        return (
          <div key={ev.id} className="flex items-start gap-sm">
            <Icon className={`w-3.5 h-3.5 mt-[2px] shrink-0 ${ev.color}`} />
            <div className="min-w-0">
              <div className="flex items-baseline gap-sm">
                <span className="text-[10px] font-mono text-system-mutedText shrink-0">{ev.time}</span>
                <span className="text-xs text-white font-medium leading-snug">{ev.title}</span>
              </div>
              <p className="text-[11px] text-system-mutedText leading-snug mt-[2px]">{ev.detail}</p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default LiveEventTimeline;
