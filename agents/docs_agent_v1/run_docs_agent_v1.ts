import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { DocsAgent } from './docs_agent_v1.ts'; // ✅ This is correct

console.log("✅ DocsAgent module imported"); // <-- ADD THIS LINE

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("🔧 Running docs_agent_v1 entrypoint");

const goal = {
  description: 'Generate documentation for the RC and memory chunks.',
  inputDocs: [
    join(__dirname, '../../memory/chunks')
  ]
};

async function main() {
  console.log("📦 Instantiating DocsAgent...");
  const agent = new DocsAgent(goal);
  const output = agent.generateDocumentation();
  console.log("✅ Documentation complete. Output at:", output);
}

main().catch((err) => {
  console.error("❌ Agent failed to run:", err);
});
