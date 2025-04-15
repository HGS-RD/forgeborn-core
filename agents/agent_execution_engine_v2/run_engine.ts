// Copyright (c) 2025 Hillstrong Group Security. All rights reserved.
// Use of this source code is governed by the custom license found in the LICENSE file.

import { AgentExecutionEngine } from './agent_execution_engine.js';

const engine = new AgentExecutionEngine();
const result = engine.runBlueprint('../../blueprints/factory_generated_rc.yaml');
console.log("✅ Full execution log written to:", result);