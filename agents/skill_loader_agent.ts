// Copyright (c) 2025 Hillstrong Group Security. All rights reserved.
// Use of this source code is governed by the custom license found in the LICENSE file.

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

interface Task {
  id: string;
  title: string;
  agent: string;
}

interface SkillRegistry {
  [agent: string]: {
    [skill: string]: {
      required_files: string[];
      notes?: string;
    };
  };
}

export class SkillLoaderAgent {
  public runSkillMatch(rcPath: string, registryPath: string): string {
    const rc = yaml.load(readFileSync(join(__dirname, rcPath), 'utf-8')) as any;
    const registry = yaml.load(readFileSync(join(__dirname, registryPath), 'utf-8')) as SkillRegistry;

    const outputDir = join(__dirname, '../../memory');
    mkdirSync(outputDir, { recursive: true });

    const results: any[] = [];

    for (const task of rc.tasks as Task[]) {
      const agent = task.agent;
      if (!registry[agent]) continue;

      for (const skill in registry[agent]) {
        const skillData = registry[agent][skill];
        results.push({
          task: task.title,
          agent,
          skill,
          files_injected: skillData.required_files,
          notes: skillData.notes || ""
        });
      }
    }

    const outputPath = join(outputDir, 'skill_load_log.yaml');
    writeFileSync(outputPath, yaml.dump(results));
    return outputPath;
  }
}