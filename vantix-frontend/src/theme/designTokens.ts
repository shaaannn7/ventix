export const DESIGN_TOKENS = {
  colors: {
    obsidian: {
      base: '#050506',
      muted: '#09090b',
      elevated: '#121214',
      sub: '#1c1c1f',
    },
    system: {
      border: '#27272a',
      cyan: '#06b6d4',
      purple: '#a855f7',
      green: '#10b981',
      crimson: '#ef4444',
      amber: '#f59e0b',
      mutedText: '#71717a',
    },
  },
  fonts: {
    sans: 'Outfit, Inter, sans-serif',
    mono: 'JetBrains Mono, SF Mono, monospace',
  },
  spacing: {
    '2xs': '2px',
    'xs': '4px',
    'sm': '8px',
    'md': '12px',
    'lg': '16px',
    'xl': '24px',
    '2xl': '32px',
  },
  radius: {
    '2xs': '2px',
    'xs': '4px',
    'sm': '6px',
    'md': '8px',
  },
} as const;
