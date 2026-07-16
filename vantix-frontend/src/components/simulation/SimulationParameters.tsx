import React from 'react';
import { Sliders } from 'lucide-react';

interface SimulationParametersProps {
  severity: 'low' | 'medium' | 'high' | 'critical';
  setSeverity: (sev: 'low' | 'medium' | 'high' | 'critical') => void;
  location: string;
  setLocation: (loc: string) => void;
  peopleCount: number;
  setPeopleCount: (cnt: number) => void;
  weather: string;
  setWeather: (wth: string) => void;
  simTime: string;
  setSimTime: (time: string) => void;
  affectedArea: string;
  setAffectedArea: (area: string) => void;
  durationMin: number;
  setDurationMin: (dur: number) => void;
  transportStatus: string;
  setTransportStatus: (status: string) => void;
}

export const SimulationParameters: React.FC<SimulationParametersProps> = ({
  severity,
  setSeverity,
  location,
  setLocation,
  peopleCount,
  setPeopleCount,
  weather,
  setWeather,
  simTime,
  setSimTime,
  affectedArea,
  setAffectedArea,
  durationMin,
  setDurationMin,
  transportStatus,
  setTransportStatus
}) => {
  return (
    <div className="bg-obsidian-muted border border-system-border rounded-md p-lg select-none shadow-high flex flex-col gap-md">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-system-border/50 pb-sm shrink-0">
        <div className="flex items-center gap-xs">
          <Sliders className="w-4 h-4 text-system-cyan" />
          <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">Simulation parameters</span>
        </div>
        <span className="font-mono text-[9px] text-system-mutedText">Model variables configuration</span>
      </div>

      {/* Selectors grid - 8 controls */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
        {/* Severity */}
        <div className="flex flex-col gap-2xs">
          <span className="font-mono text-[9px] text-system-mutedText uppercase">Severity Level</span>
          <select 
            value={severity}
            onChange={(e) => setSeverity(e.target.value as any)}
            className="w-full h-sm px-sm bg-obsidian-elevated border border-system-border rounded-xs text-xs text-white focus:outline-none focus:border-system-cyan"
          >
            <option value="low">Low Impact</option>
            <option value="medium">Medium Impact</option>
            <option value="high">High Severity</option>
            <option value="critical">Critical Outage</option>
          </select>
        </div>

        {/* Location */}
        <div className="flex flex-col gap-2xs">
          <span className="font-mono text-[9px] text-system-mutedText uppercase">Location Coordinates</span>
          <select 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full h-sm px-sm bg-obsidian-elevated border border-system-border rounded-xs text-xs text-white focus:outline-none focus:border-system-cyan"
          >
            <option value="concourse_b">Concourse B Turnstiles</option>
            <option value="gate_4">Gate 4 Ingress Access</option>
            <option value="north_transit">North Transit Terminal</option>
            <option value="parking_c">Parking Lot C</option>
          </select>
        </div>

        {/* Time of simulation */}
        <div className="flex flex-col gap-2xs">
          <span className="font-mono text-[9px] text-system-mutedText uppercase">Simulation Start Time</span>
          <select 
            value={simTime}
            onChange={(e) => setSimTime(e.target.value)}
            className="w-full h-sm px-sm bg-obsidian-elevated border border-system-border rounded-xs text-xs text-white focus:outline-none focus:border-system-cyan"
          >
            <option value="pre_match">Pre-Match Ingress</option>
            <option value="half_time">Half Time</option>
            <option value="in_play">In Play</option>
            <option value="post_match">Post-Match Egress</option>
          </select>
        </div>

        {/* Affected Area details */}
        <div className="flex flex-col gap-2xs">
          <span className="font-mono text-[9px] text-system-mutedText uppercase">Affected Area Radius</span>
          <select 
            value={affectedArea}
            onChange={(e) => setAffectedArea(e.target.value)}
            className="w-full h-sm px-sm bg-obsidian-elevated border border-system-border rounded-xs text-xs text-white focus:outline-none focus:border-system-cyan"
          >
            <option value="local">Local Sector (50m)</option>
            <option value="quadrant">Quadrant (150m)</option>
            <option value="stadium_wide">Stadium Wide</option>
          </select>
        </div>

        {/* Duration */}
        <div className="flex flex-col gap-2xs">
          <span className="font-mono text-[9px] text-system-mutedText uppercase">Estimated Duration</span>
          <select 
            value={durationMin}
            onChange={(e) => setDurationMin(parseInt(e.target.value))}
            className="w-full h-sm px-sm bg-obsidian-elevated border border-system-border rounded-xs text-xs text-white focus:outline-none focus:border-system-cyan"
          >
            <option value="15">15 Minutes</option>
            <option value="30">30 Minutes</option>
            <option value="60">60 Minutes</option>
            <option value="120">120 Minutes</option>
          </select>
        </div>

        {/* Number of People */}
        <div className="flex flex-col gap-2xs">
          <span className="font-mono text-[9px] text-system-mutedText uppercase">Number of People</span>
          <select 
            value={peopleCount}
            onChange={(e) => setPeopleCount(parseInt(e.target.value))}
            className="w-full h-sm px-sm bg-obsidian-elevated border border-system-border rounded-xs text-xs text-white focus:outline-none focus:border-system-cyan"
          >
            <option value="500">500 People</option>
            <option value="1500">1,500 People</option>
            <option value="5000">5,000 People</option>
            <option value="15000">15,000 People</option>
            <option value="90000">90,000 People</option>
          </select>
        </div>

        {/* Weather */}
        <div className="flex flex-col gap-2xs">
          <span className="font-mono text-[9px] text-system-mutedText uppercase">Weather Overlay</span>
          <select 
            value={weather}
            onChange={(e) => setWeather(e.target.value)}
            className="w-full h-sm px-sm bg-obsidian-elevated border border-system-border rounded-xs text-xs text-white focus:outline-none focus:border-system-cyan"
          >
            <option value="clear">Clear Conditions</option>
            <option value="drizzle">Light Drizzle</option>
            <option value="storm">Heavy Rain Storm</option>
          </select>
        </div>

        {/* Transport Status */}
        <div className="flex flex-col gap-2xs">
          <span className="font-mono text-[9px] text-system-mutedText uppercase">Transport Status</span>
          <select 
            value={transportStatus}
            onChange={(e) => setTransportStatus(e.target.value)}
            className="w-full h-sm px-sm bg-obsidian-elevated border border-system-border rounded-xs text-xs text-white focus:outline-none focus:border-system-cyan"
          >
            <option value="nominal">Nominal transit times</option>
            <option value="delayed">Metro delay (+10m)</option>
            <option value="critical">Bus lines blocked</option>
          </select>
        </div>
      </div>
    </div>
  );
};
export default SimulationParameters;
