# Ice Web App

Next.js 15 app, run with [Bun](https://bun.sh) (package manager + runtime).

## Getting Started

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Scripts

| Command | Action |
|---------|--------|
| `bun run dev` | Dev server (Turbopack) |
| `bun run build` | Production build |
| `bun run start` | Serve the production build |
| `bun run lint` | ESLint |

All scripts run Next.js on the Bun runtime (`bun --bun next ...`).

Tool versions are pinned in `mise.toml` — run `mise install` once to get Bun.

## Deploy on Vercel

Root directory = `web`, install command = `bun install --frozen-lockfile`, build command = `bun run build` (set in `vercel.json`).
