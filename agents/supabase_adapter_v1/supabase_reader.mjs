// Copyright (c) 2025 Hillstrong Group Security. All rights reserved.
// Use of this source code is governed by the custom license found in the LICENSE file.

import { supabase } from "./supabase_client.ts";

export async function fetchTopModels(task: string) {
  const { data, error } = await supabase
    .from("llm_evaluations")
    .select("*")
    .eq("task", task)
    .order("latency", { ascending: true })
    .limit(5);

  if (error) {
    throw new Error(`Fetch failed: ${error.message}`);
  }

  return data;
}
