// skills/blueprint_parser.mjs
import fs from 'fs';
import yaml from 'js-yaml';

export async function runSkill(config) {
  const filePath = './agents/blueprint_optimizer_v1/optimized_blueprint.md';
  if (!fs.existsSync(filePath)) {
    console.log("❌ Blueprint file not found.");
    return;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  try {
    const data = yaml.load(content);
    console.log("🧠 Blueprint Contents:");
    data.agents.forEach(agent => {
      console.log(`- ${agent.name}: ${agent.goal}`);
    });
  } catch (err) {
    console.error("❌ Failed to parse blueprint:", err.message);
  }
}
