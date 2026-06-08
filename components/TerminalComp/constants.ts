import type { HelpItem } from "./types";

export const HOME_CD_SECTIONS = [
  "about",
  "projects",
  "skills",
  "experience",
  "contact",
  "welcome",
] as const;

export const AI_RATE_LIMIT = {
  maxRequests: 10,
  maxOutputTokens: 1000,
  timeWindow: 24 * 60 * 60 * 1000,
};

export const HELP_ITEMS: HelpItem[] = [
  { type: "title", text: "Available commands:" },
  { type: "command", command: "help", description: "Display this help message." },
  { type: "command", command: "ls [-l|-a|-la]", description: "List directory contents." },
  { type: "command", command: "pwd", description: "Print working directory." },
  { type: "command", command: "cd [dir]", description: "Change directory. cd with no args goes home." },
  { type: "command", command: "cd welcome", description: "Display the welcome message." },
  { type: "command", command: "cd about", description: "Learn more about me." },
  { type: "command", command: "cd projects", description: "View my recent projects." },
  { type: "command", command: "cd skills", description: "See my technical skills." },
  { type: "command", command: "cd experience", description: "View my professional experience." },
  { type: "command", command: "cd contact", description: "Get my contact information." },
  { type: "command", command: "cd blog", description: "Open the blog (/blog)." },
  { type: "command", command: "blog [keyword]", description: "Open blog or search posts (e.g. blog Malware)." },
  { type: "command", command: "cat <file>", description: "Print file contents (e.g. cat README, cat blog)." },
  { type: "command", command: "whoami", description: "Print current user." },
  { type: "command", command: "hostname", description: "Print system hostname." },
  { type: "command", command: "id", description: "Print user and group IDs." },
  { type: "command", command: "uname [-a]", description: "Print system info." },
  { type: "command", command: "date", description: "Print current date and time." },
  { type: "command", command: "cal", description: "Display current month calendar." },
  { type: "command", command: "echo <text>", description: "Print the given text." },
  { type: "command", command: "printf <format> [args]", description: "Print formatted string (%s, %d, \\n)." },
  { type: "command", command: "history", description: "List recent commands." },
  { type: "command", command: "man <cmd>", description: "Show manual for command." },
  { type: "command", command: "neofetch", description: "Display system info and ASCII logo." },
  { type: "command", command: "fortune", description: "Print a random quote." },
  { type: "command", command: "cowsay [msg]", description: "Cow says your message." },
  { type: "command", command: "banner <text>", description: "Print text in large ASCII." },
  { type: "command", command: "yes [string]", description: "Repeat string (limited)." },
  { type: "command", command: "ai <question>", description: "Chat with AI." },
  { type: "command", command: "theme [name]", description: "List color themes or switch (e.g. theme amp-dark)." },
  { type: "command", command: "clear", description: "Clear the terminal screen." },
  { type: "command", command: "exit", description: "Close this tab/window." },
  { type: "title", text: "System & files:" },
  { type: "command", command: "uptime", description: "Show how long the system has been up." },
  { type: "command", command: "free [-h]", description: "Show memory usage." },
  { type: "command", command: "df [-h]", description: "Show disk space usage." },
  { type: "command", command: "ps [aux]", description: "Snapshot of running processes." },
  { type: "command", command: "top", description: "Running processes (snapshot)." },
  { type: "command", command: "env", description: "Print environment variables." },
  { type: "command", command: "groups", description: "Print the current user's groups." },
  { type: "command", command: "who / w / users", description: "Show who is logged on." },
  { type: "command", command: "last", description: "Show recent login history." },
  { type: "command", command: "arch", description: "Print machine architecture." },
  { type: "command", command: "lsb_release [-a]", description: "Print distribution info." },
  { type: "command", command: "tree", description: "List files as a tree." },
  { type: "command", command: "head/tail <file>", description: "Print a file's contents." },
  { type: "command", command: "wc <file>", description: "Count lines, words, bytes." },
  { type: "command", command: "grep <pat> [file]", description: "Print lines matching a pattern." },
  { type: "command", command: "which <cmd>", description: "Locate a command." },
  { type: "command", command: "whatis <cmd>", description: "One-line command description." },
  { type: "command", command: "git [status|log]", description: "Show repository status." },
  { type: "command", command: "node/npm/python", description: "Print tool versions." },
  { type: "command", command: "sl", description: "Steam locomotive (for ls typos)." },
];

export const WELCOME_LINES: string[] = [
  "Hi, I'm Binh Vu, a Software Developer.",
  "Welcome to my interactive portfolio terminal!",
  "Type 'help' or 'ls' for commands. Use 'cd <name>' to open sections (e.g. cd about, cd blog, cd projects).",
  "✨ NEW: Try 'ai <your question>' to chat with AI assistant!",
];

export const TAB_COMPLETIONS: string[] = [
  "cd welcome", "cd about", "cd projects", "cd skills", "cd experience", "cd contact", "cd blog", "blog", "cat blog",
  "help", "ls", "ls -l", "ls -la", "pwd", "cat", "whoami", "hostname", "id", "uname", "uname -a", "date", "cal",
  "echo", "printf", "history", "man", "neofetch", "fortune", "cowsay", "banner", "yes", "clear", "theme", "blog",
  "exit", "uptime", "free", "free -h", "df", "df -h", "ps", "ps aux", "top", "env", "groups", "who", "last",
  "arch", "lsb_release -a", "tree", "git status", "git log", "which", "whatis", "sl",
];

export const COMMAND_NAMES = [
  "help", "ls", "ls -l", "ls -la", "ls -a", "pwd", "cd", "cat", "whoami", "hostname", "id", "uname", "date", "cal",
  "echo", "printf", "history", "man", "clear", "blog", "exit", "ai", "theme", "neofetch", "fortune", "cowsay", "banner",
  "yes", "uptime", "free", "df", "ps", "top", "env", "printenv", "groups", "who", "w", "users", "last", "arch",
  "lsb_release", "tree", "head", "tail", "wc", "grep", "which", "whatis", "node", "npm", "python", "python3", "git",
  "sl", "sudo", "touch", "mkdir", "rm", "rmdir", "mv", "cp", "reboot", "shutdown", "poweroff", "halt", "vim", "vi",
  "nano", "emacs", "apt", "apt-get", "pacman", "yum",
];

export const CD_SECTIONS = ["welcome", "about", "blog", "projects", "skills", "experience", "contact"];
export const MAX_COMMAND_HISTORY = 50;
export const PWD_DISPLAY = "/home/anup";

export const DESC_BY_CMD: Record<string, string> = {};
for (const it of HELP_ITEMS) {
  if (it.type === "command" && it.command) {
    const key = it.command.split(/[\s[<]/)[0];
    if (!(key in DESC_BY_CMD)) DESC_BY_CMD[key] = it.description ?? "";
  }
}
