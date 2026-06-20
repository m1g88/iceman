"use client";

import { useActionState } from "react";
import { createRouteSale } from "@/app/actions";
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
import type { Route, Store } from "@/lib/types";

export function SaleForm({
  routes,
  stores,
}: {
  routes: Route[];
  stores: Store[];
}) {
  const [state, action, pending] = useActionState(
    async (_: unknown, formData: FormData) => createRouteSale(formData),
    null,
  );

  return (
    <Card title="Add sale / เพิ่มรายการขาย">
      <form action={action} className="grid gap-4 sm:grid-cols-2">
        <Field label="Date" labelTh="วันที่">
          <TextInput
            type="date"
            name="sale_date"
            defaultValue={todayIso()}
            required
          />
        </Field>
        <Field label="Route" labelTh="เส้นทาง">
          <SelectInput name="route_id" required>
            <option value="">—</option>
            {routes.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </SelectInput>
        </Field>
        <Field label="Store" labelTh="ร้าน">
          <SelectInput name="store_id" required>
            <option value="">—</option>
            {stores.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </SelectInput>
        </Field>
        <Field label="Bags" labelTh="ถุง">
          <TextInput type="number" name="bags" min={0} required />
        </Field>
        <Field label="Sale type" labelTh="สดหรือค้างจ่าย">
          <SelectInput name="sale_type" required>
            <option value="cash">{L.cash.en}</option>
            <option value="credit">{L.credit.en}</option>
          </SelectInput>
        </Field>
        <Field label="Amount (฿)" labelTh="จำนวนเงิน">
          <TextInput
            type="number"
            name="amount_thb"
            min={0}
            step="0.01"
            required
          />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Notes" labelTh="หมายเหตุ">
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
