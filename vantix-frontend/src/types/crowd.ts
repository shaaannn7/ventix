export interface CrowdTelemetryPoint {
  sectorId: string;
  density: number; // people/m2
  flowRate: number; // people/min
  gateStatus: 'OPEN' | 'CLOSED' | 'RESTRICTED';
  optimalRate: number;
  timestamp: number;
}
