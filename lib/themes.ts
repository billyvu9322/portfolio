// Terminal color themes. The actual colors live in CSS custom properties in
// `public/css/TerminalComp.css` (one `[data-theme="<id>"]` block per theme).
// This module is just the registry the `theme` / `/theme` command lists from,
// plus helpers for validating + persisting the user's choice.

export interface ThemeMeta {
  id: string;
  label: string;
  blurb: string;
}

export const THEMES = [
  {
    id: "claude-clay-dark",
    label: "Claude Clay Dark",
    blurb: "warm dark · coral accent (default)",
  },
  {
    id: "claude-clay-light",
    label: "Claude Clay Light",
    blurb: "warm parchment · coral accent",
  },
  { id: "amp-dark", label: "Amp Soft Dark", blurb: "soft charcoal · cool blue" },
  { id: "forest-light", label: "Muted Forest", blurb: "light · forest green" },
  { id: "matrix", label: "Matrix", blurb: "classic neon-green CRT" },
] as const satisfies readonly ThemeMeta[];

export type ThemeId = (typeof THEMES)[number]["id"];

export const DEFAULT_THEME: ThemeId = "claude-clay-dark";

export const THEME_IDS: ThemeId[] = THEMES.map((t) => t.id);

export const THEME_STORAGE_KEY = "portfolio_theme";

export function isThemeId(value: string): value is ThemeId {
  return (THEME_IDS as string[]).includes(value);
}
