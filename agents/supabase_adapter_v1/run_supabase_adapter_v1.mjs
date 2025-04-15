// Copyright (c) 2025 Hillstrong Group Security. All rights reserved.
// Use of this source code is governed by the custom license found in the LICENSE file.

// run_supabase_adapter_v1.ts
import { runSupabaseAdapter } from "./supabase_adapter_core.ts";

runSupabaseAdapter().catch((err) => {
  console.error("❌ Supabase Adapter failed:", err);
});
