const inputClass =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500";

const labelClass = "mb-1 block text-sm font-medium text-slate-700";

export function Field({
  label,
  labelTh,
  children,
}: {
  label: string;
  labelTh?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={labelClass}>
        {label}
        {labelTh && (
          <span className="ml-1 font-normal text-slate-500">/ {labelTh}</span>
        )}
      </label>
      {children}
    </div>
  );
}

export function TextInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
) {
  return <input className={inputClass} {...props} />;
}

export function SelectInput(
  props: React.SelectHTMLAttributes<HTMLSelectElement>,
) {
  return <select className={inputClass} {...props} />;
}

export function TextArea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  return (
    <textarea
      className={`${inputClass} min-h-[72px]`}
      rows={2}
      {...props}
    />
  );
}

export function SubmitButton({
  children,
  pending,
}: {
  children: React.ReactNode;
  pending?: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
    >
      {children}
    </button>
  );
}

export function Card({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      {title && (
        <h2 className="mb-4 text-base font-semibold text-slate-900">{title}</h2>
      )}
      {children}
    </section>
  );
}

export function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: React.ReactNode[][];
}) {
  if (rows.length === 0) {
    return (
      <p className="text-sm text-slate-500">No records yet / ยังไม่มีข้อมูล</p>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-slate-500">
            {headers.map((h) => (
              <th key={h} className="px-2 py-2 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((cells, i) => (
            <tr key={i} className="border-b border-slate-100">
              {cells.map((cell, j) => (
                <td key={j} className="px-2 py-2 text-slate-800">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
