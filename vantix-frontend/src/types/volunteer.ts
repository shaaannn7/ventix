export interface VolunteerTask {
  id: string;
  title: string;
  description: string;
  assignedLocation: string;
  status: 'pending' | 'active' | 'completed';
  dueDate: number;
}
