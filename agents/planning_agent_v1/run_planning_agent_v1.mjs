// run_planning_agent_v1.mjs
import { planning_agent_v1_core } from './planning_agent_v1_core.mjs';
import { callLLM } from '../adapters/llm_adapter.mjs';

const result = await callLLM('planner', 'Design a blueprint for an observability agent');

console.log("Running planning_agent_v1...");
planning_agent_v1_core();
