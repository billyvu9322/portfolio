import React from "react";
import About from "./About";
import BlogSearchResults from "./BlogSearchResults";
import Contact from "./Contact";
import Experience from "./Experience";
import Projects from "./Projects";
import Skills from "./Skills";
import { Help, Neofetch, Welcome } from "./ui";
import {
  FILE_CONTENTS,
  formatLsLong,
  getBanner,
  getCalOutput,
  getCowsay,
  getDfOutput,
  getEnvOutput,
  getFortune,
  getFreeOutput,
  getGitStatus,
  getLastOutput,
  getLsbRelease,
  getPsOutput,
  getSlTrain,
  getTreeOutput,
  getUptime,
  getWhoOutput,
  grepFile,
  HOME_DIR,
  MAN_PAGES,
  printfFormat,
  TOOL_VERSIONS,
} from "./commands/virtualFs";
import { PWD_DISPLAY } from "./constants";
import { searchBlogPosts, type BlogSearchPost } from "@/lib/blog-search";
import { THEMES, isThemeId, type ThemeId } from "@/lib/themes";

export function getSectionContent(dir: string): React.ReactNode | null {
  const sectionMap: Record<string, React.ReactNode> = {
    welcome: <Welcome />,
    about: <div className="themed-section"><About /></div>,
    projects: <div className="themed-section"><Projects /></div>,
    skills: <div className="themed-section"><Skills /></div>,
    experience: <div className="themed-section"><Experience /></div>,
    contact: <div className="themed-section"><Contact /></div>,
  };

  return sectionMap[dir] ?? null;
}

interface OutputCommandContext {
  cwd: string;
  user: string;
  host: string;
  theme: ThemeId;
  commandHistory: string[];
  setThemeIndex: (index: number) => void;
  setThemePickerOpen: (open: boolean) => void;
  applyTheme: (id: ThemeId) => void;
}

