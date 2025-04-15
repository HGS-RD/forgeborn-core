// Copyright (c) 2025 Hillstrong Group Security. All rights reserved.
// Use of this source code is governed by the custom license found in the LICENSE file.

// supabase_adapter_core.ts
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';


const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_KEY;

if (!url || !key) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_KEY in env.");
}

const supabase = createClient(url, key);

export async function runSupabaseAdapter() {
  console.log("🔌 Connected to Supabase!");

  // Read a sample
  const { data, error } = await supabase
    .from("test_data")
    .select("*")
    .limit(1);

  if (error) {
    throw new Error(`❌ Supabase query failed: ${error.message}`);
  }

  console.log("📦 Sample data:", data);
}

// 📥 Insert message into Supabase
export async function writeMessageToSupabase(message: string) {
  const { data, error } = await supabase
    .from("test_data")
    .insert([{ message }])
    .select();

  if (error) {
    throw new Error(`❌ Insert failed: ${error.message}`);
  }

  console.log("✅ Message inserted into Supabase:", data);
}
