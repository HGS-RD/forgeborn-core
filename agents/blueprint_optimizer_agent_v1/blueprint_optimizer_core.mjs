// Copyright (c) 2025 Hillstrong Group Security. All rights reserved.
// Use of this source code is governed by the custom license found in the LICENSE file.

// blueprint_optimizer_core.ts
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export class BlueprintOptimizerAgent {
  goal: string;
  inputDocs: string[];

  constructor(goal: string, inputDocs: string[]) {
    console.log("🧠 BlueprintOptimizerAgent constructor called with:", goal, inputDocs);
    this.goal = goal;
    this.inputDocs = inputDocs;
  }

  async optimizeBlueprint(): Promise<string> {
    const [blueprintPath, logPath, registryPath] = this.inputDocs;

    const blueprintYaml = readFileSync(blueprintPath, 'utf-8');
    const executionLog = readFileSync(logPath, 'utf-8');
    const registryLog = readFileSync(registryPath, 'utf-8');

    const blueprint = yaml.load(blueprintYaml) as any;
    const registry = JSON.parse(registryLog);

    // Basic improvement: annotate each task with an execution log reference
    const annotatedTasks = blueprint.tasks.map((task: string, index: number) => {
      const logSnippet = executionLog.includes(task) ? "✅ previously run" : "⚠️ not executed";
      return `${task}  # ${logSnippet}`;
    });

    const optimizedBlueprint = {
      ...blueprint,
      tasks: annotatedTasks
    };

    const outputYaml = yaml.dump(optimizedBlueprint);
    const outputPath = join(__dirname, '../../blueprints/optimized_blueprint_v2.yaml');
    writeFileSync(outputPath, outputYaml);

    // Also log this action
    const logPathOut = join(__dirname, '../../logs/blueprint_optimizer_log.json');
    writeFileSync(logPathOut, JSON.stringify({
      timestamp: new Date().toISOString(),
      optimizedFrom: blueprintPath,
      savedTo: outputPath,
      goal: this.goal
    }, null, 2));

    console.log("✅ Optimized blueprint written to:", outputPath);
    return outputPath;
  }
}
