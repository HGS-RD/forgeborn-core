// Copyright (c) 2025 Hillstrong Group Security. All rights reserved.
// Use of this source code is governed by the custom license found in the LICENSE file.

// run_planner_agent_v2.ts
import { PlannerAgent } from "./planner_agent_core.ts";

console.log("🚀 planner_agent_v2 starting...");

const goal = "Generate a fresh RC plan based on optimized blueprint";
const inputDocs = [
  "../../blueprints/optimized_blueprint_v2.yaml"
];

async function main() {
  console.log("📦 Declared input:", inputDocs);
  const agent = new PlannerAgent(goal, inputDocs[0]);
  const result = await agent.generatePlan();
  console.log("✅ RC Plan generated:", result);
}

main().catch((err) => {
  console.error("❌ planner_agent_v2 failed:", err);
});
