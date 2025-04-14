import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { EvaluatorAgent } from './evaluator_agent_v1.ts'; // 👈 must end in `.js` for ESM

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("🔧 Running evaluator_agent_v1 entrypoint");

const goal = {
  description: "Evaluate the trustworthiness of the current RC plan.",
  inputDocs: [`${__dirname}/../../rcs/rc_forgeborn_core_v1_plan.md`]
};

async function main() {
  console.log("📦 Instantiating EvaluatorAgent...");

  const agent = new EvaluatorAgent(goal);
  const output = agent.evaluate();

  console.log("✅ Evaluation complete. Output at:", output);
}

main().catch((err) => {
  console.error("❌ Agent failed to run:", err);
});
