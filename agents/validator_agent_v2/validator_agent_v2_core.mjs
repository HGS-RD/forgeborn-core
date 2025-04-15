// validator_agent_v2_core.mjs
import fs from 'fs';
import yaml from 'js-yaml';

export const validator_agent_v2_core = () => {
  console.log("🧪 validator_agent_v2 is validating blueprint against plan...");

  const blueprintPath = './agents/blueprint_optimizer_v1/optimized_blueprint.md';
  const planPath = './agents/planning_agent_v1/planning_results.yaml';

  if (!fs.existsSync(blueprintPath) || !fs.existsSync(planPath)) {
    console.log("❌ Missing blueprint or planning file.");
    return;
  }

  const blueprint = yaml.load(fs.readFileSync(blueprintPath, 'utf-8'));
  const plan = yaml.load(fs.readFileSync(planPath, 'utf-8'));

  const blueprintAgents = blueprint.agents.map(a => a.name);
  const plannedAgents = plan.plan.map(t => t.agent);

  const missingInPlan = blueprintAgents.filter(x => !plannedAgents.includes(x));
  const extraInPlan = plannedAgents.filter(x => !blueprintAgents.includes(x));

  if (missingInPlan.length || extraInPlan.length) {
    console.log("🔍 Discrepancies found:");
    if (missingInPlan.length)
      console.log("📋 Not planned:", missingInPlan.join(', '));
    if (extraInPlan.length)
      console.log("📋 Not in blueprint:", extraInPlan.join(', '));
  } else {
    console.log("✅ Blueprint and planning are aligned.");
  }
};
