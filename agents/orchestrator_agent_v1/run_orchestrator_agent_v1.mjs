// Copyright (c) 2025 Hillstrong Group Security. All rights reserved.
// Use of this source code is governed by the custom license found in the LICENSE file.

// run_orchestrator_agent_v1.ts
import { OrchestratorAgent } from "./orchestrator_agent_core.ts";

async function main() {
  try {
    await OrchestratorAgent.start();
  } catch (err) {
    console.error("❌ Orchestrator failed:", err);
    console.error("🔍 Error type:", typeof err);
    console.dir(err, { depth: null });
  }
}

main();
