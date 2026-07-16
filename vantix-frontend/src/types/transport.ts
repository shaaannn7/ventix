export interface TransitLineStatus {
  lineId: string;
  lineName: string;
  type: 'metro' | 'shuttle' | 'bus';
  capacityPct: number;
  waitMinutes: number;
  frequencyMinutes: number;
  status: 'optimal' | 'delayed' | 'critical';
}
