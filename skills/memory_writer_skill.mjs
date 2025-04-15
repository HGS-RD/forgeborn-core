// skills/memory_writer_skill.mjs
import fs from 'fs';
import yaml from 'js-yaml';

export async function runSkill(config) {
  const memoryDir = './memory';
  if (!fs.existsSync(memoryDir)) fs.mkdirSync(memoryDir);

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const blueprintIn = './agents/blueprint_optimizer_v1/optimized_blueprint.md';
  const planningIn = './agents/planning_agent_v1/planning_results.yaml';

  const out1 = `./memory/blueprint_log_${timestamp}.yaml`;
  const out2 = `./memory/planning_log_${timestamp}.yaml`;

  try {
    const blueprintRaw = fs.readFileSync(blueprintIn, 'utf-8');
    const planRaw = fs.readFileSync(planningIn, 'utf-8');

    const blueprint = yaml.load(blueprintRaw);
    const plan = yaml.load(planRaw);

    fs.writeFileSync(out1, yaml.dump(blueprint), 'utf-8');
    fs.writeFileSync(out2, yaml.dump(plan), 'utf-8');

    console.log(`🧠 Blueprint and planning logs saved to memory/ as of ${timestamp}`);
  } catch (err) {
    console.error("❌ Failed to archive memory:", err.message);
  }
}
