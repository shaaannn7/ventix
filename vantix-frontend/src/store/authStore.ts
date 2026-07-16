import { create } from 'zustand';
import type { UserSession } from '@/types/user';

interface AuthState {
  user: UserSession | null;
  isAuthenticated: boolean;
  login: (user: UserSession) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    userId: '1',
    username: 'fifa_op_01',
    fullName: 'J. Smith',
    role: 'OPERATOR',
  },
  isAuthenticated: true,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
