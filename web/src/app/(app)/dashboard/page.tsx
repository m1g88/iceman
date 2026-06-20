import { Money } from "@/components/Money";
import { Card, DataTable } from "@/components/ui";
import { formatDate } from "@/lib/format";
import { getMonthlyPL, getStoreBalances } from "@/lib/data";
import { L } from "@/lib/labels";

export default async function DashboardPage() {
  const [pl, balances] = await Promise.all([
    getMonthlyPL(6),
    getStoreBalances(),
  ]);

  const current = pl[0];
  const debtors = balances.filter((b) => Number(b.still_owed_thb) > 0);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-slate-900">
        {L.dashboard.en} / {L.dashboard.th}
      </h1>

      {current ? (
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <p className="text-sm text-slate-500">{L.income.en}</p>
            <p className="text-2xl font-semibold">
              <Money amount={Number(current.total_income_thb)} />
            </p>
            <p className="mt-1 text-xs text-slate-400">
              {formatDate(current.month_start.slice(0, 10))} — cash{" "}
              <Money amount={Number(current.route_cash_income_thb)} /> · credit{" "}
              <Money amount={Number(current.route_credit_income_thb)} />
            </p>
          </Card>
          <Card>
            <p className="text-sm text-slate-500">Expenses / ค่าใช้จ่าย</p>
            <p className="text-2xl font-semibold">
              <Money amount={Number(current.total_expenses_thb)} />
            </p>
          </Card>
          <Card>
            <p className="text-sm text-slate-500">{L.net.en}</p>
            <p
              className={`text-2xl font-semibold ${
                Number(current.net_thb) >= 0
                  ? "text-green-700"
                  : "text-red-600"
              }`}
            >
              <Money amount={Number(current.net_thb)} />
            </p>
          </Card>
        </div>
      ) : (
        <Card>
          <p className="text-sm text-slate-500">
            No data yet. Add route sales and expenses.
          </p>
        </Card>
      )}

      <Card title="Monthly P&L / กำไรรายเดือน">
        <DataTable
          headers={["Month", "Cash", "Credit", "Expenses", "Net"]}
          rows={pl.map((row) => [
            formatDate(row.month_start.slice(0, 10)),
            <Money key="c" amount={Number(row.route_cash_income_thb)} />,
            <Money key="cr" amount={Number(row.route_credit_income_thb)} />,
            <Money key="e" amount={Number(row.total_expenses_thb)} />,
            <Money key="n" amount={Number(row.net_thb)} />,
          ])}
        />
      </Card>

      <Card title={`${L.stillOwed.en} / ${L.stillOwed.th}`}>
        <DataTable
          headers={["Store", "Credit sales", "Payments", "Still owed"]}
          rows={debtors.map((b) => [
            b.store_name,
            <Money key="c" amount={Number(b.credit_sales_thb)} />,
            <Money key="p" amount={Number(b.payments_thb)} />,
            <Money
              key="o"
              amount={Number(b.still_owed_thb)}
              className="font-medium text-red-700"
            />,
          ])}
        />
      </Card>
    </div>
  );
}
