/**
 * One-time fix for Ice Business Ledger dropdowns in Google Sheets.
 *
 * Usage:
 * 1. Open your imported spreadsheet in Google Sheets
 * 2. Extensions → Apps Script
 * 3. Paste this file, save, Run → applyLedgerValidations
 * 4. Authorize when prompted
 *
 * Named ranges (Routes, Stores, etc.) must exist — they are created on import
 * from ice-business-ledger.xlsx. If missing, run ensureNamedRanges first.
 */
function ensureNamedRanges_(ss) {
  const settings = ss.getSheetByName('Settings');
  if (!settings) {
    throw new Error('Settings sheet not found');
  }
  const ranges = {
    Routes: settings.getRange('A2:A100'),
    Stores: settings.getRange('C2:C500'),
    ExpenseCategories: settings.getRange('E2:E100'),
    SaleTypes: settings.getRange('G2:G3'),
    PaymentMethods: settings.getRange('H2:H3'),
  };
  for (const [name, range] of Object.entries(ranges)) {
    ss.setNamedRange(name, range);
  }
}

function setDropdown_(sheet, a1Notation, rangeName) {
  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInRange(sheet.getParent().getRangeByName(rangeName), true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange(a1Notation).setDataValidation(rule);
}

function applyLedgerValidations() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ensureNamedRanges_(ss);

  setDropdown_(ss.getSheetByName('Route_Sales'), 'B2:B501', 'Routes');
  setDropdown_(ss.getSheetByName('Route_Sales'), 'C2:C501', 'Stores');
  setDropdown_(ss.getSheetByName('Route_Sales'), 'E2:E501', 'SaleTypes');

  setDropdown_(ss.getSheetByName('Store_Payments'), 'B2:B501', 'Stores');
  setDropdown_(ss.getSheetByName('Store_Payments'), 'D2:D501', 'PaymentMethods');

  setDropdown_(ss.getSheetByName('Expenses'), 'B2:B501', 'ExpenseCategories');
  setDropdown_(ss.getSheetByName('Expenses'), 'D2:D501', 'PaymentMethods');

  setDropdown_(ss.getSheetByName('Opening_Balances'), 'A8:A107', 'Stores');

  SpreadsheetApp.getUi().alert('Dropdown validation applied to all input columns.');
}
