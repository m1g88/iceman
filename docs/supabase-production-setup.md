# Supabase production setup

**Only run after [staging smoke test](./staging-smoke-test.md) passes.**

Production uses a **separate** Supabase project. Never reuse staging test data.

## 1. Create project

1. Supabase dashboard → **New project**
2. Name: `iceman-prod`
3. Region: closest to Thailand (e.g. Singapore)
4. Strong database password — store securely

## 2. Run migration + seed

SQL Editor → run in order:

1. [`supabase/migrations/20250618000001_initial.sql`](../supabase/migrations/20250618000001_initial.sql)
2. [`supabase/seed.sql`](../supabase/seed.sql) — gives category list; rename routes/stores next

## 3. Real configuration

**Table Editor:**

- `routes` — replace `Route_01`… with real route names
- `stores` — replace `Store_01`… with real store names
- `organization` — set `opening_cash_thb`, `opening_bank_thb`, `go_live_date`
- `store_opening_debts` — one row per store that already owed you on go-live

**Do not** import rows from `route_sales` / staging.

## 4. Production users

**Authentication** → **Users** → create real owner/bookkeeper accounts.

```sql
UPDATE profiles SET role = 'owner' WHERE id = 'OWNER_USER_UUID';
```

## 5. Auth URLs (strict)

Replace `YOUR-PROD-URL` with actual Vercel production URL after first deploy.

| Field | Value |
|-------|--------|
| Site URL | `https://YOUR-PROD-URL.vercel.app` |
| Redirect URLs | `https://YOUR-PROD-URL.vercel.app/**` |

Do **not** add `localhost` or `*.vercel.app` on the production project.

## 6. Keys for Vercel Production only

**Settings** → **API** → copy URL + anon key into Vercel **Production** env scope only.

Staging keys stay on Preview/Development scopes.
