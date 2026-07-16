import { SaleForm } from "@/components/SaleForm";
import { Money } from "@/components/Money";
import { Card, DataTable } from "@/components/ui";
import { formatDate } from "@/lib/format";
import { getRecentSales, getRoutes, getStores } from "@/lib/data";
import { L } from "@/lib/labels";

export default async function SalesPage() {
  const [routes, stores, sales] = await Promise.all([
    getRoutes(),
    getStores(),
    getRecentSales(),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-slate-900">
        {L.sales.en} / {L.sales.th}
      </h1>
      <SaleForm routes={routes} stores={stores} />
      <Card title="Recent sales / รายการล่าสุด">
        <DataTable
          headers={["Date", "Route", "Store", "Bags", "Type", "Amount"]}
          rows={sales.map((s) => [
            formatDate(s.sale_date),
            s.routes?.name ?? "—",
            s.stores?.name ?? "—",
            s.bags,
            s.sale_type,
            <Money key="a" amount={Number(s.amount_thb)} />,
          ])}
        />
      </Card>
    </div>
  );
}
