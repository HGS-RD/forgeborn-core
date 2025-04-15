// meta_orchestrator_v2_core.mjs
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export const meta_orchestrator_v2_core = async () => {
  const planPath = './agents/planning_agent_v1/planning_results.yaml';
  if (!fs.existsSync(planPath)) {
    console.error("❌ Cannot find planning_results.yaml.");
    return;
  }

  const content = fs.readFileSync(planPath, 'utf-8');
  let planData;
  try {
    planData = yaml.load(content);
  } catch (err) {
    console.error("❌ Failed to parse planning YAML:", err.message);
    return;
  }

  if (!Array.isArray(planData.plan)) {
    console.log("❌ Plan structure invalid or missing.");
    return;
  }

  const executed = [];

  for (const task of planData.plan) {
    if (task.status !== 'ready') continue;
    const agentName = task.agent;
    const runner = `../${agentName}/run_${agentName}.mjs`;
    console.log(`🧭 Running planned agent: ${agentName}`);
    try {
      await import(runner);
      console.log(`✅ Successfully ran ${agentName}`);
      executed.push(agentName);
    } catch (err) {
      console.error(`❌ Failed to run ${agentName}:`, err.message);
    }
  }

  // 🧠 Log to trace memory
  const traceLoggerPath = path.resolve('./skills/trace_logger_skill.mjs');
  if (fs.existsSync(traceLoggerPath)) {
    try {
      const mod = await import(traceLoggerPath);
      if (typeof mod.runSkill === 'function') {
        await mod.runSkill({ invokedBy: 'meta_orchestrator_v2', agents: executed });
      } else {
        console.warn("⚠️ trace_logger_skill does not export runSkill()");
      }
    } catch (err) {
      console.error("❌ Failed to run trace_logger_skill:", err.message);
    }
  } else {
    console.warn("⚠️ trace_logger_skill.mjs not found");
  }
};
