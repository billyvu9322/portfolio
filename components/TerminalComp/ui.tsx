"use client";

import React, { useEffect, useState } from "react";
import { getNeofetchData } from "./commands/virtualFs";
import { HELP_ITEMS, WELCOME_LINES } from "./constants";
import type { OutputLineProps, PromptProps } from "./types";

export const TypewriterText: React.FC<{
  text: string;
  speed?: number;
  onComplete?: () => void;
}> = ({ text, speed = 20, onComplete }) => {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (currentIndex === text.length && onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <>
      {displayedText}
      {currentIndex < text.length && (
        <span className="animate-pulse text-green-400">|</span>
      )}
    </>
  );
};

export const AIResponse: React.FC<{ text: string }> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 20);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <div className="ai-response">
      <div className="flex items-center space-x-2 mb-2">
        <span className="text-green-400 font-mono text-sm">AI Assistant:</span>
      </div>
      <div className="text-gray-300 font-mono text-sm leading-relaxed whitespace-pre-wrap">
        {displayedText}
        {currentIndex < text.length && (
          <span className="animate-pulse text-green-400">|</span>
        )}
      </div>
    </div>
  );
};

export const AILoading: React.FC = () => {
  return (
    <div className="flex items-center space-x-2 text-green-400 font-mono text-sm">
      <span>AI thinking</span>
      <span className="animate-pulse">...</span>
    </div>
  );
};

export const Neofetch: React.FC<{ user: string; host: string }> = ({ user, host }) => {
  const d = getNeofetchData(user, host);
  return (
    <div className="neofetch">
      <div className="neofetch-art">
        <pre className="neofetch-logo" aria-hidden="true">
          {[
            "  .--------------.",
            "  |  portfolio   |",
            "  |   terminal   |",
            "  '--------------'",
            "         |",
            "    .----+----.",
            "    |  ~ $     |",
            "    '----------'",
          ].join("\n")}
        </pre>
      </div>
      <div className="neofetch-info">
        <div className="neofetch-user">{d.user}</div>
        <div className="neofetch-divider">───────────────</div>
        <dl className="neofetch-rows">
          <div className="neofetch-row"><dt>OS:</dt><dd>{d.os}</dd></div>
          <div className="neofetch-row"><dt>Host:</dt><dd>{d.host}</dd></div>
          <div className="neofetch-row"><dt>Kernel:</dt><dd>{d.kernel}</dd></div>
          <div className="neofetch-row"><dt>Uptime:</dt><dd>{d.uptime}</dd></div>
          <div className="neofetch-row"><dt>Shell:</dt><dd>{d.shell}</dd></div>
          <div className="neofetch-row"><dt>Theme:</dt><dd>{d.theme}</dd></div>
        </dl>
      </div>
    </div>
  );
};

export const Prompt: React.FC<PromptProps & { cwd?: string }> = React.memo(
  ({ user, host, cwd = "~" }) => (
    <span
      className="terminal-prompt"
      aria-label={`Command prompt for ${user} at ${host}`}
    >
      <span className="prompt-user">{user}@{host}</span>
      <span className="prompt-separator">:</span>
      <span className="prompt-directory">{cwd === "~" ? "~" : cwd}</span>
      <span className="prompt-symbol">$ </span>
    </span>
  ),
);
Prompt.displayName = "Prompt";

export const OutputLine: React.FC<OutputLineProps> = React.memo(({ children }) => (
  <div className="output-line">{children}</div>
));
OutputLine.displayName = "OutputLine";

export const Help: React.FC = () => {
  const [displayedItems, setDisplayedItems] = useState(HELP_ITEMS.slice(0, 0));
  const [currentStep, setCurrentStep] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < HELP_ITEMS.length) {
        setDisplayedItems((prev) => [...prev, HELP_ITEMS[currentStep]]);
        setCurrentStep(currentStep + 1);
      }
    }, 120);
    return () => clearTimeout(timer);
  }, [currentStep]);

  return (
    <div className="help-command" role="region" aria-label="Help menu">
      {displayedItems.map((item, i) =>
        item.type === "title" ? (
          <p key={i}><TypewriterText text={item.text || ""} speed={20} /></p>
        ) : (
          <ul key={i}>
            <li>
              <span className="command-name">
                <TypewriterText text={item.command || ""} speed={20} />
              </span>{" "}
              – <TypewriterText text={item.description || ""} speed={20} />
            </li>
          </ul>
        ),
      )}
    </div>
  );
};

export const Welcome: React.FC = () => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentLine < WELCOME_LINES.length) {
        setDisplayedLines((prev) => [...prev, WELCOME_LINES[currentLine]]);
        setCurrentLine(currentLine + 1);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [currentLine]);

  return (
    <div role="region" aria-label="Welcome message">
      {displayedLines.map((line, i) => (
        <OutputLine key={i}>
          <TypewriterText text={line} speed={20} />
        </OutputLine>
      ))}
    </div>
  );
};
