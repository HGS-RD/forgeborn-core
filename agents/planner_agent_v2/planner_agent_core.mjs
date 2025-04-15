// Copyright (c) 2025 Hillstrong Group Security. All rights reserved.
// Use of this source code is governed by the custom license found in the LICENSE file.

// planner_agent_core.ts
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class PlannerAgent {
  goal: string;
  blueprintPath: string;

  constructor(goal: string, blueprintPath: string) {
    this.goal = goal;
    this.blueprintPath = blueprintPath;
    console.log("🧠 PlannerAgent initialized with:", goal, blueprintPath);
  }

  async generatePlan(): Promise<string> {
    const blueprintYaml = readFileSync(this.blueprintPath, 'utf-8');
    const blueprint = yaml.load(blueprintYaml) as any;

    const tasks: string[] = blueprint.tasks || [];

    // Simple reordering strategy: sort tasks alphabetically
    const reordered = tasks.sort((a, b) => a.localeCompare(b));

    const outputPlan = {
      goal: this.goal,
      reorderedTasks: reordered,
      timestamp: new Date().toISOString()
    };

    const outputPath = join(__dirname, '../../blueprints/planner_generated_plan.yaml');
    writeFileSync(outputPath, yaml.dump(outputPlan));

    console.log("✅ PlannerAgent output written to:", outputPath);
    return outputPath;
  }
}
