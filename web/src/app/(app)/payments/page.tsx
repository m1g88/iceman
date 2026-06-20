import { PaymentForm } from "@/components/PaymentForm";
import { Money } from "@/components/Money";
import { Card, DataTable } from "@/components/ui";
import { formatDate } from "@/lib/format";
import { getRecentPayments, getStores } from "@/lib/data";
import { L } from "@/lib/labels";

export default async function PaymentsPage() {
  const [stores, payments] = await Promise.all([
    getStores(),
    getRecentPayments(),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-slate-900">
        {L.payments.en} / {L.payments.th}
      </h1>
      <PaymentForm stores={stores} />
      <Card title="Recent payments / รับชำระล่าสุด">
        <DataTable
          headers={["Date", "Store", "Method", "Amount"]}
          rows={payments.map((p) => [
            formatDate(p.payment_date),
            p.stores?.name ?? "—",
            p.payment_method,
            <Money key="a" amount={Number(p.amount_thb)} />,
          ])}
        />
      </Card>
    </div>
  );
}
