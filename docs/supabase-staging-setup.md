# Supabase staging setup

Target: one **staging** project for local dev + Vercel preview. Test data only.

## Option A — Reuse existing project (recommended if already set up)

If you already ran migration, seed, and created a login user for local dev, **that project is your staging project**. Skip to [Auth URLs](#auth-urls).

## Option B — Fresh staging project

1. [supabase.com/dashboard](https://supabase.com/dashboard) → **New project**
2. Name: `iceman-staging`
3. Save database password somewhere safe
4. Wait for project to finish provisioning

### Run migration

**SQL Editor** → New query → paste and run:

1. Full file: [`supabase/migrations/20250618000001_initial.sql`](../supabase/migrations/20250618000001_initial.sql)
2. Full file: [`supabase/seed.sql`](../supabase/seed.sql)

### Create test user

1. **Authentication** → **Users** → **Add user** → **Create new user**
2. Email: e.g. `test@iceman.local`
3. Password: your choice
4. **Auto Confirm User:** ON

### Promote to owner

**SQL Editor:**

```sql
UPDATE profiles SET role = 'owner'
WHERE id = 'PASTE-USER-UUID-FROM-AUTH-USERS';
```

## Auth URLs

**Authentication** → **URL configuration**

| Field | Value |
|-------|--------|
| Site URL | `http://localhost:3000` |
| Redirect URLs | see below |

Add each redirect URL (one per line in Supabase UI):

```
http://localhost:3000/**
https://*.vercel.app/**
```

The `*.vercel.app` wildcard covers all Vercel preview deploy URLs.

## Copy API keys for local + Vercel

**Settings** → **API**

- **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Use these for:

- `web/.env.local` (local dev)
- Vercel **Preview** + **Development** env vars (not Production)

## Verify

**Table Editor** should show: `routes`, `stores`, `route_sales`, `profiles`, etc.

`routes` should have 6 seed rows; `stores` should have 10.
