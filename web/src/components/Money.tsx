import { formatThb } from "@/lib/format";

export function Money({
  amount,
  className = "",
}: {
  amount: number;
  className?: string;
}) {
  return <span className={className}>{formatThb(amount)}</span>;
}
