// Copyright (c) 2025 Hillstrong Group Security. All rights reserved.
// Use of this source code is governed by the custom license found in the LICENSE file.

// devops_agent_core.ts
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class DevOpsAgent {
  goal: string;
  planPath: string;

  constructor(goal: string, planPath: string) {
    console.log("🛠️ DevOpsAgent initialized with:", goal, planPath);
    this.goal = goal;
    this.planPath = planPath;
  }

  run(): string {
    const planYaml = readFileSync(this.planPath, 'utf-8');
    const plan = yaml.load(planYaml) as any;

    const devopsTasks = (plan.reorderedTasks || []).map((task: string, index: number) => {
      return {
        id: `task_${index + 1}`,
        description: task.replace(/#.*$/, "").trim(),
        status: "pending",
        assignedTo: "auto",
        createdAt: new Date().toISOString(),
      };
    });

    const devopsPlan = {
      goal: this.goal,
      tasks: devopsTasks,
      source: this.planPath,
      generatedAt: new Date().toISOString(),
    };

    const outputPath = join(__dirname, '../../blueprints/devops_agent_build_cycle.yaml');
    writeFileSync(outputPath, yaml.dump(devopsPlan));

    console.log("✅ DevOpsAgent output written to:", outputPath);
    return outputPath;
  }
}
