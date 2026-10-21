## Agent skills

### Issue tracker

Issues live in this repo's GitHub Issues; use the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Five canonical triage roles with default label strings. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout: `CONTEXT.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.

### Ice business ledger

Google Sheets template and setup: `docs/spreadsheet-setup.md`. **Web app:** `docs/web-setup.md`, `docs/environments.md`, run from `web/`. Workbook: `templates/ice-business-ledger.xlsx`. Paper route form: `templates/route-form-th-en.html`. Dropdown fix: `scripts/google-sheets-validation.gs`.

### Web app toolchain

Bun = package manager + runtime for `web/`. Tool versions pinned in `web/mise.toml`.

```bash
cd web
mise install     # once — installs Bun
bun install
bun run dev      # dev server (Turbopack)
bun run build
bun run lint
```

Lockfile is `bun.lock` — commit it, never mix npm/yarn in `web/`. Next.js pinned at `15.5.19`; don't upgrade it as a side effect of other updates.
