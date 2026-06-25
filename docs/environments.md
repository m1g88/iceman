# Iceman environments — Local → Staging → Production

Three tiers. **Never mix Supabase keys** between staging and production.

## Matrix

| Tier | App URL | Supabase project | Git branch | Vercel env scope | Data |
|------|---------|------------------|------------|------------------|------|
| **Local** | `http://localhost:3000` | `iceman-staging` | any | N/A (`.env.local`) | Test |
| **Staging** | `https://iceman-*-*.vercel.app` (preview) | `iceman-staging` | `staging` | Preview + Development | Test |
| **Production** | `https://iceman.vercel.app` (or custom) | `iceman-prod` | `main` | Production only | Real business |

Cost: **$0** on Supabase free tier (2 projects) + Vercel Hobby.

## Supabase projects

### Staging (`iceman-staging`)

Use your **existing** local project as staging, or create a new one named `iceman-staging`.

Setup: [supabase-staging-setup.md](./supabase-staging-setup.md)

Auth redirect URLs (staging project only):

```
http://localhost:3000/**
https://*.vercel.app/**
```

Site URL: `http://localhost:3000`

### Production (`iceman-prod`)

Create **only after** staging sign-off. Separate project — do not copy test transactions.

Setup: [supabase-production-setup.md](./supabase-production-setup.md)

Auth redirect URLs (production project only):

```
https://YOUR-PRODUCTION-DOMAIN.vercel.app/**
```

No `localhost` or wildcards on production.

## Vercel environment variables

Project settings → **Environment Variables**:

| Variable | Preview | Production | Development |
|----------|---------|------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Staging URL | Prod URL | Staging URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Staging anon | Prod anon | Staging anon |

**Until production launch:** set Preview + Development only. Leave Production empty or unset.

Never commit real keys. Use `.env.local` locally (gitignored).

## Local development

```bash
cd web
cp .env.local.example .env.local
# Paste STAGING keys only
npm install
npm run dev
```

## Promotion workflow

```text
Local dev (staging DB)
    → push to staging branch
    → Vercel Preview URL (beta)
    → family sign-off
    → merge staging → main
    → Vercel Production (prod DB)
```

## Checklists

- Staging Supabase: [supabase-staging-setup.md](./supabase-staging-setup.md)
- Vercel staging: [vercel-staging-setup.md](./vercel-staging-setup.md)
- Smoke test: [staging-smoke-test.md](./staging-smoke-test.md)
- Production: [supabase-production-setup.md](./supabase-production-setup.md) + [vercel-production-setup.md](./vercel-production-setup.md)
