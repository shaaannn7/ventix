export interface EmergencyIncident {
  id: string;
  title: string;
  location: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'reported' | 'dispatching' | 'on-site' | 'resolved';
  reporter: string;
  timestamp: number;
  assignedTeamId?: string;
  coordinates: [number, number];
}
