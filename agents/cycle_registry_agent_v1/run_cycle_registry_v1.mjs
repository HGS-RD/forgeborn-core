// Copyright (c) 2025 Hillstrong Group Security. All rights reserved.
// Use of this source code is governed by the custom license found in the LICENSE file.

import { CycleRegistryAgent } from './cycle_registry_v1.ts';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("🔧 Running cycle_registry_v1 entrypoint");

const goal = {
  description: "Track blueprint goals, executed agents, and outputs.",
  inputDocs: []
};

async function main() {
  console.log("📦 Instantiating CycleRegistryAgent...");
  const agent = new CycleRegistryAgent(goal);
  const output = agent.run();
  console.log("✅ Cycle registry complete. Output at:", output);
}

main().catch((err) => {
  console.error("❌ Error during cycle_registry_v1 execution:", err);
});
