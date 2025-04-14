import { MemoryGovernorAgent } from './memory_governor_v1.ts'; // .js required for ESM
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("🔧 Running memory_governor_v1 entrypoint");

const goal = {
  description: 'Preserve important knowledge for long-term use.',
  inputDocs: [
    '../../memory/chunks',
    '../../docs/generated_plan_docs.md',
    '../../rcs'
  ]
};

async function main() {
  const agent = new MemoryGovernorAgent(goal);
  const output = agent.preserveImportantKnowledge();
  console.log("✅ Memory governor complete. Output at:", output);
}

main();
