import { DESIGN_TOKENS } from './designTokens';

export const THEME_TOKENS = {
  background: DESIGN_TOKENS.colors.obsidian.base,
  surface: DESIGN_TOKENS.colors.obsidian.muted,
  surfaceElevated: DESIGN_TOKENS.colors.obsidian.elevated,
  border: DESIGN_TOKENS.colors.system.border,
  text: {
    primary: '#ffffff',
    secondary: DESIGN_TOKENS.colors.system.mutedText,
    accent: DESIGN_TOKENS.colors.system.cyan,
    ai: DESIGN_TOKENS.colors.system.purple,
  },
} as const;
