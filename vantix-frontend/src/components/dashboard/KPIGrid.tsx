import React, { useEffect, useState } from 'react';
import { 
  Users, 
  Clock, 
  Map, 
  ShieldAlert, 
  Activity, 
  Cpu, 
  Zap, 
  Droplet,
  Utensils,
  Wifi,
  BrainCircuit,
  Target
} from 'lucide-react';

const KPI_DATA = [
  { label: 'Attendance', value: '83,412', icon: Users, change: '+2.4%', state: 'normal' },
  { label: 'Queue Time', value: '12 min', icon: Clock, change: '-4 min', state: 'normal' },
  { label: 'Crowd Density', value: '1.4 p/m²', icon: Map, change: '+0.2', state: 'normal' },
  { label: 'Active Alerts', value: '1 Incident', icon: ShieldAlert, change: 'Stable', state: 'warning' },
  { label: 'Volunteer Avail', value: '142 Active', icon: Activity, change: '100% capacity', state: 'normal' },
  { label: 'AI Confidence', value: '94.2%', icon: Cpu, change: 'Optimal', state: 'normal' },
  { label: 'Energy Usage', value: '342 kWh', icon: Zap, change: '-2.1%', state: 'normal' },
  { label: 'Water Flow', value: '14.2 L/s', icon: Droplet, change: 'Optimal', state: 'normal' },
  { label: 'Food Inventory', value: '92% Stock', icon: Utensils, change: 'Replenished', state: 'normal' },
  { label: 'Network Latency', value: '8ms', icon: Wifi, change: '12Gbps down', state: 'normal' },
  { label: 'Model Confidence', value: '98.7%', icon: BrainCircuit, change: 'L3 Active', state: 'normal' },
  { label: 'Forecast Accuracy', value: '96.4%', icon: Target, change: '+1.2%', state: 'normal' },
];

const GLOW_COLORS: Record<string, string> = {
  normal: '0 0 12px 2px rgba(6,182,212,0.18)',
  warning: '0 0 12px 2px rgba(245,158,11,0.22)',
};

export const KPIGrid: React.FC = React.memo(() => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [flashedIndices, setFlashedIndices] = useState<Set<number>>(new Set());

  // Every 8s randomly flash 2 cards for 300ms
  useEffect(() => {
    const interval = setInterval(() => {
      const a = Math.floor(Math.random() * KPI_DATA.length);
      let b = Math.floor(Math.random() * KPI_DATA.length);
      while (b === a) b = Math.floor(Math.random() * KPI_DATA.length);
      setFlashedIndices(new Set([a, b]));
      setTimeout(() => setFlashedIndices(new Set()), 300);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-md select-none">
      {KPI_DATA.map((kpi, index) => {
        const Icon = kpi.icon;
        const isWarning = kpi.state === 'warning';
        const isHovered = hoveredIndex === index;
        const isFlashing = flashedIndices.has(index);
        
        let borderClass = 'border-system-border/60 hover:border-system-border';
        let iconColorClass = 'text-system-cyan';
        if (isWarning) {
          borderClass = 'border-system-amber/30 hover:border-system-amber/60';
          iconColorClass = 'text-system-amber';
        }

        const glowColor = GLOW_COLORS[kpi.state] ?? GLOW_COLORS['normal'];

        const hoverStyle = isHovered
          ? { transform: 'perspective(600px) rotateX(-2deg) rotateY(3deg) translateY(-2px)', boxShadow: glowColor }
          : {};

        return (
          <div 
            key={index} 
            className={`bg-obsidian-muted/50 border rounded-xs p-sm flex flex-col gap-2xs transition-all duration-200 relative ${borderClass}`}
            style={{
              ...hoverStyle,
              opacity: isFlashing ? 0.4 : 1,
              transition: 'all 200ms ease',
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Pulsing status dot: top-right corner */}
            <span
              className={`absolute top-[5px] right-[5px] w-[4px] h-[4px] rounded-full animate-pulse ${isWarning ? 'bg-system-amber' : 'bg-system-green'}`}
            />

            {/* KPI header */}
            <div className="flex items-center justify-between">
              <span className="font-sans text-[10px] text-system-mutedText font-medium tracking-wide">
                {kpi.label}
              </span>
              <Icon className={`w-3.5 h-3.5 ${iconColorClass}`} />
            </div>

            {/* KPI value */}
            <span className="font-mono text-sm font-bold text-white tracking-wide">
              {kpi.value}
            </span>

            {/* KPI bottom status details */}
            <div className="flex items-center justify-between font-mono text-[9px] text-system-mutedText pt-[2px] border-t border-system-border/20 mt-xs">
              <span>Trend</span>
              <span className={kpi.change.startsWith('+') ? 'text-system-green' : kpi.change.startsWith('-') ? 'text-system-green' : 'text-system-cyan'}>
                {kpi.change}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
});
KPIGrid.displayName = 'KPIGrid';
export default KPIGrid;
