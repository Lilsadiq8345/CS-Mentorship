import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Use service role on the server when available to bypass RLS for trusted server operations
export const supabaseServer = createClient(
    supabaseUrl,
    supabaseServiceRoleKey || supabaseAnonKey
);


