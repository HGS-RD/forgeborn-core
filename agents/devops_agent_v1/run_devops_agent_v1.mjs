// Copyright (c) 2025 Hillstrong Group Security. All rights reserved.
// Use of this source code is governed by the custom license found in the LICENSE file.

// run_devops_agent_v1.ts
import { DevOpsAgent } from "./devops_agent_core.ts";

console.log("🚀 devops_agent_v1 starting...");

const goal = "Transform RC plan into devops execution plan";
const inputPath = "../../blueprints/planner_generated_plan.yaml";

async function main() {
  console.log("📦 Declared input:", inputPath);
  const agent = new DevOpsAgent(goal, inputPath);
  const result = agent.run();
  console.log("✅ RC Plan generated:", result);
}

main().catch((err) => {
  console.error("❌ devops_agent_v1 failed:", err);
});
