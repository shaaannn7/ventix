import React, { useEffect, useState } from 'react';
import { Users, ShieldAlert, Cpu, Activity } from 'lucide-react';

const ATTENDANCE_START = 80000;
const ATTENDANCE_END = 83412;

export const CenterHero: React.FC = React.memo(() => {
  const [attendance, setAttendance] = useState(ATTENDANCE_START);

  useEffect(() => {
    const totalSteps = 60;
    const stepMs = 2000 / totalSteps;
    const increment = (ATTENDANCE_END - ATTENDANCE_START) / totalSteps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setAttendance(Math.min(Math.round(ATTENDANCE_START + increment * step), ATTENDANCE_END));
      if (step >= totalSteps) clearInterval(timer);
    }, stepMs);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      icon: Users,
      label: 'Attendance',
      value: `${attendance.toLocaleString()}`,
      sub: '/ 87,523',
      color: 'text-white',
    },
    {
      icon: ShieldAlert,
      label: 'Risk Level',
      value: 'Low',
      sub: '0.12 index',
      color: 'text-system-green',
    },
    {
      icon: Cpu,
      label: 'AI Readiness',
      value: '99.8%',
      sub: 'All agents active',
      color: 'text-system-purple',
    },
    {
      icon: Activity,
      label: 'Arena Health',
      value: '98.4%',
      sub: 'Nominal',
      color: 'text-white',
    },
  ];

  return (
    <div className="flex flex-col gap-sm">
      {/* Page context line */}
      <div className="flex flex-col gap-[2px]">
        <p className="text-[11px] text-system-mutedText font-mono uppercase tracking-widest">
          World Cup · Match Day 3
        </p>
        <h1 className="text-lg font-semibold text-white leading-snug">
          Mission Control
        </h1>
      </div>

      {/* Four stat pills */}
      <div className="grid grid-cols-2 gap-sm">
        {stats.map(({ icon: Icon, label, value, sub, color }) => (
          <div
            key={label}
            className="bg-obsidian-elevated border border-system-border rounded-sm p-sm flex items-center gap-sm"
          >
            <Icon className={`w-3.5 h-3.5 shrink-0 ${color}`} />
            <div className="min-w-0">
              <p className="text-[10px] text-system-mutedText leading-none mb-[3px]">{label}</p>
              <p className={`text-xs font-semibold leading-none ${color}`}>
                {value}
                {sub && <span className="text-system-mutedText font-normal ml-xs text-[10px]">{sub}</span>}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

CenterHero.displayName = 'CenterHero';
export default CenterHero;
