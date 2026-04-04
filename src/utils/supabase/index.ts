import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tbtwegsiupiskevhgfjs.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRidHdlZ3NpdXBpc2tldmhnZmpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU0NTc1NDksImV4cCI6MjA1MTAzMzU0OX0.AxWApWvVcdeuTwdpM_TwQs7OTPabmWntpb_LdFAKyoY";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
