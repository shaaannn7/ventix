import { createContext } from 'react';

export interface CommandPaletteContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const CommandPaletteContext = createContext<CommandPaletteContextType | undefined>(undefined);
