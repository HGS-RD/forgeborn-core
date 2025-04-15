// Copyright (c) 2025 Hillstrong Group Security. All rights reserved.
// Use of this source code is governed by the custom license found in the LICENSE file.

import { supabase } from "./supabase_client.ts";

export async function writeEvaluationResult(task: string, provider: string, model: string, latency: number) {
  const { data, error } = await supabase.from("llm_evaluations").insert([
    { task, provider, model, latency }
  ]);

  if (error) {
    throw new Error(`Insert failed: ${error.message}`);
  }

  return data;
}
