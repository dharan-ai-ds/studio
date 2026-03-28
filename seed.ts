import { createClient } from "@supabase/supabase-js";
import { mockIssues } from "./src/lib/data";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase URL or Anon Key in environment variables.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seed() {
  console.log(`Seeding data to Supabase project at ${supabaseUrl}...`);
  
  // Attempt to check if the table exists
  const { data: testData, error: testError } = await supabase.from('issues').select('id').limit(1);
  if (testError && testError.code === 'PGRST205') {
    console.error("❌ The 'issues' table does not exist yet.");
    console.error("Please run the SQL schema script provided in the Implementation Plan first!");
    process.exit(1);
  }

  // Format data for insertion (omitting our local string ID so Supabase gen_random_uuid() can do its thing, 
  // or we can insert our specific UUIDs if we change them. Let's just omit our local ID and map fields properly).
  const records = mockIssues.map(issue => ({
    title: issue.title,
    description: issue.description,
    category: issue.category,
    status: issue.status,
    location: issue.location,
    reporter_id: issue.reporter.id,
    reporter_name: issue.reporter.name,
    upvotes: issue.upvotes,
    image_url: issue.imageUrl,
    image_hint: issue.imageHint,
    created_at: issue.createdAt.toISOString()
  }));

  const { data, error } = await supabase.from("issues").insert(records);

  if (error) {
    console.error("❌ Error inserting data:", error);
  } else {
    console.log(`✅ Successfully seeded ${records.length} mock issues into the database!`);
  }
}

seed();
