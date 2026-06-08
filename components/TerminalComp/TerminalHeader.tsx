import React from "react";

const NAV_ITEMS = [
  "help",
  "about",
  "projects",
  "skills",
  "experience",
  "contact",
  "clear",
  "blog",
] as const;

export default function TerminalHeader({
  onNavigate,
}: {
  onNavigate: (cmd: string) => void;
}) {
  return (
    <header className="terminal-header">
      <div className="window-dots" aria-hidden="true">
        <div className="dot dot-red" aria-label="Close"></div>
        <div className="dot dot-yellow" aria-label="Minimize"></div>
        <div className="dot dot-green" aria-label="Maximize"></div>
      </div>
      <nav className="terminal-nav" aria-label="Terminal navigation">
        {NAV_ITEMS.map((cmd) => (
          <button
            key={cmd}
            onClick={() => onNavigate(cmd)}
            className="nav-button"
            type="button"
            aria-label={`Navigate to ${cmd}`}
          >
            {cmd}
          </button>
        ))}
      </nav>
    </header>
  );
}
