# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A terminal-themed developer portfolio: Next.js 16 App Router, React 19, TypeScript, Tailwind v4. The home page is an interactive fake shell; there is also a statically-generated MDX blog and an AI chat endpoint.

> `AGENTS.md` holds the same boundaries/conventions in condensed form and is kept in sync — read it too. The root `README.md` is **stale**: it claims Google Gemini for chat (actually OpenAI-compatible) and omits the `lib/`, `content/`, `context/`, blog, and 3D pieces. Trust the code and this file over the README.

## Commands

- Install: `npm install`
- Dev: `npm run dev`
- Lint (Next app only): `npm run lint`
- Typecheck: `npx tsc --noEmit`
- Build: `npm run build`
- Start prod: `npm run start`
- **Verify order:** `npm run lint` → `npx tsc --noEmit` → `npm run build`. For blog/content-only changes, `npx tsc --noEmit` → `npm run build` is enough.

There is **no test suite** in the main app — no test script is configured. Do not claim tests ran unless you add them. The build is the main regression net: blog routes use `generateStaticParams` / `force-static`, so `npm run build` catches most blog/content regressions.

## Architecture

**Route group shell.** The home route is `app/(shell)/page.tsx`, *not* `app/page.tsx`. The `(shell)` group wraps the home page and all blog routes with shared chrome via `components/AppShell.tsx` rendered through `app/(shell)/layout.tsx`. `context/ShellContext.tsx` carries the mobile identity-pane hide/show state for those shell pages.

**The terminal is the centerpiece.** `components/TerminalComp.tsx` is the interactive fake shell — command parsing and deep-link handling start here. Fake shell command *outputs* live in `components/TerminalComp/commands/virtualFs.ts`; change terminal command text/behavior there. `components/TerminalComp/effects.tsx` holds the 3D / matrix visuals (three, @react-three/fiber, @react-three/rapier, meshline, framer-motion). Section panes (`About`, `Experience`, `Projects`, `Skills`, `Contact`, `Blog`) are sibling components.

**Single source for profile data.** `lib/portfolio-data.ts` is the shared source for projects, skills, contact, and experience dates, consumed by both the static pages (`app/about`, `app/projects`, etc.) and the terminal panes. Experience durations are *derived* from dates via `lib/duration.ts` — **edit the dates, never the rendered month labels.** Caveat: SEO-heavy pages intentionally duplicate some profile/about text; verify the current source before "centralizing" anything into `portfolio-data.ts`.

**Blog pipeline.** Source of truth is `content/blog/*.mdx`; **slug = filename**. `lib/blog.ts` is the filesystem reader that both `app/api/blog*` and `app/(shell)/blog*` depend on. `lib/render-post.ts` renders MDX→HTML with `remark-html` and `sanitize: false` — repo MDX is **trusted content, not user input**; do not pipe user input through it. SEO helpers: `lib/blog-seo.ts`, `lib/seo-config.ts`, `lib/blog-search.ts`, plus `lib/llms.ts` + `content/llms/` feeding `app/llms.txt`.

**AI chat.** `app/api/chat/route.ts` uses the `openai` SDK (OpenAI-compatible, not Gemini) plus `@openai/agents`. It builds the system prompt by keyword-matching the user question against hardcoded `CONTEXT_PARTS` (skills/projects/experience/contact/education) to keep token usage down. Requires `LLM_API_KEY`; optional `LLM_BASE_URL` (default `https://9router.nimo.io.vn/v1`) and `LLM_MODEL` (default `cx/gpt-5.5`). 429s are mapped to a friendly rate-limit message.

## Conventions & deploy invariants

- Import from repo root with the `@/*` alias (defined in `tsconfig.json`).
- Preserve the base-URL fallback order in `app/layout.tsx`: `NEXT_PUBLIC_BASE_URL` → `VERCEL_URL` → hardcoded production URL.
- Preserve `output: "standalone"` in `next.config.ts` — the `Dockerfile` (Node 20 Alpine) copies `.next/standalone` and runs `node server.js`. Breaking standalone breaks the Docker image.

## curl/ is a separate app

`curl/` is a standalone CommonJS Express app with its own `package.json` and lockfile. Root scripts do **not** build or validate it, and `eslint.config.mjs` ignores `curl/**`.
