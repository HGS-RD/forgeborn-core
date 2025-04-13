import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { PlanningAgent } from './planning_agent_v1.ts';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("🔧 Running planning_agent_v1 entrypoint");

const goal = {
  description: "Create the smallest functional factory capable of generating new agents based on a goal.",
  inputDocs: [`${__dirname}/../../docs/vision.md`]
};

async function main() {
  console.log("📦 Instantiating PlanningAgent...");

  const agent = new PlanningAgent(goal);
  const output = await agent.generateBlueprint();

  console.log("✅ Blueprint generated at:", output);
}

main().catch((err) => {
  console.error("❌ Agent failed to run:", err);
});
