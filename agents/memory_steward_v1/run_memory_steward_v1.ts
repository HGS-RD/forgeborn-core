import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { MemoryStewardAgent } from './memory_steward_v1.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("🔧 Running memory_steward_v1 entrypoint");

const goal = {
  description: "Chunk RC and evaluation into memory structures.",
  inputDocs: [
    join(__dirname, '../../rcs/rc_forgeborn_core_v1_plan.md'),
    join(__dirname, '../../memory/evaluator_score.json')
  ]
};

async function main() {
  console.log("📦 Instantiating MemoryStewardAgent...");

  const agent = new MemoryStewardAgent(goal);
  const output = agent.chunkMemory();

  console.log("✅ Memory processing complete. Output at:", output);
}

main().catch((err) => {
  console.error("❌ Agent failed to run:", err);
});
