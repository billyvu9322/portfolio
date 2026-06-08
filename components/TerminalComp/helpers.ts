import type { BlogSearchPost } from "@/lib/blog-search";
import { THEME_IDS } from "@/lib/themes";
import { HOME_DIR } from "./commands/virtualFs";
import {
  AI_RATE_LIMIT,
  CD_SECTIONS,
  COMMAND_NAMES,
  DESC_BY_CMD,
  TAB_COMPLETIONS,
} from "./constants";
import type { CmdSuggestion } from "./types";

const getAIUsage = (): { count: number; timestamp: number } => {
  if (typeof window === "undefined") return { count: 0, timestamp: Date.now() };

  const stored = localStorage.getItem("ai_usage");
  if (!stored) return { count: 0, timestamp: Date.now() };

  return JSON.parse(stored);
};

export const incrementAIUsage = (): boolean => {
  const usage = getAIUsage();
  const now = Date.now();

  if (now - usage.timestamp > AI_RATE_LIMIT.timeWindow) {
    localStorage.setItem(
      "ai_usage",
      JSON.stringify({ count: 1, timestamp: now }),
    );
    return true;
  }

  if (usage.count >= AI_RATE_LIMIT.maxRequests) {
    return false;
  }

  localStorage.setItem(
    "ai_usage",
    JSON.stringify({ count: usage.count + 1, timestamp: usage.timestamp }),
  );
  return true;
};

export const getRemainingRequests = (): number => {
  const usage = getAIUsage();
  const now = Date.now();

  if (now - usage.timestamp > AI_RATE_LIMIT.timeWindow) {
    return AI_RATE_LIMIT.maxRequests;
  }

  return Math.max(0, AI_RATE_LIMIT.maxRequests - usage.count);
};

export function getCommandSuggestions(input: string): CmdSuggestion[] {
  const raw = input.trimStart();
  if (!raw || /\s/.test(raw)) return [];
  const prefix = raw.replace(/^\/+/, "").toLowerCase();
  const list = prefix
    ? COMMAND_NAMES.filter((c) => c.toLowerCase().startsWith(prefix))
    : COMMAND_NAMES;
  return list.map((c) => ({
    name: c,
    desc: DESC_BY_CMD[c.split(" ")[0]] ?? "",
  }));
}

function getCommonPrefix(strings: string[]): string {
  if (strings.length === 0) return "";
  let i = 0;
  while (i < strings[0].length) {
    const c = strings[0][i];
    if (strings.every((s) => s[i] === c)) i++;
    else break;
  }
  return strings[0].slice(0, i);
}

export function getTabCompletion(
  input: string,
  blogPosts: BlogSearchPost[] = [],
): { matches: string[]; setLine: string; isPartial: boolean } {
  const raw = input.trimEnd();
  const endsWithSpace = /\s$/.test(input);
  const parts = raw.split(/\s+/).filter(Boolean);
  const command = parts[0]?.toLowerCase() ?? "";
  const isCompletingArg = endsWithSpace || parts.length > 1;
  const prefix =
    isCompletingArg && parts.length > 0
      ? endsWithSpace
        ? ""
        : (parts[parts.length - 1] ?? "")
      : raw;
  const argPrefix = prefix.toLowerCase();
  const baseForArg = endsWithSpace
    ? raw + " "
    : parts.slice(0, -1).join(" ") + (parts.length > 1 ? " " : "");

  if (isCompletingArg && command === "blog" && blogPosts.length > 0) {
    const matches = blogPosts
      .filter(
        (p) =>
          p.slug.toLowerCase().startsWith(argPrefix) ||
          p.title.toLowerCase().includes(argPrefix),
      )
      .map((p) => p.slug);
    if (matches.length === 0)
      return { matches: [], setLine: input, isPartial: false };
    const common = getCommonPrefix(matches);
    const setLine =
      matches.length === 1 ? baseForArg + matches[0] : baseForArg + common;
    return {
      matches,
      setLine,
      isPartial: matches.length > 1 && common.length === prefix.length,
    };
  }

  if (
    isCompletingArg &&
    (command === "cd" ||
      command === "cat" ||
      command === "man" ||
      command === "theme")
  ) {
    const list =
      command === "cd"
        ? CD_SECTIONS
        : command === "cat"
          ? [...HOME_DIR]
          : command === "theme"
            ? [...THEME_IDS]
            : COMMAND_NAMES;
    const matches = list.filter((s) =>
      String(s).toLowerCase().startsWith(argPrefix),
    );
    if (matches.length === 0)
      return { matches: [], setLine: input, isPartial: false };
    const common = getCommonPrefix(matches);
    const setLine =
      matches.length === 1 ? baseForArg + matches[0] : baseForArg + common;
    return {
      matches,
      setLine,
      isPartial: matches.length > 1 && common.length === prefix.length,
    };
  }

  if (parts.length === 1 && !endsWithSpace) {
    const matches = COMMAND_NAMES.filter((c) => c.startsWith(argPrefix));
    if (matches.length === 0)
      return { matches: [], setLine: input, isPartial: false };
    const common = getCommonPrefix(matches);
    return {
      matches,
      setLine: matches.length === 1 ? matches[0] : common,
      isPartial: matches.length > 1 && common.length === prefix.length,
    };
  }

  const matches = TAB_COMPLETIONS.filter((c) => c.startsWith(raw));
  if (matches.length === 0)
    return { matches: [], setLine: input, isPartial: false };
  const common = getCommonPrefix(matches);
  return {
    matches,
    setLine:
      matches.length === 1
        ? matches[0]
        : common.length > raw.length
          ? common
          : raw,
    isPartial: matches.length > 1 && common.length === raw.length,
  };
}
