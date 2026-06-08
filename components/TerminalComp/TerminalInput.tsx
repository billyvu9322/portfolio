import React from "react";
import { THEMES } from "@/lib/themes";
import { Prompt } from "./ui";
import type { CmdSuggestion } from "./types";

interface TerminalInputProps {
  user: string;
  host: string;
  cwd: string;
  input: string;
  theme: string;
  themePickerOpen: boolean;
  themeIndex: number;
  cmdSuggest: CmdSuggestion[];
  cmdIndex: number;
  isAILoading: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onInputChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocusInput: () => void;
  onThemeHover: (index: number) => void;
  onThemePick: (themeId: string) => void;
  onCommandHover: (index: number) => void;
  onCommandPick: (name: string) => void;
}

export default function TerminalInput({
  user,
  host,
  cwd,
  input,
  theme,
  themePickerOpen,
  themeIndex,
  cmdSuggest,
  cmdIndex,
  isAILoading,
  inputRef,
  onSubmit,
  onInputChange,
  onKeyDown,
  onFocusInput,
  onThemeHover,
  onThemePick,
  onCommandHover,
  onCommandPick,
}: TerminalInputProps) {
  return (
    <form onSubmit={onSubmit} className="input-form">
      {themePickerOpen && (
        <div className="cmd-suggest" role="listbox" aria-label="Themes">
          <div className="cmd-suggest-header">Themes</div>
          <ul className="cmd-suggest-list">
            {THEMES.map((t, i) => (
              <li
                key={t.id}
                role="option"
                aria-selected={i === themeIndex}
                data-active={i === themeIndex}
                className="cmd-suggest-item"
                onMouseEnter={() => onThemeHover(i)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  onThemePick(t.id);
                }}
              >
                <span className="theme-item-marker" aria-hidden="true">
                  {t.id === theme ? "●" : "○"}
                </span>
                <span className="cmd-suggest-name">{t.id}</span>
                <span className="cmd-suggest-desc">
                  {t.label} — {t.blurb}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {cmdSuggest.length > 0 && (
        <div className="cmd-suggest" role="listbox" aria-label="Command suggestions">
          <div className="cmd-suggest-header">Commands</div>
          <ul className="cmd-suggest-list">
            {cmdSuggest.map((s, i) => (
              <li
                key={s.name}
                role="option"
                aria-selected={i === cmdIndex}
                data-active={i === cmdIndex}
                className="cmd-suggest-item"
                onMouseEnter={() => onCommandHover(i)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  onCommandPick(s.name);
                }}
              >
                <span className="cmd-suggest-name">{s.name}</span>
                {s.desc && <span className="cmd-suggest-desc">{s.desc}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
      <label htmlFor="terminal-input" className="sr-only">
        Terminal command input
      </label>
      <Prompt user={user} host={host} cwd={cwd} />
      <div className="input-area">
        <span className="input-value" aria-hidden="true">
          {input}
        </span>
        <span className="cursor-block" aria-hidden="true" />
        <input
          id="terminal-input"
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={onKeyDown}
          className="terminal-input"
          onFocus={onFocusInput}
          autoComplete="off"
          spellCheck="false"
          aria-label="Terminal command input"
          disabled={isAILoading}
        />
      </div>
    </form>
  );
}
