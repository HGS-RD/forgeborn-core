import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { SkillLoaderAgent } from './skill_loader_agent_v1.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("🔧 Running skill_loader_agent_v1 entrypoint");

const goal = {
  description: 'Analyze documentation and generate a skill load plan.',
  inputDocs: [join(__dirname, '../../docs/generated_plan_docs.md')]
};

async function main() {
  console.log("📦 Instantiating SkillLoaderAgent...");
  const agent = new SkillLoaderAgent(goal);
  const outputPath = agent.generateSkillPlan();
  console.log("✅ Skill loading complete. Output at:", outputPath);
}

main().catch((err) => {
  console.error("❌ Agent failed to run:", err);
});
