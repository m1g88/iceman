# Vercel production setup

**Only after [staging sign-off](./staging-smoke-test.md) and [Supabase prod](./supabase-production-setup.md).**

## 1. Production environment variables

Vercel → **Settings** → **Environment Variables**

Add (or update) for **Production** scope only:

| Name | Value |
|------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | `iceman-prod` project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `iceman-prod` anon key |

Preview/Development scopes keep **staging** keys.

## 2. Production branch

Default: **Production** deploys from `main`.

```bash
git checkout main
git merge staging
git push origin main
```

Vercel auto-deploys production.

## 3. Update Supabase prod auth URLs

After first production deploy, copy exact URL from Vercel.

**iceman-prod** → **Authentication** → **URL configuration**:

- Site URL: `https://your-app.vercel.app`
- Redirect URLs: `https://your-app.vercel.app/**`

## 4. Verify production

- Sign in with **production** user (not staging test user)
- Confirm `route_sales` writes go to **iceman-prod** Table Editor
- Confirm staging project has no new production transactions

## Ongoing workflow

1. Develop locally (staging Supabase)
2. Push to `staging` → test preview URL
3. Merge `staging` → `main` → production deploy
