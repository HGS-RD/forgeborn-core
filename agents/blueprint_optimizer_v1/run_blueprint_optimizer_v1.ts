import { BlueprintOptimizerAgent } from './blueprint_optimizer_v1.ts';

console.log("🔧 Running blueprint_optimizer_v1 entrypoint");

const goal = "Optimize the agent blueprint for performance and clarity.";
const inputDocs = [
  "../../rcs/rc_forgeborn_core_v1_plan.md",
  "../../memory/long_term_memory.json"
];

async function main() {
  const agent = new BlueprintOptimizerAgent(goal, inputDocs);
  const result = await agent.optimizeBlueprint();
  console.log("✅ Optimization complete. Output at:", result);
}

main().catch((err) => {
  console.error("❌ Agent failed to run:", err);
});
