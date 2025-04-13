#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Setup __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 🚀 Banner
console.log('🚀 Forgeborn CLI is active!');

const args = process.argv.slice(2);
if (!args.length) {
  console.error('❌ Missing input. Use: factory new "Your goal here"');
  process.exit(1);
}

if (args[0] === 'new' && args[1]) {
  const rawGoal = args.slice(1).join(' ').replace(/^"|"$/g, '');
  const blueprintDir = path.join(__dirname, '..', 'blueprints');
  const filename = `factory_generated_rc.yaml`;
  const outputPath = path.join(blueprintDir, filename);

  const blueprint = `goal: ${rawGoal}
tasks:
  - id: t1
    title: Interpret the goal and plan architecture
    agent: planning_agent_v1
  - id: t2
    title: Evaluate the RC for trustworthiness
    agent: evaluator_agent_v1
  - id: t3
    title: Chunk RC and store in memory
    agent: memory_steward_v1
  - id: t4
    title: Generate documentation for the RC
    agent: docs_agent_v1
  - id: t5
    title: Analyze loop and plan next move
    agent: meta_orchestrator_v1
`;

  // Ensure blueprint folder exists
  if (!fs.existsSync(blueprintDir)) {
    fs.mkdirSync(blueprintDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, blueprint);
  console.log(`✅ Blueprint created: ${outputPath}`);
} else {
  console.error('❌ Unknown command or missing goal string.');
}
