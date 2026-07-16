import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Activity,
  Users,
  ShieldAlert,
  Train,
  TrendingUp,
  Leaf,
  UserCheck,
  Shield,
  Sparkles,
  Settings,
  Sliders,
} from 'lucide-react';

const NAV_ITEMS = [
  { path: '/', label: 'Mission Control', icon: Activity },
  { path: '/ai-operations', label: 'AI Operations', icon: Sparkles },
  { path: '/simulation', label: 'Decision Lab', icon: Sliders },
  { path: '/crowd', label: 'Crowd', icon: Users },
  { path: '/emergency', label: 'Emergency', icon: ShieldAlert },
  { path: '/transport', label: 'Transit', icon: Train },
  { path: '/analytics', label: 'Analytics', icon: TrendingUp },
  { path: '/sustainability', label: 'Resources', icon: Leaf },
  { path: '/volunteers', label: 'Volunteers', icon: UserCheck },
  { path: '/security', label: 'Security', icon: Shield },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="w-[56px] bg-obsidian-muted border-r border-system-border flex flex-col h-full select-none items-center py-sm gap-xs">
      {/* Brand dot */}
      <div className="w-[36px] h-[36px] flex items-center justify-center mb-sm shrink-0">
        <div className="w-2 h-2 rounded-full bg-system-purple" />
      </div>

      {/* Nav icons */}
      <nav className="flex flex-col gap-[2px] flex-1 overflow-y-auto scrollbar-none w-full px-xs">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              title={item.label}
              className={`w-full flex items-center justify-center p-xs rounded-sm transition-all duration-150 group relative ${
                isActive
                  ? 'bg-obsidian-elevated text-system-cyan'
                  : 'text-system-mutedText hover:text-white hover:bg-obsidian-elevated/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {/* Tooltip */}
              <span className="absolute left-full ml-2 px-sm py-xs bg-obsidian-elevated border border-system-border text-xs text-white rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 font-sans">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
