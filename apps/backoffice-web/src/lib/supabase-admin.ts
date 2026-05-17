import { createClient } from "@supabase/supabase-js";

export function getSupabaseServiceClient() {
  if (typeof window !== "undefined") {
    throw new Error("Supabase service client can only be used on the server.");
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Missing Supabase service role environment variables.");
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

