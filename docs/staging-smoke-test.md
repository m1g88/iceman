# Staging smoke test

Run on **Vercel preview URL** (staging branch) before production launch.

## Prerequisites

- Staging Supabase configured
- Vercel preview deploy live
- Staging test user credentials

## Checklist

- [ ] Open preview URL — redirects to `/login`
- [ ] Sign in with staging test user
- [ ] **Dashboard** loads without error
- [ ] **Sales** → add row: today's date, Route_01, Store_01, 5 bags, Cash, ฿150
- [ ] **Sales** list shows new row
- [ ] Staging Supabase **Table Editor** → `route_sales` has the row
- [ ] **Sales** → add Credit sale for Store_02
- [ ] **Stores** → Store_02 shows `still_owed` > 0
- [ ] **Payments** → record payment for Store_02
- [ ] **Stores** → Store_02 balance decreased
- [ ] **Expenses** → add Fuel expense, Cash
- [ ] **Dashboard** → P&L reflects income and expenses
- [ ] Sign out works
- [ ] Phone browser: forms usable at branch (mobile test)

## Sign-off

When all pass:

1. Rename routes/stores in **staging** to real names — confirm UI still works
2. Share preview URL with family for feedback
3. Proceed to [production setup](./supabase-production-setup.md)

## If something fails

| Symptom | Check |
|---------|--------|
| Login loop | Staging Supabase redirect URLs |
| Insert fails | RLS + user profile exists in `profiles` |
| Wrong data | Vercel Preview env = staging Supabase |
