"use client";

import { createContext, useContext } from "react";
import { DEFAULT_THEME, type ThemeId } from "@/lib/themes";

export interface ThemeContextValue {
  theme: ThemeId;
  setTheme: (id: ThemeId) => void;
}

// Theme lives on the shell so both the identity sidebar and the terminal pane
// (siblings under .app-shell) follow the same `data-theme`. AppShell is the
// provider; TerminalComp's `theme` command is the main consumer/setter.
export const ThemeContext = createContext<ThemeContextValue>({
  theme: DEFAULT_THEME,
  setTheme: () => {},
});

export const useTheme = (): ThemeContextValue => useContext(ThemeContext);
