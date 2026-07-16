"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { PaymentMethod, SaleType } from "@/lib/types";

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  return { supabase, user };
}

export async function createRouteSale(formData: FormData) {
  const { supabase, user } = await requireUser();

  const { error } = await supabase.from("route_sales").insert({
    sale_date: String(formData.get("sale_date")),
    route_id: String(formData.get("route_id")),
    store_id: String(formData.get("store_id")),
    bags: Number(formData.get("bags")),
    sale_type: String(formData.get("sale_type")) as SaleType,
    amount_thb: Number(formData.get("amount_thb")),
    notes: (formData.get("notes") as string) || null,
    created_by: user.id,
  });

  if (error) return { error: error.message };
  revalidatePath("/sales");
  revalidatePath("/dashboard");
  revalidatePath("/stores");
  return { ok: true };
}

export async function createStorePayment(formData: FormData) {
  const { supabase, user } = await requireUser();

  const { error } = await supabase.from("store_payments").insert({
    payment_date: String(formData.get("payment_date")),
    store_id: String(formData.get("store_id")),
    amount_thb: Number(formData.get("amount_thb")),
    payment_method: String(formData.get("payment_method")) as PaymentMethod,
    notes: (formData.get("notes") as string) || null,
    created_by: user.id,
  });

  if (error) return { error: error.message };
  revalidatePath("/payments");
  revalidatePath("/dashboard");
  revalidatePath("/stores");
  return { ok: true };
}

export async function createExpense(formData: FormData) {
  const { supabase, user } = await requireUser();

  const { error } = await supabase.from("expenses").insert({
    expense_date: String(formData.get("expense_date")),
    category_id: String(formData.get("category_id")),
    amount_thb: Number(formData.get("amount_thb")),
    payment_method: String(formData.get("payment_method")) as PaymentMethod,
    notes: (formData.get("notes") as string) || null,
    created_by: user.id,
  });

  if (error) return { error: error.message };
  revalidatePath("/expenses");
  revalidatePath("/dashboard");
  return { ok: true };
}
