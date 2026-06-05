# Repo Notes

- Real app root: `portfolio.sh/`. Parent `E:\AI\porfolio` is wrapper dir, not app.
- Main runtime: Next.js 16 App Router app. Home route lives in `app/(shell)/page.tsx`, not `app/page.tsx`.
- Shared chrome for home + blog lives in `components/AppShell.tsx` through `app/(shell)/layout.tsx`.

# Commands

- Install: `npm install`
- Dev: `npm run dev`
- Lint: `npm run lint`
- Typecheck: `npx tsc --noEmit`
- Build: `npm run build`
- Start prod app: `npm run start`
- Normal verify order: `npm run lint` -> `npx tsc --noEmit` -> `npm run build`
- Smallest useful check for blog/content changes: `npx tsc --noEmit` -> `npm run build`

# Boundaries

- `app/`: App Router routes, metadata, SEO files, API handlers.
- `app/(shell)/`: user-facing shell pages. Blog routes live here too.
- `components/TerminalComp.tsx`: main interactive terminal. Command behavior and deep-link handling start here.
- `components/TerminalComp/commands/virtualFs.ts`: fake shell command outputs. Change this when terminal command text/behavior changes.
- `context/ShellContext.tsx`: mobile identity-pane hide/show state used by shell pages.
- `lib/portfolio-data.ts`: shared source for projects, skills, contact, and experience dates used by both static pages and terminal panes.
- `content/blog/*.mdx`: blog source of truth. Slug = filename.
- `lib/blog.ts`: filesystem reader for blog posts. `app/api/blog*` and `app/(shell)/blog*` both depend on it.
- `curl/`: separate CommonJS Express app with own `package.json` and lockfile. Root scripts do not validate it.

# Conventions

- Use `@/*` imports from repo root. `tsconfig.json` defines alias.
- Preserve `app/layout.tsx` base URL fallback order: `NEXT_PUBLIC_BASE_URL` -> `VERCEL_URL` -> hardcoded production URL.
- Preserve `next.config.ts` `output: "standalone"`. `Dockerfile` copies `.next/standalone` and runs `server.js` from it.
- Blog HTML render in `lib/render-post.ts` uses `remark-html` with `sanitize: false`. Treat repo MDX as trusted content, not user input.
- Static content can be duplicated by design for SEO-heavy pages. Do not assume every profile/about text belongs in `lib/portfolio-data.ts`; verify current source before centralizing.
- Experience durations are derived from dates in `lib/portfolio-data.ts` via `lib/duration.ts`. Update dates, not rendered month labels.

# Testing Reality

- Main app has no test script and no test suite configured. Do not claim tests ran unless you added/configured them.
- Root `npm run lint` covers Next app only. It ignores `curl/**` in `eslint.config.mjs`.
- Blog routes and blog API are statically generated (`generateStaticParams` / `dynamic = "force-static"`). Build catches many blog regressions.

# Env / Deploy

- `app/api/chat/route.ts` requires `LLM_API_KEY`.
- Optional base URL override: `LLM_BASE_URL`. Current default: `https://9router.nimo.io.vn/v1`.
- Optional model override: `LLM_MODEL`. Current default: `cx/gpt-5.5`.
- Docker build uses Node 20 Alpine, runs `npm run build`, then serves Next standalone output with `node server.js`.
