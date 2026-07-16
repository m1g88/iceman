export const L = {
  appName: { en: "Iceman Ledger", th: "บัญชีไอซ์แมน" },
  dashboard: { en: "Dashboard", th: "แดชบอร์ด" },
  sales: { en: "Route sales", th: "ขายตามเส้นทาง" },
  payments: { en: "Store payments", th: "รับชำระร้าน" },
  expenses: { en: "Expenses", th: "ค่าใช้จ่าย" },
  stores: { en: "Store balances", th: "ยอดค้างร้าน" },
  login: { en: "Sign in", th: "เข้าสู่ระบบ" },
  logout: { en: "Sign out", th: "ออกจากระบบ" },
  cash: { en: "Cash", th: "เงินสด" },
  credit: { en: "Credit", th: "ค้างจ่าย" },
  bank: { en: "Bank", th: "โอน/บัญชี" },
  save: { en: "Save", th: "บันทึก" },
  stillOwed: { en: "Still owed", th: "คงค้าง" },
  income: { en: "Income", th: "รายได้" },
  net: { en: "Net", th: "กำไรสุทธิ" },
} as const;

export function t(
  key: keyof typeof L,
  locale: "en" | "th" = "en",
): string {
  return L[key][locale];
}
