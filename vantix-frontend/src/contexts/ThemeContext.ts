import { createContext } from 'react';

export type Theme = 'dark';

export interface ThemeContextType {
  theme: Theme;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
