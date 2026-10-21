/**
 * Supabase connection settings.
 *
 * Supabase now issues "publishable" keys (`sb_publishable_...`), so
 * `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` is the current env var name.
 * The legacy `NEXT_PUBLIC_SUPABASE_ANON_KEY` is still read as a fallback so
 * existing Vercel env vars keep working.
 */
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

export const supabaseKey = (
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)!;

export const supabaseConfigured = !!supabaseUrl && !!supabaseKey;
