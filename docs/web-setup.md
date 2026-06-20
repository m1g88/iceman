# Iceman Web App Setup

Phase 1 MVP: route sales, payments, expenses, store balances, basic P&L dashboard.

## Prerequisites

- Node.js 20+
- [Supabase](https://supabase.com) account (free tier)
- Optional: [Supabase CLI](https://supabase.com/docs/guides/cli) for local DB

## 1. Create Supabase project

1. [supabase.com/dashboard](https://supabase.com/dashboard) → New project
2. **Settings → API** → copy **Project URL** and **anon public** key

## 2. Run database migration

**Option A — Supabase Dashboard**

1. **SQL Editor** → New query
2. Paste contents of [`supabase/migrations/20250618000001_initial.sql`](../supabase/migrations/20250618000001_initial.sql) → Run
3. Paste [`supabase/seed.sql`](../supabase/seed.sql) → Run

**Option B — Supabase CLI**

```bash
cd /Users/mig/Projects/iceman
npx supabase link --project-ref YOUR_PROJECT_REF
npx supabase db push
psql "$DATABASE_URL" -f supabase/seed.sql   # or run seed in SQL Editor
```

## 3. Create a user

1. Supabase **Authentication → Users** → Add user (email + password)
2. After signup, profile row is auto-created with role `bookkeeper`
3. Promote to owner (SQL Editor):

```sql
UPDATE profiles SET role = 'owner' WHERE id = 'USER_UUID_HERE';
```

## 4. Configure web app

```bash
cd web
cp .env.local.example .env.local
# Edit .env.local with your Supabase URL and anon key
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) → sign in.

## 5. Deploy (Vercel)

1. Vercel → Import `m1g88/iceman`
2. **Root directory:** `web`
3. Environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Supabase **Authentication → URL configuration** → add your Vercel URL to redirect allow list

## Pages (Phase 1)

| Path | Purpose |
|------|---------|
| `/dashboard` | Monthly P&L + stores with debt |
| `/sales` | Route sales (per store, cash/credit) |
| `/payments` | Store payment entry |
| `/expenses` | Expense entry |
| `/stores` | Full store balance table |

## Rename routes & stores

Supabase **Table Editor** → `routes` / `stores` — edit names to match your business (replaces Settings tab in spreadsheet).

## Cutover from spreadsheet

1. Enter `store_opening_debts` and `organization` opening cash/bank in Supabase
2. Stop editing Google Sheet
3. Enter new transactions only in web app

## Regenerate spreadsheet (legacy)

The old xlsx template remains in `templates/` for reference only.

```bash
.venv/bin/python scripts/build_ledger_workbook.py
```
