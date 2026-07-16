import React, { useEffect, useState } from 'react';
import { Search, Bell, User, LogOut, ChevronDown } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useTelemetryStore } from '@/store/telemetryStore';

export const TopBar: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const setShowSearch = useTelemetryStore((state) => state.setShowSearch);

  const [matchSeconds, setMatchSeconds] = useState(4452);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Match clock counts up every second
  useEffect(() => {
    const interval = setInterval(() => {
      setMatchSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const totalMins = Math.floor(matchSeconds / 60);
  const totalSecs = matchSeconds % 60;
  const matchTimer = `${String(totalMins).padStart(2, '0')}:${String(totalSecs).padStart(2, '0')}`;

  return (
    <header className="h-[52px] bg-obsidian-muted border-b border-system-border flex items-center px-lg justify-between select-none shrink-0">

      {/* Left: Brand + Match context */}
      <div className="flex items-center gap-xl">
        {/* Brand */}
        <span className="font-mono text-sm font-bold text-white tracking-[0.15em] uppercase">
          Vantix
        </span>

        {/* Divider */}
        <div className="w-px h-5 bg-system-border" />

        {/* Match context — the ONE piece of live data here */}
        <div className="flex items-center gap-sm">
          <div className="flex items-center gap-xs">
            <span className="text-sm font-semibold text-white">MEX</span>
            <span className="text-sm font-bold text-system-cyan px-xs">2 – 1</span>
            <span className="text-sm font-semibold text-white">BRA</span>
          </div>
          <div className="flex items-center gap-xs ml-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-system-green animate-pulse" />
            <span className="font-mono text-xs text-system-mutedText">{matchTimer}</span>
          </div>
        </div>
      </div>

      {/* Right: Search + Notifications + User */}
      <div className="flex items-center gap-md">

        {/* Search */}
        <button
          onClick={() => setShowSearch(true)}
          aria-label="Search telemetry data"
          className="flex items-center gap-sm px-md py-xs bg-obsidian-elevated border border-system-border rounded-sm text-xs text-system-mutedText hover:text-white hover:border-system-cyan/40 transition-colors"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden sm:block">Search</span>
          <span className="hidden md:flex items-center gap-xs ml-sm px-xs py-[1px] bg-obsidian-sub border border-system-border rounded text-[9px] font-mono">⌘K</span>
        </button>

        {/* Notifications */}
        <button
          aria-label="View notifications"
          className="relative p-xs bg-obsidian-elevated border border-system-border rounded-sm text-system-mutedText hover:text-white transition-colors"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-system-crimson rounded-full" />
        </button>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            aria-label="User menu"
            className="flex items-center gap-xs px-sm py-xs bg-obsidian-elevated border border-system-border rounded-sm text-xs text-white hover:bg-obsidian-sub transition-colors"
          >
            <div className="w-5 h-5 rounded-full bg-system-purple/20 border border-system-purple/40 flex items-center justify-center text-[9px] font-bold text-system-purple">
              {user?.username?.[0]?.toUpperCase() ?? 'OP'}
            </div>
            <span className="hidden sm:block font-medium">{user?.username}</span>
            <ChevronDown className="w-3 h-3 text-system-mutedText" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-xs w-[160px] bg-obsidian-elevated border border-system-border rounded-sm shadow-high py-xs z-50">
              <button
                className="w-full flex items-center gap-sm px-md py-sm text-left text-xs text-white hover:bg-obsidian-sub"
              >
                <User className="w-3.5 h-3.5 text-system-mutedText" />
                <span>Profile</span>
              </button>
              <div className="h-px bg-system-border mx-md my-xs" />
              <button
                onClick={() => logout()}
                aria-label="Logout"
                className="w-full flex items-center gap-sm px-md py-sm text-left text-xs text-system-crimson hover:bg-obsidian-sub"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopBar;
