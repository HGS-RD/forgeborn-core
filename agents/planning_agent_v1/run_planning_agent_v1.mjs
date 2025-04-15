// Copyright (c) 2025 Hillstrong Group Security. All rights reserved.
// Use of this source code is governed by the custom license found in the LICENSE file.

import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';
import fs from 'fs';
import yaml from 'js-yaml'; // ⚠️ install if not already: npm install js-yaml
import { PlanningAgent } from './planning_agent_v1.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("🔧 Running planning_agent_v1 entrypoint");

const goal = {
  description: "Create the smallest functional factory capable of generating new agents based on a goal.",
  inputDocs: [`${__dirname}/../../docs/vision.md`]
};

async function main() {
  console.log("📦 Instantiating PlanningAgent...");

  const agent = new PlanningAgent(goal);
  const blueprint = await agent.generateBlueprint();

  // ✅ Persist the blueprint as a YAML plan
  const outputPath = resolve(__dirname, '../../blueprints/builder_agent_plan.yaml');
  fs.writeFileSync(outputPath, yaml.dump(blueprint), 'utf-8');
  console.log("✅ builder_agent_plan.yaml written to:", outputPath);

  // Optional: Still log the path returned from the agent (Markdown maybe)
  console.log("📝 Original agent output:", blueprint);
}

main().catch((err) => {
  console.error("❌ Agent failed to run:", err);
});
