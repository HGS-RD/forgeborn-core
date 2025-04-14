import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import { DocsAgent } from './docs_agent_v1.ts';

console.log("✅ DocsAgent module imported");

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("🔧 Running docs_agent_v1 entrypoint");

const goal = {
  description: "Generate builder_agent_spec.md based on the RC plan and memory.",
  inputDocs: [
    `${__dirname}/../../rcs/rc_forgeborn_core_v1_plan.md`,
    `${__dirname}/../../memory/chunks`
  ],
  output: `${__dirname}/../../agents/builder_agent_v1/specs/builder_agent_spec.md`
};

async function main() {
  console.log("📦 Instantiating DocsAgent...");

  // 🛠 Ensure output directory exists
  const outputDir = dirname(goal.output);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`📁 Created output directory: ${outputDir}`);
  }

  const agent = new DocsAgent(goal);
  const output = await agent.generateDocumentation();
  console.log("✅ Documentation complete. Output at:", output);
}

main().catch((err) => {
  console.error("❌ Agent failed to run:", err);
});
