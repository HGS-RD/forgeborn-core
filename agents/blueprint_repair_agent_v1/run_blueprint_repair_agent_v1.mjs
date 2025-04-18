
import { BlueprintRepairAgent } from "./blueprint_repair_agent_v1_core.mjs";

const goal = "Patch blueprint with missing trace node";
const blueprint = "./blueprints/optimized_blueprint_v2.yaml";

async function main() {
  const agent = new BlueprintRepairAgent(goal, blueprint);
  const result = await agent.run();
  console.log("✅ Repair Summary:", result);
}

main().catch(console.error);
