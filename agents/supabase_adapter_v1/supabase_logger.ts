// Copyright (c) 2025 Hillstrong Group Security. All rights reserved.
// Use of this source code is governed by the custom license found in the LICENSE file.

// supabase_logger.ts
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_KEY;

if (!url || !key) {
  throw new Error("Missing Supabase credentials in environment.");
}

const supabase = createClient(url, key);

interface LLMEvent {
  task: string;
  provider: string;
  model: string;
  latency: number;
  status: "success" | "fail";
  timestamp: string; // ISO string
  output?: string;    // ✅ optional
}


export async function logLLMEvent(event: LLMEvent): Promise<void> {
  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

  const { error } = await supabase
    .from("llm_eval_logs")
    .insert([event]);

  if (error) {
    console.error("❌ Failed to log event to Supabase:", error.message);
  } else {
    console.log("📗 Event logged to Supabase.");
  }
}



