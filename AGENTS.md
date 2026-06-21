## Agent skills

### Issue tracker

Issues live in this repo's GitHub Issues; use the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Five canonical triage roles with default label strings. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout: `CONTEXT.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.

### Ice business ledger

Google Sheets template and setup: `docs/spreadsheet-setup.md`. Workbook: `templates/ice-business-ledger.xlsx`. Paper route form: `templates/route-form-th-en.html`. Dropdown fix: `scripts/google-sheets-validation.gs`.

## Cursor Cloud specific instructions

This repo has no app server or test suite. It is a generator/templates toolkit:

- The only "application" is `scripts/build_ledger_workbook.py`, which uses `openpyxl` to (re)generate `templates/ice-business-ledger.xlsx`. Run it with `.venv/bin/python scripts/build_ledger_workbook.py`. The startup update script provisions `.venv` with `openpyxl`.
- The script overwrites `templates/ice-business-ledger.xlsx` in place. A fresh build produces byte-different output (zip/metadata ordering) even with no source change, so the tracked binary will show as modified — `git checkout -- templates/ice-business-ledger.xlsx` if you only ran it to verify and did not intend to update the template.
- `.gs` files (`scripts/google-sheets-validation.gs`) only run inside Google Sheets Apps Script; they cannot be executed locally.
- `templates/route-form-th-en.html` is a static, print-oriented A4 form — open directly in a browser; no build step.
- There is no linter or automated test configured.
