"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Tag from "@/components/Tag";
import { ShellContext } from "@/context/ShellContext";
import { ThemeContext } from "@/context/ThemeContext";
import {
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  isThemeId,
  type ThemeId,
} from "@/lib/themes";

function isBlogPath(pathname: string): boolean {
  return pathname === "/blog" || pathname.startsWith("/blog/");
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isBlog = isBlogPath(pathname);
  const [hideIdentityOnMobile, setHideIdentityOnMobile] = useState(false);

  // Theme owned here so it cascades (via data-theme on .app-shell) to BOTH the
  // identity sidebar and the terminal pane. Default matches the CSS base, so
  // the first paint never flashes before the saved choice is restored.
  const [theme, setThemeState] = useState<ThemeId>(DEFAULT_THEME);

  useEffect(() => {
    // One-time restore of a browser-only value on mount. Lazy useState init
    // can't be used here: it would run on the server (no localStorage) and, on
    // the client, diverge from the server-rendered default → hydration
    // mismatch on the data-theme attribute. setState-in-effect is correct.
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored && isThemeId(stored)) setThemeState(stored);
    } catch {
      /* localStorage unavailable — keep default */
    }
  }, []);

  const setTheme = (id: ThemeId): void => {
    setThemeState(id);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, id);
    } catch {
      /* ignore persistence failure */
    }
  };

  const hideIdentityOnMobileOnly =
    isBlog || (isHome && hideIdentityOnMobile);

  return (
    <ShellContext.Provider value={{ setHideIdentityOnMobile }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
      <main className="app-shell" data-theme={theme} role="main">
        <div className="main-content-area">
          <section
            className={`identity-pane ${
              hideIdentityOnMobileOnly ? "hide-on-mobile" : ""
            }`}
            aria-label="Developer identity — Binh Vu"
          >
            <Tag />
          </section>
          <section className="terminal-pane">{children}</section>
        </div>
      </main>
      </ThemeContext.Provider>
    </ShellContext.Provider>
  );
}
