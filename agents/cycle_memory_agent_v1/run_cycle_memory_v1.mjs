// Copyright (c) 2025 Hillstrong Group Security. All rights reserved.
// Use of this source code is governed by the custom license found in the LICENSE file.

// run_cycle_memory_v1.ts
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { CycleMemoryAgent } from './cycle_memory_v1.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("🔧 Running cycle_memory_v1 entrypoint");

const goal = {
  description: "Analyze the cycle registry log and long-term memory to detect repeated goals or redundant agents. Suggest refinements or skip logic.",
  inputDocs: [
    join(__dirname, '../../logs/cycle_registry_log.json'),
    join(__dirname, '../../memory/long_term_memory.json')
  ]
};

async function main() {
  console.log("📦 Instantiating CycleMemoryAgent...");

  const agent = new CycleMemoryAgent(goal);
  const output = await agent.analyzeCycles();

  console.log("✅ Cycle memory agent completed. Output at:", output);
}

main().catch((err) => {
  console.error("❌ Agent failed to run:", err);
});
