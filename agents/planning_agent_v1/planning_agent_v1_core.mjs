// planning_agent_v1_core.mjs
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export const planning_agent_v1_core = () => {
  console.log("🧠 planning_agent_v1 is analyzing optimized_blueprint.md...");

  const blueprintPath = './agents/blueprint_optimizer_v1/optimized_blueprint.md';
  const outputPath = './agents/planning_agent_v1/planning_results.yaml';

  if (!fs.existsSync(blueprintPath)) {
    console.error("❌ Blueprint file not found:", blueprintPath);
    return;
  }

  const raw = fs.readFileSync(blueprintPath, 'utf-8');
  let blueprint;

  try {
    blueprint = yaml.load(raw);
  } catch (err) {
    console.error("❌ Failed to parse YAML:", err.message);
    return;
  }

  if (!Array.isArray(blueprint.agents)) {
    console.error("❌ Invalid blueprint format: missing 'agents'");
    return;
  }

  const tasks = blueprint.agents.map(agent => ({
    agent: agent.name,
    goal: agent.goal,
    status: 'ready',
    triggers: [],
    depends_on: []
  }));

  fs.writeFileSync(outputPath, yaml.dump({ plan: tasks }), 'utf-8');
  console.log(`✅ planning_agent_v1 wrote execution plan to ${outputPath}`);
};
