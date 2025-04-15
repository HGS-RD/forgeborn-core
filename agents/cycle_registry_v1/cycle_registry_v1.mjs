// Copyright (c) 2025 Hillstrong Group Security. All rights reserved.
// Use of this source code is governed by the custom license found in the LICENSE file.

// /Users/rogerhill/Documents/GitHub/forgeborn-core/agents/cycle_registry_v1/cycle_registry_v1.ts

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("🧠 cycle_registry_v1.ts loaded");

export class CycleRegistryAgent {
  goal: any;

  constructor(goal: any) {
    console.log("🧠 CycleRegistryAgent constructor called with:", goal);
    this.goal = goal;
  }

  run(): string {
    const blueprintPath = join(__dirname, '../../blueprints/factory_generated_rc.yaml');
    const executionLogPath = join(__dirname, '../../logs/execution_log_v2.txt');
    const registryPath = join(__dirname, '../../logs/cycle_registry_log.json');

    console.log("📄 Reading blueprint...");
    const blueprintContent = readFileSync(blueprintPath, 'utf-8');
    const blueprint = yaml.load(blueprintContent) as any;

    console.log("📄 Reading execution log...");
    const executionLog = readFileSync(executionLogPath, 'utf-8');

    const entry = {
      timestamp: new Date().toISOString(),
      goal: blueprint.goal || 'unknown',
      tasks: blueprint.tasks || [],
      executionLog: executionLog.slice(0, 2000), // Trim to keep log light
    };

    let registry = [];
    if (existsSync(registryPath)) {
      const existing = readFileSync(registryPath, 'utf-8');
      registry = JSON.parse(existing);
    }

    registry.push(entry);
    writeFileSync(registryPath, JSON.stringify(registry, null, 2));
    console.log("✅ Cycle Registry updated at:", registryPath);

    return registryPath;
  }
}