export function createOutputCommands({
  cwd,
  user,
  host,
  theme,
  commandHistory,
  setThemeIndex,
  setThemePickerOpen,
  applyTheme,
}: OutputCommandContext): Record<string, (args: string[]) => React.ReactNode> {
  const pre = (s: string) => <pre className="pre-output">{s}</pre>;
  const stderr = (s: string) => <span className="terminal-stderr">{s}</span>;
  const readOnlyFs = (cmd: string) => (a: string[]) =>
    stderr(`${cmd}: cannot operate on '${a[0] ?? ""}': Read-only file system`);
  const notPermitted = (cmd: string) => () =>
    stderr(`${cmd}: Operation not permitted — this is a portfolio, not your server. Nice try 😄`);
  const editorJoke = (cmd: string) => (a: string[]) =>
    `${cmd}: cannot open a real editor here. Use 'cat ${a[0] ?? "<file>"}' to read files instead.`;
  const pkgManager = (cmd: string) => () =>
    stderr(`E: Could not open lock file — are you root? '${cmd}' isn't available on this read-only terminal. Try 'cd skills' instead.`);

  const outputCommands: Record<string, (args: string[]) => React.ReactNode> = {
    pwd: () => (cwd === "~" ? PWD_DISPLAY : cwd),
    ls: (a) => {
      const long = a.includes("-l") || a.includes("-la");
      const list = [...HOME_DIR];
      const out = long ? formatLsLong(list) : list.join("  ");
      return <pre className="pre-output">{out}</pre>;
    },
    cat: (a) => {
      const name = a[0];
      if (!name) return "cat: missing operand";
      const key = HOME_DIR.find((e) => e.toLowerCase() === name.toLowerCase());
      if (key && FILE_CONTENTS[key]) return FILE_CONTENTS[key];
      return <span className="terminal-stderr">cat: {name}: No such file or directory</span>;
    },
    hostname: () => host,
    id: () => `uid=1000(${user}) gid=1000(${user}) groups=1000(${user})`,
    uname: (a) => (a.includes("-a") ? `Linux ${host} 6.x portfolio-terminal #1 Next.js` : "Linux"),
    cal: () => <pre className="pre-output">{getCalOutput()}</pre>,
    history: () => {
      const list = commandHistory.map((c, i) => `  ${i + 1}  ${c}`).join("\n");
      return <pre className="pre-output">{list || " (empty)"}</pre>;
    },
    printf: (a) => printfFormat(a[0] ?? "", a.slice(1)),
    man: (a) => {
      const topic = a[0]?.toLowerCase();
      const page = topic ? MAN_PAGES[topic] : null;
      if (page) return page;
      return <span className="terminal-stderr">No manual entry for {topic ?? ""}</span>;
    },
    neofetch: () => <Neofetch user={user} host={host} />,
    fortune: () => getFortune(),
    cowsay: (a) => <pre className="pre-output">{getCowsay(a.length ? a.join(" ") : "moo")}</pre>,
    banner: (a) => <pre className="pre-output">{getBanner(a.length ? a.join(" ") : " ")}</pre>,
    yes: (a) => Array(8).fill(a.length ? a.join(" ") : "y").join("\n"),
    help: () => <Help />,
    whoami: () => user,
    date: () => new Date().toString(),
    exit: () => "Close this tab to exit.",
    theme: (a) => {
      const arg = a[0]?.toLowerCase();
      if (!arg || arg === "list" || arg === "-l") {
        const cur = THEMES.findIndex((t) => t.id === theme);
        setThemeIndex(cur < 0 ? 0 : cur);
        setThemePickerOpen(true);
        return <span>Pick a theme — <strong>↑/↓</strong> then <strong>Enter</strong>, or click.</span>;
      }
      if (isThemeId(arg)) {
        applyTheme(arg);
        return <span>Theme changed to <strong>{arg}</strong>.</span>;
      }
      return stderr(`theme: unknown theme '${a[0]}'. Run 'theme' to see the list.`);
    },
    uptime: () => getUptime(),
    arch: () => "x86_64",
    free: (a) => pre(getFreeOutput(a.includes("-h"))),
    df: (a) => pre(getDfOutput(a.includes("-h"))),
    ps: (a) => pre(getPsOutput(a.includes("aux") || a.includes("-aux") || a.includes("-ef"))),
    top: () => pre(getPsOutput(true)),
    env: () => pre(getEnvOutput(user)),
    printenv: () => pre(getEnvOutput(user)),
    groups: () => `${user} sudo docker users developers`,
    who: () => getWhoOutput(user),
    w: () => getWhoOutput(user),
    users: () => user,
    last: () => pre(getLastOutput(user)),
    lsb_release: () => pre(getLsbRelease()),
    tree: () => pre(getTreeOutput(HOME_DIR)),
    head: (a) => outputCommands.cat(a),
    tail: (a) => outputCommands.cat(a),
    wc: (a) => {
      const name = a[0];
      const key = name && HOME_DIR.find((e) => e.toLowerCase() === name.toLowerCase());
      if (!key || FILE_CONTENTS[key] === undefined) {
        return stderr(`wc: ${name ?? ""}: No such file or directory`);
      }
      const text = FILE_CONTENTS[key];
      const lines = text.split("\n").length;
      const words = text.trim().split(/\s+/).length;
      const bytes = text.length;
      return ` ${lines}  ${words}  ${bytes} ${key}`;
    },
    grep: (a) => {
      if (a.length < 1) return stderr("usage: grep <pattern> [file]");
      const pattern = a[0];
      const fileArg = a[1];
      const key = fileArg ? HOME_DIR.find((e) => e.toLowerCase() === fileArg.toLowerCase()) : undefined;
      const out = grepFile(pattern, key, FILE_CONTENTS, HOME_DIR);
      return out ? pre(out) : "";
    },
    which: (a) => {
      if (a.length === 0) return stderr("usage: which <command>");
      const lines = a.map((name) => {
        const cmd = name.toLowerCase();
        return MAN_PAGES[cmd] !== undefined
          ? `/usr/bin/${cmd}`
          : `which: no ${name} in (/usr/local/bin:/usr/bin:/bin)`;
      });
      return lines.length === 1 ? lines[0] : pre(lines.join("\n"));
    },
    whatis: (a) => {
      const topic = a[0]?.toLowerCase();
      const page = topic ? MAN_PAGES[topic] : undefined;
      if (!page) return `${topic ?? ""}: nothing appropriate.`;
      const desc = page.split("—")[1]?.trim() ?? page;
      return `${topic} (1)         - ${desc}`;
    },
    node: () => TOOL_VERSIONS.node,
    npm: () => TOOL_VERSIONS.npm,
    python: () => TOOL_VERSIONS.python,
    python3: () => TOOL_VERSIONS.python,
    git: (a) => pre(getGitStatus((a[0] ?? "").toLowerCase())),
    sl: () => pre(getSlTrain()),
    sudo: () => stderr(`${user} is not in the sudoers file. This incident will be reported.`),
    touch: readOnlyFs("touch"),
    mkdir: readOnlyFs("mkdir"),
    rm: readOnlyFs("rm"),
    rmdir: readOnlyFs("rmdir"),
    mv: readOnlyFs("mv"),
    cp: readOnlyFs("cp"),
    reboot: notPermitted("reboot"),
    shutdown: notPermitted("shutdown"),
    poweroff: notPermitted("poweroff"),
    halt: notPermitted("halt"),
    vim: editorJoke("vim"),
    vi: editorJoke("vi"),
    nano: editorJoke("nano"),
    emacs: editorJoke("emacs"),
    apt: pkgManager("apt"),
    "apt-get": pkgManager("apt-get"),
    pacman: pkgManager("pacman"),
    yum: pkgManager("yum"),
  };

  return outputCommands;
}

export function renderBlogFallback(trimmedCmd: string, blogPostsCache: BlogSearchPost[]) {
  const blogMatches = searchBlogPosts(blogPostsCache, trimmedCmd);
  if (blogMatches.length === 0) return null;

  return (
    <div>
      <p className="text-gray-400 font-mono text-sm mb-2">
        No command &quot;{trimmedCmd.split(/\s+/)[0]}&quot; — blog posts matching &quot;
        {trimmedCmd}&quot;:
      </p>
      <BlogSearchResults posts={blogMatches} query={trimmedCmd} />
      <p className="text-gray-500 font-mono text-xs mt-2">
        Tip: use <span className="text-green-400">blog {trimmedCmd}</span> next time
      </p>
    </div>
  );
}
