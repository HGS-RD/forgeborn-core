// Copyright (c) 2025 Hillstrong Group Security. All rights reserved.
// Use of this source code is governed by the custom license found in the LICENSE file.

// run_blueprint_optimizer_agent_v1.ts
import { BlueprintOptimizerAgent } from "./blueprint_optimizer_core.ts";


console.log("🚀 run_blueprint_optimizer_agent_v1.ts loaded");

const goal = "Refine task execution order and identify inefficiencies";
const inputDocs = [
  "../../blueprints/factory_generated_rc.yaml",
  "../../logs/execution_log_v2.txt",
  "../../logs/cycle_registry_log.json"
];
console.log("📄 Declared inputDocs:", inputDocs);
async function main() {
  try {
    console.log("🧠 Constructing agent...");
    const agent = new BlueprintOptimizerAgent(goal, inputDocs);

    console.log("🚦 Invoking optimizeBlueprint()...");
    const result = await agent.optimizeBlueprint();

    console.log("🎯 Optimization complete. Result at:", result);
  } catch (err) {
    console.error("❌ Exception caught in main():", err);
  }
}
main();
