// Copyright (c) 2025 Hillstrong Group Security. All rights reserved.
// Use of this source code is governed by the custom license found in the LICENSE file.

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));

interface Task {
  id: string;
  title: string;
  agent: string;
}

export class AgentExecutionEngine {
  public runBlueprint(blueprintPath: string): string {
    console.log('📖 Attempting to load blueprint from:', blueprintPath);
    const blueprintFullPath =  blueprintPath;
    console.log('📖 Attempting to load blueprint from:', blueprintPath);
    const blueprint = yaml.load(readFileSync(blueprintFullPath, 'utf-8')) as any;
    console.log("✅ Loaded blueprint:", JSON.stringify(blueprint, null, 2));
    const results: string[] = [];

    console.log("🔁 Executing Real Agents for Blueprint:", blueprint.goal);

    for (const task of blueprint.tasks as Task[]) {
      const agentPath = join(__dirname, `../${task.agent}`);
      const npmStartPath = join(agentPath, 'package.json');
      console.log("🛠 Running task:", task.id, "using agent:", task.agent);
      console.log("📁 Agent folder path:", agentPath);
      console.log('📁 Agent start path:', npmStartPath); // → corrected to use `npmStartPath`

      
      if (!existsSync(npmStartPath)) {
        results.push(`❌ ${task.id}: ${task.agent} not found`);
        continue;
      }

      try {
        console.log(`▶️ Running: ${task.agent}`);
        const result = execSync('npm start', { cwd: agentPath }).toString();
        results.push(`✅ ${task.id}: ${task.agent} ran successfully`);
        results.push(result);
      } catch (err) {
        results.push(`❌ ${task.id}: ${task.agent} failed`);
        results.push(String(err));
      }
    }

    const logPath = join(__dirname, '../../logs/execution_log_v2.txt');
    writeFileSync(logPath, results.join('\n\n'));
    return logPath;
  }
}