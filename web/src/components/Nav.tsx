"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { L } from "@/lib/labels";

const links = [
  { href: "/dashboard", label: L.dashboard },
  { href: "/sales", label: L.sales },
  { href: "/payments", label: L.payments },
  { href: "/expenses", label: L.expenses },
  { href: "/stores", label: L.stores },
] as const;

export function Nav() {
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link href="/dashboard" className="text-lg font-semibold text-slate-900">
          {L.appName.en}
          <span className="ml-2 text-sm font-normal text-slate-500">
            {L.appName.th}
          </span>
        </Link>
        <nav className="flex flex-wrap gap-1">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`rounded-md px-3 py-1.5 text-sm ${
                pathname === href
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {label.en}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          onClick={signOut}
          className="text-sm text-slate-500 hover:text-slate-800"
        >
          {L.logout.en}
        </button>
      </div>
    </header>
  );
}
