import { ExpenseForm } from "@/components/ExpenseForm";
import { Money } from "@/components/Money";
import { Card, DataTable } from "@/components/ui";
import { formatDate } from "@/lib/format";
import { getExpenseCategories, getRecentExpenses } from "@/lib/data";
import { L } from "@/lib/labels";

export default async function ExpensesPage() {
  const [categories, expenses] = await Promise.all([
    getExpenseCategories(),
    getRecentExpenses(),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-slate-900">
        {L.expenses.en} / {L.expenses.th}
      </h1>
      <ExpenseForm categories={categories} />
      <Card title="Recent expenses / ค่าใช้จ่ายล่าสุด">
        <DataTable
          headers={["Date", "Category", "Method", "Amount", "Notes"]}
          rows={expenses.map((e) => [
            formatDate(e.expense_date),
            e.expense_categories?.name ?? "—",
            e.payment_method,
            <Money key="a" amount={Number(e.amount_thb)} />,
            e.notes ?? "",
          ])}
        />
      </Card>
    </div>
  );
}
