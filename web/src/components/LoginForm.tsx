"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Card, Field, SubmitButton, TextInput } from "@/components/ui";
import { L } from "@/lib/labels";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: String(form.get("email")),
      password: String(form.get("password")),
    });
    setPending(false);
    if (authError) {
      setError(authError.message);
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <Card title={`${L.login.en} / ${L.login.th}`}>
      <form onSubmit={onSubmit} className="grid max-w-sm gap-4">
        <Field label="Email">
          <TextInput type="email" name="email" required autoComplete="email" />
        </Field>
        <Field label="Password" labelTh="รหัสผ่าน">
          <TextInput
            type="password"
            name="password"
            required
            autoComplete="current-password"
          />
        </Field>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <SubmitButton pending={pending}>{L.login.en}</SubmitButton>
      </form>
    </Card>
  );
}
