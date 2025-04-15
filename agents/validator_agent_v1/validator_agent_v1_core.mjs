// validator_agent_v1_core.mjs
import fs from 'fs';
import path from 'path';

export const validator_agent_v1_core = () => {
  console.log("🧪 validator_agent_v1 is running validation checks...");

  const AGENTS_DIR = './agents';
  const violations = [];

  fs.readdirSync(AGENTS_DIR).forEach(agent => {
    const agentPath = path.join(AGENTS_DIR, agent);
    if (!fs.statSync(agentPath).isDirectory()) return;

    const hasCore = fs.existsSync(path.join(agentPath, `${agent}_core.mjs`));
    const hasRunner = fs.existsSync(path.join(agentPath, `run_${agent}.mjs`));
    if (!hasCore || !hasRunner) {
      violations.push(`❌ ${agent} is missing core or runner file`);
    }
  });

  if (violations.length) {
    console.log("🔍 Validator findings:");
    violations.forEach(v => console.log(v));
  } else {
    console.log("✅ All agents passed validation checks.");
  }
};
