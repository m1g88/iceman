"use client";

import { useActionState } from "react";
import { createExpense } from "@/app/actions";
import {
  Card,
  Field,
  SelectInput,
  SubmitButton,
  TextArea,
  TextInput,
} from "@/components/ui";
import { todayIso } from "@/lib/format";
import { L } from "@/lib/labels";
import type { ExpenseCategory } from "@/lib/types";

export function ExpenseForm({
  categories,
}: {
  categories: ExpenseCategory[];
}) {
  const [state, action, pending] = useActionState(
    async (_: unknown, formData: FormData) => createExpense(formData),
    null,
  );

  return (
    <Card title="Add expense / เพิ่มค่าใช้จ่าย">
      <form action={action} className="grid gap-4 sm:grid-cols-2">
        <Field label="Date" labelTh="วันที่">
          <TextInput
            type="date"
            name="expense_date"
            defaultValue={todayIso()}
            required
          />
        </Field>
        <Field label="Category" labelTh="หมวด">
          <SelectInput name="category_id" required>
            <option value="">—</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.group_name})
              </option>
            ))}
          </SelectInput>
        </Field>
        <Field label="Amount (฿)" labelTh="จำนวนเงิน">
          <TextInput
            type="number"
            name="amount_thb"
            min={0.01}
            step="0.01"
            required
          />
        </Field>
        <Field label="Payment" labelTh="ช่องทางจ่าย">
          <SelectInput name="payment_method" required>
            <option value="cash">{L.cash.en}</option>
            <option value="bank">{L.bank.en}</option>
          </SelectInput>
        </Field>
        <div className="sm:col-span-2">
          <Field label="Notes" labelTh="รายละเอียด">
            <TextArea name="notes" />
          </Field>
        </div>
        {state && "error" in state && (
          <p className="text-sm text-red-600 sm:col-span-2">{state.error}</p>
        )}
        {state && "ok" in state && (
          <p className="text-sm text-green-700 sm:col-span-2">Saved / บันทึกแล้ว</p>
        )}
        <div className="sm:col-span-2">
          <SubmitButton pending={pending}>{L.save.en}</SubmitButton>
        </div>
      </form>
    </Card>
  );
}
