import { createClient, type SupabaseClient } from "@supabase/supabase-js"

let anonClient: SupabaseClient | null = null
let adminClient: SupabaseClient | null = null

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`${name} environment variable is not set`)
  }
  return value
}

/** Public/anon client — used for read-only queries (RLS allows SELECT). */
export function getSupabaseAnon(): SupabaseClient {
  if (!anonClient) {
    anonClient = createClient(
      requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
      requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
      { auth: { persistSession: false, autoRefreshToken: false } },
    )
  }
  return anonClient
}

/** Service-role client — used for admin writes from API routes only. */
export function getSupabaseAdmin(): SupabaseClient {
  if (!adminClient) {
    adminClient = createClient(
      requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
      requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
      { auth: { persistSession: false, autoRefreshToken: false } },
    )
  }
  return adminClient
}
