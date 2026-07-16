## Agent skills

### Issue tracker

Issues live in this repo's GitHub Issues; use the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Five canonical triage roles with default label strings. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout: `CONTEXT.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.

### Ice business ledger

Google Sheets template and setup: `docs/spreadsheet-setup.md`. **Web app:** `docs/web-setup.md`, `docs/environments.md`, run from `web/`. Workbook: `templates/ice-business-ledger.xlsx`. Paper route form: `templates/route-form-th-en.html`. Dropdown fix: `scripts/google-sheets-validation.gs`.

## Cursor Cloud specific instructions

This repo has two independent parts: a Next.js web app and a Python generator/templates toolkit.

### Web app (`web/`)

Next.js 15 + React 19 + Supabase (see `docs/web-setup.md` and `docs/environments.md`). Lint/build/dev via the `web/package.json` scripts (`npm run lint`, `npm run build`, `npm run dev` from `web/`); requires a Supabase project and `web/.env.local` (copy `web/.env.local.example`). Do not run `npm audit fix --force` — it can downgrade Next.js and break React 19. The startup update script does not yet install the web app's npm dependencies (`cd web && npm install`).

### Ledger generator / templates (Python)

- The generator is `scripts/build_ledger_workbook.py`, which uses `openpyxl` to (re)generate `templates/ice-business-ledger.xlsx`. Run it with `.venv/bin/python scripts/build_ledger_workbook.py`. The startup update script provisions `.venv` with `openpyxl`.
- The script overwrites `templates/ice-business-ledger.xlsx` in place. A fresh build produces byte-different output (zip/metadata ordering) even with no source change, so the tracked binary will show as modified — `git checkout -- templates/ice-business-ledger.xlsx` if you only ran it to verify and did not intend to update the template.
- `.gs` files (`scripts/google-sheets-validation.gs`) only run inside Google Sheets Apps Script; they cannot be executed locally.
- `templates/route-form-th-en.html` is a static, print-oriented A4 form — open directly in a browser; no build step.
- The Python toolkit itself has no linter or automated tests.
