import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
}

if (!supabaseAnonKey && !supabaseServiceRoleKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY or SUPABASE_SERVICE_ROLE_KEY environment variable');
}

// Use service role on the server when available to bypass RLS for trusted server operations
export const supabaseServer = createClient(
    supabaseUrl,
    supabaseServiceRoleKey || supabaseAnonKey!
);

// Log which key is being used (but don't expose the key itself)
if (supabaseServiceRoleKey) {
  console.log('[Supabase] Using SERVICE_ROLE_KEY (RLS bypassed)');
} else {
  console.log('[Supabase] Using ANON_KEY (RLS enforced)');
}


