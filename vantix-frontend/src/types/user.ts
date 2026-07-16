export type UserRole = 'OPERATOR' | 'FIFA_OFFICIAL' | 'VOLUNTEER' | 'SECURITY' | 'MEDICAL' | 'FAN';

export interface UserSession {
  userId: string;
  username: string;
  fullName: string;
  role: UserRole;
  token?: string;
}
