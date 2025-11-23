import { createClient } from '@supabase/supabase-js';

const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseUrl = (envUrl && envUrl.startsWith("http")) ? envUrl : "https://placeholder.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";

console.log("Supabase Client Initialized with URL:", supabaseUrl);

export const supabase = createClient(supabaseUrl, supabaseKey);
