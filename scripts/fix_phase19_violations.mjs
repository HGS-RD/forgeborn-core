
// scripts/fix_phase19_violations.mjs

import fs from 'fs/promises';
import path from 'path';

const AGENTS_TO_FIX = [
  'blueprint_optimizer_agent_v1',
  'cycle_memory_agent_v1',
  'cycle_registry_agent_v1',
  'memory_steward_agent_v1',
  'devops_agent_v1',
  'github_agent_v1',
  'governance_observer_agent_v1',
  'spec_patcher_agent_v1'
];

const AGENTS_DIR = './agents/';
const CORE_TEMPLATE = agent => `// ${agent}_core.mjs\n\nexport async function ${agent}Core() {\n  console.log('[${agent}] core logic placeholder');\n}`;
const RUNNER_TEMPLATE = agent => `// run_${agent}.mjs\n\nimport { ${agent}Core } from './${agent}_core.mjs';\n\n(async () => {\n  await ${agent}Core();\n})();`;

async function createFileIfMissing(filePath, content) {
  try {
    await fs.access(filePath);
    console.log(`✅ Exists: ${filePath}`);
  } catch {
    await fs.writeFile(filePath, content, 'utf8');
    console.log(`🆕 Created: ${filePath}`);
  }
}

async function main() {
  for (const agent of AGENTS_TO_FIX) {
    const agentDir = path.join(AGENTS_DIR, agent);
    const corePath = path.join(agentDir, `${agent}_core.mjs`);
    const runPath = path.join(agentDir, `run_${agent}.mjs`);

    await createFileIfMissing(corePath, CORE_TEMPLATE(agent));
    await createFileIfMissing(runPath, RUNNER_TEMPLATE(agent));
  }
}

main().catch(err => {
  console.error('❌ Error fixing Phase 19 violations:', err);
});
