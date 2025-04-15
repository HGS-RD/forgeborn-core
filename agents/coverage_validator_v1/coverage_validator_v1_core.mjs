// coverage_validator_v1_core.mjs
import fs from 'fs';
import yaml from 'js-yaml';

export const coverage_validator_v1_core = () => {
  const blueprintPath = './agents/planning_agent_v1/planning_results.yaml';
  const memoryDir = './memory';
  const traceFiles = fs.readdirSync(memoryDir).filter(f => f.startsWith('execution_trace_') && f.endsWith('.yaml'));
  if (!fs.existsSync(blueprintPath) || traceFiles.length === 0) {
    console.log("❌ Missing planning output or execution trace.");
    return;
  }

  const plan = yaml.load(fs.readFileSync(blueprintPath, 'utf-8'));
  const latestTraceFile = traceFiles.sort().reverse()[0];
  const trace = yaml.load(fs.readFileSync(`${memoryDir}/${latestTraceFile}`, 'utf-8'));

  const plannedAgents = new Set(plan.plan.map(t => t.agent));
  const executedAgents = new Set(trace.agents_run);

  const missed = [...plannedAgents].filter(a => !executedAgents.has(a));
  const unexpected = [...executedAgents].filter(a => !plannedAgents.has(a));

  console.log(`🔍 Coverage Report for Trace File: ${latestTraceFile}`);
  if (missed.length === 0 && unexpected.length === 0) {
    console.log("✅ All planned agents were executed and no extras found.");
  } else {
    if (missed.length) console.log("❌ Planned but not executed:", missed.join(', '));
    if (unexpected.length) console.log("⚠️ Executed but not in plan:", unexpected.join(', '));
  }
};
