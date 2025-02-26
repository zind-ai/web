import { createClient, SupabaseClient } from "@supabase/supabase-js"

let instance: SupabaseClient

export const supabase_client = () => {
  if (!instance) {
    const SUPABASE_API_URL = process.env.SUPABASE_API_URL
    const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY

    if (!SUPABASE_API_URL || !SUPABASE_ANON_KEY) {
      throw new Error("Supabase URL or Anon Key is missing.")
    }

    instance = createClient(SUPABASE_API_URL, SUPABASE_ANON_KEY)
  }

  return instance
}
