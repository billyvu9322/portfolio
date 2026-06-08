"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import "@/public/css/TerminalComp.css";

import Blog from "./TerminalComp/Blog";
import BlogSearchResults from "./TerminalComp/BlogSearchResults";
import { searchBlogPosts, type BlogSearchPost } from "@/lib/blog-search";
import { THEMES } from "@/lib/themes";
import { useTheme } from "@/context/ThemeContext";
import {
  HOME_CD_SECTIONS,
  MAX_COMMAND_HISTORY,
} from "./TerminalComp/constants";
import {
  getCommandSuggestions,
  getRemainingRequests,
  getTabCompletion,
  incrementAIUsage,
} from "./TerminalComp/helpers";
import {
  AILoading,
  AIResponse,
  Prompt,
  Welcome,
} from "./TerminalComp/ui";
import TerminalHeader from "./TerminalComp/TerminalHeader";
import TerminalInput from "./TerminalComp/TerminalInput";
import {
  createOutputCommands,
  getSectionContent,
  renderBlogFallback,
} from "./TerminalComp/commandRenderers";
import type {
  CmdSuggestion,
  HistoryLine,
  TerminalProps,
} from "./TerminalComp/types";

export default function Terminal({
  onFirstCommand,
  blogRoute = false,
  initialBlogSlug = null,
  initialBlogPost = null,
  initialSection = null,
  initialCommand = null,
}: TerminalProps) {
  const router = useRouter();
  const [history, setHistory] = useState<HistoryLine[]>([]);
  const [input, setInput] = useState<string>("");
  const [cwd, setCwd] = useState<string>("~");
  const [tabSuggestions, setTabSuggestions] = useState<string[] | null>(null);
  const [cmdSuggest, setCmdSuggest] = useState<CmdSuggestion[]>([]);
  const [cmdIndex, setCmdIndex] = useState<number>(0);
  const [themePickerOpen, setThemePickerOpen] = useState<boolean>(false);
  const [themeIndex, setThemeIndex] = useState<number>(0);
  const [isFirstUserCommand, setIsFirstUserCommand] = useState<boolean>(true);
  const [isAILoading, setIsAILoading] = useState<boolean>(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const savedInputRef = useRef<string>("");
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [blogPostsCache, setBlogPostsCache] = useState<BlogSearchPost[]>([]);
  // Theme is owned by AppShell (so the sidebar follows it too) and shared here.
  const { theme, setTheme: applyTheme } = useTheme();

  const user = "binhvu";
  const host = "billy";

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/blog");
        if (!res.ok) return;
        const data: { posts: BlogSearchPost[] } = await res.json();
        if (!cancelled) setBlogPostsCache(data.posts ?? []);
      } catch {
        /* ignore */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // ============ AI Command Handler: shows user question (prompt) + AI response ============
  const handleAICommand = async (
    question: string,
    historyWithPrompt: HistoryLine[],
  ): Promise<void> => {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) {
      setHistory([
        ...historyWithPrompt,
        {
          type: "output",
          content: "Please provide a question. Usage: ai <your question>",
        },
      ]);
      return;
    }

    const remaining = getRemainingRequests();
    if (remaining <= 0) {
      setHistory([
        ...historyWithPrompt,
        {
          type: "output",
          content:
            "Daily AI request limit reached (10/day). Try again tomorrow!",
        },
      ]);
      return;
    }

    setIsAILoading(true);
    setHistory([
      ...historyWithPrompt,
      { type: "output", content: <AILoading /> },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmedQuestion }),
      });

      const data = await response.json();
      setIsAILoading(false);

      setHistory((prev) => {
        const withoutLoading = prev.slice(0, -1);
        if (data.success) {
          incrementAIUsage();
          const newRemaining = getRemainingRequests();
          return [
            ...withoutLoading,
            { type: "output", content: <AIResponse text={data.response} /> },
            {
              type: "output",
              content: `\n Remaining AI requests today: ${newRemaining}/10`,
            },
          ];
        }
        return [
          ...withoutLoading,
          { type: "output", content: `AI Error: ${data.error}` },
        ];
      });
    } catch {
      setIsAILoading(false);
      setHistory((prev) => [
        ...prev.slice(0, -1),
        {
          type: "output",
          content: "Failed to connect to AI. Please try again.",
        },
      ]);
    }
  };

  const redirectFromBlogRoute = (trimmedCmd: string): boolean => {
    if (!blogRoute) return false;

    const parts = trimmedCmd.split(/\s+/);
    const commandName = parts[0]?.toLowerCase() ?? "";
    const args = parts.slice(1);

    if (commandName === "blog") {
      const q = args.join(" ").trim();
      if (q) {
        router.push(`/?cmd=${encodeURIComponent(`blog ${q}`)}`);
      } else {
        router.push("/blog");
      }
      return true;
    }

    if (commandName === "cd" && args[0]?.toLowerCase() === "blog") {
      router.push("/blog");
      return true;
    }

    if (
      commandName === "cd" &&
      args[0] &&
      HOME_CD_SECTIONS.includes(
        args[0].toLowerCase() as (typeof HOME_CD_SECTIONS)[number],
      )
    ) {
      const dir = args[0].toLowerCase();
      router.push(dir === "welcome" ? "/" : `/?section=${dir}`);
      return true;
    }

    router.push(`/?cmd=${encodeURIComponent(trimmedCmd)}`);
    return true;
  };

  const processCommand = async (
    cmd: string,
    isAuto: boolean = false,
  ): Promise<void> => {
    const trimmedCmd = cmd.trim();

    // `theme` is a pure UI command — handle it in place even on /blog routes
    // instead of redirecting back to the home terminal.
    const isThemeCmd = /^\/?theme(\s|$)/i.test(trimmedCmd);

    if (!isAuto && blogRoute && trimmedCmd && !isThemeCmd) {
      redirectFromBlogRoute(trimmedCmd);
      return;
    }

    const newHist: HistoryLine[] = [
      ...history,
      { type: "prompt", command: cmd },
    ];

    if (isFirstUserCommand && !isAuto && onFirstCommand) {
      onFirstCommand();
      setIsFirstUserCommand(false);
    }

    // Command history: store every successfully run command (newest first), skip empty and auto
    if (!isAuto && trimmedCmd) {
      setCommandHistory((prev) => {
        if (prev[0] === trimmedCmd) return prev;
        return [trimmedCmd, ...prev].slice(0, MAX_COMMAND_HISTORY);
      });
      setHistoryIndex(-1);
    }

    // ============ AI command: show user prompt + response (handleAICommand adds prompt so it stays visible) ============
    if (trimmedCmd.toLowerCase().startsWith("ai ")) {
      const question = trimmedCmd.substring(3).trim();
      await handleAICommand(question, newHist);
      return;
    }

    // Handle 'ai' alone without question
    if (trimmedCmd.toLowerCase() === "ai") {
      newHist.push({
        type: "output",
        content: "Please provide a question. Usage: ai <your question>",
      });
      setHistory(newHist);
      return;
    }

    // echo: repeat what the user typed (flavor command)
    if (trimmedCmd.toLowerCase().startsWith("echo ")) {
      newHist.push({
        type: "output",
        content: trimmedCmd.slice(5).trim() || " ",
      });
      setHistory(newHist);
      return;
    }
    if (trimmedCmd.toLowerCase() === "echo") {
      newHist.push({ type: "output", content: " " });
      setHistory(newHist);
      return;
    }

    const parts = trimmedCmd.split(/\s+/);
    // Allow a leading slash (e.g. `/theme`, Claude-Code style) on any command.
    const commandName = (parts[0]?.toLowerCase() ?? "").replace(/^\/+/, "");
    const args = parts.slice(1);

    // cd [dir] — changes the working "directory" and may navigate (side effects)
    if (commandName === "cd") {
      if (args.length === 0) {
        setCwd("~");
        newHist.push({ type: "output", content: "" });
        setHistory(newHist);
        return;
      }
      const dir = args[0].toLowerCase();
      if (dir === "blog") {
        router.push("/blog");
        return;
      }
      const sectionContent = getSectionContent(dir);
      if (sectionContent !== null) {
        setCwd("~");
        newHist.push({ type: "output", content: sectionContent });
        setHistory(newHist);
        return;
      }
      newHist.push({
        type: "output",
        content: (
          <span className="terminal-stderr">
            cd: {args[0]}: No such file or directory
          </span>
        ),
      });
      setHistory(newHist);
      return;
    }

    // clear — wipe the screen, no output line
    if (commandName === "clear") {
      setHistory([]);
      return;
    }

    // blog — navigate to the blog index or render search results (side effects)
    if (commandName === "blog") {
      const query = args.join(" ").trim();
      if (!query) {
        router.push("/blog");
        return;
      }
      const matches = searchBlogPosts(blogPostsCache, query);
      newHist.push({
        type: "output",
        content: <BlogSearchResults posts={matches} query={query} />,
      });
      setHistory(newHist);
      return;
    }

    const outputCommands = createOutputCommands({
      cwd,
      user,
      host,
      theme,
      commandHistory,
      setThemeIndex,
      setThemePickerOpen,
      applyTheme,
    });

    const handler = outputCommands[commandName];
    if (handler) {
      newHist.push({ type: "output", content: handler(args) });
      setHistory(newHist);
      return;
    }

    // Try blog title/slug search before "command not found"
    if (blogPostsCache.length > 0 && trimmedCmd.length >= 2) {
      const blogFallback = renderBlogFallback(trimmedCmd, blogPostsCache);
      if (blogFallback) {
        newHist.push({
          type: "output",
          content: blogFallback,
        });
        setHistory(newHist);
        return;
      }
    }

    newHist.push({
      type: "output",
      content: (
        <span className="terminal-stderr">
          bash: command not found: {parts[0] ?? commandName}
        </span>
      ),
    });
    setHistory(newHist);
  };

  // Tab: fill the command + a space so the user can keep typing args.
  const fillCmdSuggest = (name: string): void => {
    setInput(name + " ");
    setCmdSuggest([]);
    setCmdIndex(0);
    inputRef.current?.focus();
  };

  // Enter / click: pick AND run immediately — no extra Enter needed.
  const runCmdSuggest = (name: string): void => {
    if (isAILoading) return;
    setCmdSuggest([]);
    setCmdIndex(0);
    setTabSuggestions(null);
    setInput("");
    processCommand(name);
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (isAILoading) return;
    setTabSuggestions(null);
    setCmdSuggest([]);
    setThemePickerOpen(false);
    processCommand(input);
    setInput("");
  };

  const handleNav = async (cmd: string): Promise<void> => {
    if (blogRoute) {
      if (cmd === "blog") {
        router.push("/blog");
        return;
      }
      const cdSections = [
        "about",
        "projects",
        "skills",
        "experience",
        "contact",
      ];
      if (cdSections.includes(cmd)) {
        router.push(`/?section=${cmd}`);
        return;
      }
      router.push(`/?cmd=${encodeURIComponent(cmd)}`);
      return;
    }

    const cdSections = ["about", "projects", "skills", "experience", "contact"];
    const commandToRun = cdSections.includes(cmd) ? `cd ${cmd}` : cmd;
    await processCommand(commandToRun);
  };

  const focusInput = (): void => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (inputRef.current && !isTouchDevice) {
      inputRef.current.focus();
    }

    setTimeout(() => {
      terminalRef.current?.scrollTo({
        top: terminalRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.ctrlKey && e.key === "l") {
      e.preventDefault();
      setHistory([]);
      setHistoryIndex(-1);
      return;
    }
    if (e.ctrlKey && e.key === "c") {
      e.preventDefault();
      if (input) {
        setHistory((prev) => [
          ...prev,
          { type: "prompt", command: input },
          { type: "output", content: "^C" },
        ]);
      }
      setInput("");
      setHistoryIndex(-1);
      return;
    }
    // Theme picker intercepts nav keys while open.
    if (themePickerOpen) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setThemeIndex((i) => (i + 1) % THEMES.length);
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setThemeIndex((i) => (i - 1 + THEMES.length) % THEMES.length);
        return;
      }
      if (e.key === "Enter" || e.key === "Tab") {
        e.preventDefault();
        applyTheme(THEMES[themeIndex]?.id ?? THEMES[0].id);
        setThemePickerOpen(false);
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setThemePickerOpen(false);
        return;
      }
    }
    // Command suggestion popup intercepts nav keys while open.
    if (cmdSuggest.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setCmdIndex((i) => (i + 1) % cmdSuggest.length);
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setCmdIndex((i) => (i - 1 + cmdSuggest.length) % cmdSuggest.length);
        return;
      }
      const picked = cmdSuggest[cmdIndex]?.name ?? cmdSuggest[0].name;
      if (e.key === "Enter") {
        e.preventDefault();
        runCmdSuggest(picked);
        return;
      }
      if (e.key === "Tab") {
        e.preventDefault();
        fillCmdSuggest(picked);
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setCmdSuggest([]);
        return;
      }
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      if (historyIndex === -1) {
        savedInputRef.current = input;
        setHistoryIndex(0);
        setInput(commandHistory[0]);
      } else if (historyIndex < commandHistory.length - 1) {
        setHistoryIndex((i) => i + 1);
        setInput(commandHistory[historyIndex + 1]);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput(savedInputRef.current);
      } else {
        setHistoryIndex((i) => i - 1);
        setInput(commandHistory[historyIndex - 1]);
      }
      return;
    }
    if (e.key === "Tab") {
      e.preventDefault();
      const { matches, setLine } = getTabCompletion(input, blogPostsCache);
      if (matches.length === 1) {
        setInput(setLine);
        setTabSuggestions(null);
      } else if (matches.length > 1) {
        setInput(setLine);
        setTabSuggestions(matches);
      }
    }
  };

  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (!isTouchDevice) {
      inputRef.current?.focus();
    }
    setTimeout(() => {
      if (blogRoute) {
        setHistory([
          { type: "prompt", command: "cd welcome" },
          { type: "output", content: <Welcome /> },
          { type: "prompt", command: "blog" },
          {
            type: "output",
            content: (
              <div className="themed-section">
                <Blog
                  slug={initialBlogSlug}
                  initialPost={initialBlogPost}
                  syncUrls
                />
              </div>
            ),
          },
        ]);
        setIsFirstUserCommand(false);
        return;
      }

      const boot = async () => {
        if (initialSection) {
          if (initialSection === "blog") {
            router.replace("/blog", { scroll: false });
            return;
          }
          await processCommand(`cd ${initialSection}`, true);
          router.replace("/", { scroll: false });
        } else if (initialCommand) {
          await processCommand(initialCommand, true);
          router.replace("/", { scroll: false });
        } else {
          await processCommand("cd welcome", true);
        }
      };
      void boot();
    }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = terminalRef.current;
    if (!el) return;
    const id = requestAnimationFrame(() => {
      const blogEl = el.querySelector(".terminal-blog");
      if (blogEl && blogRoute) {
        const top = (blogEl as HTMLElement).offsetTop - 8;
        el.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
        return;
      }
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    });
    return () => cancelAnimationFrame(id);
  }, [history, blogRoute]);

  return (
    <div
      className="terminal-container"
      onClick={focusInput}
      role="application"
      aria-label="Interactive terminal"
    >
      <TerminalHeader onNavigate={handleNav} />
      <main
        ref={terminalRef}
        className="terminal-body"
        aria-live="polite"
        aria-atomic="false"
      >
        {history.map((line, i) => (
          <div key={i} className="history-line">
            {line.type === "prompt" ? (
              <div>
                <Prompt user={user} host={host} cwd={cwd} />
                <span className="command-text">{line.command}</span>
              </div>
            ) : (
              line.content
            )}
          </div>
        ))}
        <TerminalInput
          user={user}
          host={host}
          cwd={cwd}
          input={input}
          theme={theme}
          themePickerOpen={themePickerOpen}
          themeIndex={themeIndex}
          cmdSuggest={cmdSuggest}
          cmdIndex={cmdIndex}
          isAILoading={isAILoading}
          inputRef={inputRef}
          onSubmit={handleSubmit}
          onInputChange={(v) => {
            setInput(v);
            setHistoryIndex(-1);
            setTabSuggestions(null);
            setCmdSuggest(getCommandSuggestions(v));
            setCmdIndex(0);
            setThemePickerOpen(false);
          }}
          onKeyDown={handleKeyDown}
          onFocusInput={focusInput}
          onThemeHover={setThemeIndex}
          onThemePick={(themeId) => {
            applyTheme(themeId as Parameters<typeof applyTheme>[0]);
            setThemePickerOpen(false);
          }}
          onCommandHover={setCmdIndex}
          onCommandPick={runCmdSuggest}
        />
        {tabSuggestions && tabSuggestions.length > 0 && (
          <div
            className="tab-suggestions"
            role="listbox"
            aria-label="Tab completion suggestions"
          >
            <div className="tab-suggestions-label">
              Suggestions (Tab to complete):
            </div>
            <ul className="tab-suggestions-list">
              {tabSuggestions.map((s, i) => (
                <li key={i} className="tab-suggestions-item">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
