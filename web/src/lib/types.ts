export type SaleType = "cash" | "credit";
export type PaymentMethod = "cash" | "bank";
export type UserRole = "owner" | "bookkeeper" | "driver";

export type Route = { id: string; name: string; active: boolean };
export type Store = { id: string; name: string; active: boolean };
export type ExpenseCategory = {
  id: string;
  name: string;
  group_name: string;
};

export type RouteSale = {
  id: string;
  sale_date: string;
  route_id: string;
  store_id: string;
  bags: number;
  sale_type: SaleType;
  amount_thb: number;
  notes: string | null;
  routes?: { name: string } | null;
  stores?: { name: string } | null;
};

export type StorePayment = {
  id: string;
  payment_date: string;
  store_id: string;
  amount_thb: number;
  payment_method: PaymentMethod;
  notes: string | null;
  stores?: { name: string } | null;
};

export type Expense = {
  id: string;
  expense_date: string;
  category_id: string;
  amount_thb: number;
  payment_method: PaymentMethod;
  notes: string | null;
  expense_categories?: { name: string; group_name: string } | null;
};

export type StoreBalance = {
  store_id: string;
  store_name: string;
  opening_debt_thb: number;
  credit_sales_thb: number;
  payments_thb: number;
  still_owed_thb: number;
};

export type MonthlyPL = {
  month_start: string;
  route_cash_income_thb: number;
  route_credit_income_thb: number;
  total_income_thb: number;
  total_expenses_thb: number;
  net_thb: number;
};
