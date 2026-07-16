import { create } from 'zustand';
import type { CrowdTelemetryPoint } from '@/types/crowd';
import type { EmergencyIncident } from '@/types/emergency';
import type { SystemStatus } from '@/types/global';

interface TelemetryState {
  metrics: Record<string, CrowdTelemetryPoint>;
  incidents: EmergencyIncident[];
  systemStatus: SystemStatus;
  showSearch: boolean;
  updateMetric: (sectorId: string, point: CrowdTelemetryPoint) => void;
  setIncidents: (incidents: EmergencyIncident[]) => void;
  setSystemStatus: (status: Partial<SystemStatus>) => void;
  setShowSearch: (show: boolean) => void;
  addIncident: (incident: EmergencyIncident) => void;
}

export const useTelemetryStore = create<TelemetryState>((set) => ({
  metrics: {},
  incidents: [],
  systemStatus: {
    latencyMs: 12,
    dbSync: 'OK',
    websocketStatus: 'CONNECTED',
  },
  showSearch: false,
  updateMetric: (sectorId, point) =>
    set((state) => ({
      metrics: { ...state.metrics, [sectorId]: point },
    })),
  setIncidents: (incidents) => set({ incidents }),
  setSystemStatus: (status) =>
    set((state) => ({
      systemStatus: { ...state.systemStatus, ...status },
    })),
  setShowSearch: (show) => set({ showSearch: show }),
  addIncident: (incident) => set((state) => ({ incidents: [...state.incidents, incident] })),
}));
