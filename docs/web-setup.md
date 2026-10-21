# Iceman Web App Setup

Phase 1 MVP: route sales, payments, expenses, store balances, basic P&L dashboard.

**Deployments:** See [environments.md](./environments.md) for local → staging → production workflow.

## Quick links

| Goal | Doc |
|------|-----|
| Environment overview | [environments.md](./environments.md) |
| Staging Supabase | [supabase-staging-setup.md](./supabase-staging-setup.md) |
| Vercel beta URL | [vercel-staging-setup.md](./vercel-staging-setup.md) |
| Staging smoke test | [staging-smoke-test.md](./staging-smoke-test.md) |
| Production Supabase | [supabase-production-setup.md](./supabase-production-setup.md) |
| Production Vercel | [vercel-production-setup.md](./vercel-production-setup.md) |

## Prerequisites

- [Bun](https://bun.sh) 1.2+ (package manager + runtime) — installed via `mise` from `web/mise.toml`
- [Supabase](https://supabase.com) account (free tier — 2 projects for staging + prod)
- [Vercel](https://vercel.com) account (Hobby free)

## Local development (staging database)

### 1. Staging Supabase

Follow [supabase-staging-setup.md](./supabase-staging-setup.md) — migration, seed, test user, auth URLs.

### 2. Configure web app

```bash
cd web
cp .env.local.example .env.local
# Paste STAGING Project URL + anon key only
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) → sign in with staging test user.

**Do not run `bun update --latest` on Next.js** — it can upgrade Next past the pinned `15.5.19` and break React 19. Use `bun outdated` to review, `bun update <pkg>` to bump one package.

### 3. Verify locally

Login → add test sale → confirm row in staging Supabase `route_sales`.

## Staging deploy (Vercel preview)

Follow [vercel-staging-setup.md](./vercel-staging-setup.md):

1. Import `m1g88/iceman` — **root directory `web`**
2. Env vars: **Preview + Development** only → staging Supabase keys
3. Push `staging` branch → use preview URL
4. Run [staging-smoke-test.md](./staging-smoke-test.md)

## Production deploy (later)

Only after staging sign-off:

1. [supabase-production-setup.md](./supabase-production-setup.md)
2. [vercel-production-setup.md](./vercel-production-setup.md)
3. Merge `staging` → `main`

## Pages (Phase 1)

| Path | Purpose |
|------|---------|
| `/dashboard` | Monthly P&L + stores with debt |
| `/sales` | Route sales (per store, cash/credit) |
| `/payments` | Store payment entry |
| `/expenses` | Expense entry |
| `/stores` | Full store balance table |

## Rename routes & stores

Supabase **Table Editor** → `routes` / `stores` — edit names (test in staging first).

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `bun install` fails / missing deps | Run from `web/`; lockfile is `bun.lock` — don't mix with npm |
| Lockfile drift on Vercel | `bun install --frozen-lockfile` fails when `package.json` and `bun.lock` disagree — run `bun install` locally and commit `bun.lock` |
| Login works locally, fails on Vercel | Staging redirect URLs: `https://*.vercel.app/**` |
| Vercel build fails | Root directory = `web`; build command `bun run build` |
| Wrong data on preview | Preview env vars = staging Supabase, not prod |
| Missing env on Vercel | Set Preview scope for both `NEXT_PUBLIC_*` vars |

## Legacy spreadsheet

Templates in `templates/` — see [spreadsheet-setup.md](./spreadsheet-setup.md).

```bash
.venv/bin/python scripts/build_ledger_workbook.py
```
