// Copyright (c) 2025 Hillstrong Group Security. All rights reserved.
// Use of this source code is governed by the custom license found in the LICENSE file.

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log("🔥 planning_agent_v1.ts loaded");

export interface Goal {
  description: string;
  inputDocs: string[];
}

export class PlanningAgent {
  goal: Goal;

  constructor(goal: Goal) {
    console.log("🧠 PlanningAgent constructor called with:", goal);
    this.goal = goal;
  }

  async generateBlueprint(): Promise<string> {
    console.log("📐 generateBlueprint() started");

    try {
      const visionPath = this.goal.inputDocs[0];
      console.log("📄 Reading vision file from:", visionPath);

      const visionText = readFileSync(visionPath, 'utf-8');
      console.log("✅ Vision text loaded. Length:", visionText.length);

      const blueprint = `
# Blueprint: ${this.goal.description}
## Based on Vision:
${visionText.slice(0, 300)}...
## Tasks:
1. Parse the goal
2. Match to existing blueprints
3. Scaffold new plan
`;

      const outputPath = join(__dirname, '../../rcs/rc_forgeborn_core_v1_plan.md');
      writeFileSync(outputPath, blueprint);
      console.log("📝 Blueprint written to:", outputPath);

      return outputPath;
    } catch (err) {
      console.error("❌ Error in generateBlueprint:", err);
      throw err;
    }
  }
}
