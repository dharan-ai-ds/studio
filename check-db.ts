import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
  const { count, error } = await supabase
    .from('issues')
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.error("❌ Error checking database:", error);
  } else {
    console.log(`📊 Database Status: There are currently ${count} rows in the 'issues' table.`);
    if (count === 0) {
      console.log("Empty database detected. Checking for table existence...");
      const { data, error: tableError } = await supabase.from('issues').select('id').limit(1);
      if (tableError) console.error("Table Error:", tableError);
      else console.log("Table exists but it's empty.");
    }
  }
}

check();
