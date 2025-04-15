// meta_orchestrator_v2_core.mjs
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export const meta_orchestrator_v2_core = async () => {
  console.log("🧠 meta_orchestrator_v2 is initializing...");

  const blueprintPath = path.resolve('./agents/blueprint_optimizer_v1/optimized_blueprint.md');
  if (!fs.existsSync(blueprintPath)) {
    console.log("❌ Blueprint file not found:", blueprintPath);
    return;
  }

  const blueprintText = fs.readFileSync(blueprintPath, 'utf-8');
  let blueprint;
  try {
    blueprint = yaml.load(blueprintText);
  } catch (err) {
    console.error("❌ Failed to parse YAML blueprint:", err.message);
    return;
  }

  if (!Array.isArray(blueprint.agents)) {
    console.log("❌ No valid 'agents' array found in blueprint.");
    return;
  }

  for (const agent of blueprint.agents) {
    const runnerPath = `../${agent.name}/run_${agent.name}.mjs`;
    console.log(`➡️  Running agent: ${agent.name}`);
    try {
      const module = await import(runnerPath);
      console.log(`✅ Successfully ran ${agent.name}`);
    } catch (err) {
      console.error(`❌ Failed to run ${agent.name}:`, err.message);
    }
  }

  console.log("✅ meta_orchestrator_v2 complete.");
};
