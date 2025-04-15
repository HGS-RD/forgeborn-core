// Copyright (c) 2025 Hillstrong Group Security. All rights reserved.
// Use of this source code is governed by the custom license found in the LICENSE file.

import { MetaOrchestratorAgent } from './meta_orchestrator_v1.ts';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("🔧 Running meta_orchestrator_v1 entrypoint");

const goal = {
  description: "Analyze blueprint, memory, docs, and long-term memory to recommend the next agent or improvement.",
  inputDocs: [
    '../../blueprints/factory_generated_rc.yaml',
    '../../memory/chunks',
    '../../docs/generated_plan_docs.md',
    '../../memory/long_term_memory.json' // ✅ New persistent memory source
  ]
};


async function main() {
  const agent = new MetaOrchestratorAgent(goal);
  const result = agent.analyze();
  console.log("✅ Orchestration complete. Output at:", result);
}

main().catch(console.error);
