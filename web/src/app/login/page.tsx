import { LoginForm } from "@/components/LoginForm";
import { L } from "@/lib/labels";
import { supabaseConfigured } from "@/lib/supabase/env";

export default function LoginPage() {
  const configured = supabaseConfigured;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">{L.appName.en}</h1>
          <p className="text-slate-500">{L.appName.th}</p>
        </div>
        {!configured ? (
          <p className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            Supabase not configured. Copy <code>.env.local.example</code> to{" "}
            <code>.env.local</code> and set your project URL and publishable
            key. See <code>docs/web-setup.md</code>.
          </p>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
}
