export function formatThb(amount: number): string {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("th-TH");
}

export function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}
