# Vercel staging setup (beta URL)

Deploy preview builds from the `staging` branch. Uses **staging** Supabase keys only.

## Prerequisites

- [Supabase staging](./supabase-staging-setup.md) complete
- GitHub repo: [m1g88/iceman](https://github.com/m1g88/iceman)
- `staging` branch pushed to GitHub

## 1. Import project

1. [vercel.com/new](https://vercel.com/new)
2. Import **m1g88/iceman**
3. **Root Directory:** `web` (required — app is not repo root)
4. Framework: Next.js (auto-detected)

## 2. Environment variables

**Settings** → **Environment Variables**

Add both variables. Enable **Preview** and **Development** only — **not Production** yet.

| Name | Value |
|------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Staging Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Staging anon public key |

## 3. Git branch

Default: Vercel deploys **Production** from `main`, **Preview** from all branches.

Optional: **Settings** → **Git** → set preview branch preference to `staging` for a stable beta URL pattern.

Push to staging:

```bash
git checkout staging
git push -u origin staging
```

## 4. Find beta URL

After deploy: Vercel dashboard → **Deployments** → latest **Preview** on `staging` branch.

URL pattern: `iceman-git-staging-<user>.vercel.app`

## 5. Confirm Supabase auth

Staging Supabase must include `https://*.vercel.app/**` in redirect URLs. See [supabase-staging-setup.md](./supabase-staging-setup.md).

## 6. Smoke test

Follow [staging-smoke-test.md](./staging-smoke-test.md).

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Build fails | Root directory = `web`; check build logs |
| Login redirect error | Staging Supabase redirect URLs |
| Empty data / wrong DB | Preview env vars point at staging project |
| Production shows errors | Production env empty until prod launch — expected |
