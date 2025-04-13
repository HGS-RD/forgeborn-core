import { AgentExecutionEngine } from './agent_execution_engine.js';

const engine = new AgentExecutionEngine();
const result = engine.runBlueprint('../../blueprints/factory_generated_rc.yaml');
console.log("✅ Full execution log written to:", result);