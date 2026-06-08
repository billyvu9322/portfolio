import type { BlogInitialPost } from "@/components/BlogTerminalPage.types";

export interface PromptProps {
  user: string;
  host: string;
}

export interface OutputLineProps {
  children: React.ReactNode;
}

export interface HistoryLine {
  type: "prompt" | "output";
  command?: string;
  content?: React.ReactNode | string;
}

export interface HelpItem {
  type: "title" | "command";
  text?: string;
  command?: string;
  description?: string;
}

export interface TerminalProps {
  onFirstCommand?: () => void;
  blogRoute?: boolean;
  initialBlogSlug?: string | null;
  initialBlogPost?: BlogInitialPost | null;
  initialSection?: string | null;
  initialCommand?: string | null;
}

export interface CmdSuggestion {
  name: string;
  desc: string;
}
