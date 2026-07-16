import { useTelemetryStore } from '@/store/telemetryStore';

export const useTelemetry = () => {
  const metrics = useTelemetryStore((state) => state.metrics);
  const incidents = useTelemetryStore((state) => state.incidents);
  const systemStatus = useTelemetryStore((state) => state.systemStatus);

  return {
    metrics,
    incidents,
    systemStatus,
  };
};
