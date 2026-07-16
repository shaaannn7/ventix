/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#050506',
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
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'monospace'],
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
      borderRadius: {
        '2xs': '2px',
        'xs': '4px',
        'sm': '6px',
        'md': '8px',
      },
      boxShadow: {
        'base': '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
        'high': '0 12px 24px -4px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        'ai-glow': '0 0 12px 0 rgba(168, 85, 247, 0.15)',
        'alert-glow': '0 0 12px 0 rgba(239, 68, 68, 0.15)',
      },
      animation: {
        'strobe': 'strobe 800ms ease-in-out infinite',
        'shimmer': 'shimmer 1.5s infinite linear',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        strobe: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}
