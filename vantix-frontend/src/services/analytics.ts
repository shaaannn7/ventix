import type { TelemetryChartDataPoint } from '@/types/charts';

export const AnalyticsService = {
  generateTrendAnalysis: (data: TelemetryChartDataPoint[]): number => {
    if (!data.length) return 0;
    return data[data.length - 1].attendance - data[0].attendance;
  },
};
