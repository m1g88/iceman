import { createClient } from "@/lib/supabase/server";
import type {
  Expense,
  ExpenseCategory,
  MonthlyPL,
  Route,
  RouteSale,
  Store,
  StoreBalance,
  StorePayment,
} from "@/lib/types";

export async function getRoutes(): Promise<Route[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("routes")
    .select("id, name, active")
    .eq("active", true)
    .order("name");
  return data ?? [];
}

export async function getStores(): Promise<Store[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("stores")
    .select("id, name, active")
    .eq("active", true)
    .order("name");
  return data ?? [];
}

export async function getExpenseCategories(): Promise<ExpenseCategory[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("expense_categories")
    .select("id, name, group_name")
    .order("group_name")
    .order("name");
  return data ?? [];
}

export async function getRecentSales(limit = 50): Promise<RouteSale[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("route_sales")
    .select("*, routes(name), stores(name)")
    .order("sale_date", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(limit);
  return (data as RouteSale[]) ?? [];
}

export async function getRecentPayments(limit = 50): Promise<StorePayment[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("store_payments")
    .select("*, stores(name)")
    .order("payment_date", { ascending: false })
    .limit(limit);
  return (data as StorePayment[]) ?? [];
}

export async function getRecentExpenses(limit = 50): Promise<Expense[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("expenses")
    .select("*, expense_categories(name, group_name)")
    .order("expense_date", { ascending: false })
    .limit(limit);
  return (data as Expense[]) ?? [];
}

export async function getStoreBalances(): Promise<StoreBalance[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("store_balances")
    .select("*")
    .order("still_owed_thb", { ascending: false });
  return (data as StoreBalance[]) ?? [];
}

export async function getMonthlyPL(limit = 12): Promise<MonthlyPL[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("monthly_pl")
    .select("*")
    .order("month_start", { ascending: false })
    .limit(limit);
  return (data as MonthlyPL[]) ?? [];
}
