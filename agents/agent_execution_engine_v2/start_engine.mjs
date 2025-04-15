// Copyright (c) 2025 Hillstrong Group Security. All rights reserved.
// Use of this source code is governed by the custom license found in the LICENSE file.

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { register } from 'ts-node';

console.log('🚀 Starting Agent Execution Engine');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

register({
  transpileOnly: true,
  esm: true,
});


(async () => {
  try {
    console.log('🔄 Loading engine module...');
    const module = await import('./agent_execution_engine.ts');
    console.log('✅ Engine module loaded');

    const engine = new module.AgentExecutionEngine();
    const blueprintPath = join(__dirname, '../../blueprints/planning_agent_output.yaml');

    console.log('📘 Blueprint path:', blueprintPath);

    const result = engine.runBlueprint(blueprintPath);
    console.log('✅ Engine execution completed:', result);
  } catch (err) {
    console.error('❌ Failed to run engine:', err);
  }
})();
