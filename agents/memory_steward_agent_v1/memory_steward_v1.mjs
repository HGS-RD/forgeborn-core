// Copyright (c) 2025 Hillstrong Group Security. All rights reserved.
// Use of this source code is governed by the custom license found in the LICENSE file.

// memory_steward_core.ts
import { createClient } from "@supabase/supabase-js";
import "dotenv/config";
// run_memory_steward_v1.ts
import { ingestLLMEvaluationsToMemory } from './memory_steward_v1.ts';

ingestLLMEvaluationsToMemory().catch((err) => {
  console.error("❌ Memory Steward Agent failed:", err);
});

export async function ingestLLMEvaluationsToMemory() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_KEY in env.");
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  console.log("🔁 Fetching LLM evaluation outputs from Supabase...");

  const { data, error } = await supabase
    .from("llm_eval_logs")
    .select("*")
    .eq("status", "success")
    .not("output", "is", null)
    .order("timestamp", { ascending: false })
    .limit(20); // ⏱️ Optional: Tune this for performance

  if (error) {
    throw new Error(`❌ Supabase fetch failed: ${error.message}`);
  }

  console.log(`📥 Retrieved ${data.length} logs. Starting normalization...`);

  const memoryChunks = data.map((entry: any, index: number) => {
    return {
      id: `llm_chunk_${index + 1}`,
      task: entry.task,
      model: entry.winner_model,
      provider: entry.provider,
      timestamp: entry.timestamp,
      source: "llm_eval_logs",
      text: entry.output,
      trust: "trustworthy", // ✳️ Can evolve later
    };
  });

  // 🔐 Optional: Save to filesystem or vector memory store
  const fs = await import("fs");
  const path = await import("path");

  const outputPath = path.resolve(__dirname, "../../memory/chunks/llm_eval_ingested.json");
  fs.writeFileSync(outputPath, JSON.stringify(memoryChunks, null, 2));
  console.log(`🧠 Ingested memory saved to: ${outputPath}`);
}
