import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Lazy initialization for client-side supabase
let supabaseInstance: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  if (!supabaseInstance) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing Supabase environment variables')
    }

    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
  }
  return supabaseInstance
}

// For backwards compatibility - only create on client side
export const supabase = typeof window !== 'undefined'
  ? getSupabase()
  : (null as unknown as SupabaseClient)

// Server-side client with service role (for admin operations)
// Returns a new client each time to avoid caching issues
export function createServerClient(): SupabaseClient {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  // During build time, env vars might not be available
  // Return a placeholder that will error at runtime if actually used without env vars
  if (!supabaseUrl || !serviceRoleKey) {
    // Return a proxy that throws helpful errors only when methods are called
    return new Proxy({} as SupabaseClient, {
      get(target, prop) {
        if (prop === 'from') {
          return () => new Proxy({}, {
            get() {
              return () => Promise.resolve({ data: null, error: new Error('Supabase not configured') })
            }
          })
        }
        return () => {}
      }
    })
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}
