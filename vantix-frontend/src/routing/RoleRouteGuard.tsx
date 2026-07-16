import React from 'react';
import { useAuthStore } from '@/store/authStore';
import type { UserRole } from '@/types/user';

interface RoleRouteGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export const RoleRouteGuard: React.FC<RoleRouteGuardProps> = ({ children, allowedRoles }) => {
  const user = useAuthStore((state) => state.user);
  
  if (!user || !allowedRoles.includes(user.role)) {
    return (
      <div className="flex items-center justify-center h-screen bg-obsidian text-system-crimson font-mono">
        ACCESS_DENIED: Operational privileges mismatch.
      </div>
    );
  }

  return <>{children}</>;
};
