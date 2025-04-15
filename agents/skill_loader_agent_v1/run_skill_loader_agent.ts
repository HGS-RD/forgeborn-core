// Copyright (c) 2025 Hillstrong Group Security. All rights reserved.
// Use of this source code is governed by the custom license found in the LICENSE file.

import { SkillLoaderAgent } from './skill_loader_agent.ts';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("🔧 Running skill_loader_agent_v1 entrypoint");

const goal = {
  description: 'Match skills to the factory RC blueprint.',
  inputDocs: [
    '/Users/rogerhill/Documents/GitHub/forgeborn-core/blueprints/factory_generated_rc.yaml',
    '/Users/rogerhill/Documents/GitHub/forgeborn-core/skills/registry.yaml'
  ]
};

const agent = new SkillLoaderAgent(goal);
const output = agent.matchSkills();

console.log("✅ Skill load log written to:", output);
