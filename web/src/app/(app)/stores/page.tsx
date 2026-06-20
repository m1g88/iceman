import { Money } from "@/components/Money";
import { Card, DataTable } from "@/components/ui";
import { getStoreBalances } from "@/lib/data";
import { L } from "@/lib/labels";

export default async function StoresPage() {
  const balances = await getStoreBalances();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-slate-900">
        {L.stores.en} / {L.stores.th}
      </h1>
      <Card title="Who owes what / ลูกค้าค้างจ่าย">
        <DataTable
          headers={[
            "Store",
            "Opening",
            "Credit sales",
            "Payments",
            "Still owed",
          ]}
          rows={balances.map((b) => [
            b.store_name,
            <Money key="o" amount={Number(b.opening_debt_thb)} />,
            <Money key="c" amount={Number(b.credit_sales_thb)} />,
            <Money key="p" amount={Number(b.payments_thb)} />,
            <Money
              key="s"
              amount={Number(b.still_owed_thb)}
              className={
                Number(b.still_owed_thb) > 0 ? "font-medium text-red-700" : ""
              }
            />,
          ])}
        />
      </Card>
    </div>
  );
}
