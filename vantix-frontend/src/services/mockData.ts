import telemetryMocks from '@/data/telemetry.json';
import stadiumMocks from '@/data/stadium.json';
import alertsMocks from '@/data/alerts.json';

export const MockDataService = {
  getTelemetryMetrics: () => telemetryMocks,
  getStadiumLayout: () => stadiumMocks,
  getActiveAlerts: () => alertsMocks,
};
