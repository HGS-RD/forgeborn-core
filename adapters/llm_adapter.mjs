/**
 * adapters/llm_adapter.mjs
 * Unified adapter for LLM calls across the forgeborn-core system
 * 
 * This adapter provides a standardized interface for all agents to access LLMs
 * through a central routing system with logging, error handling, and model normalization.
 */

import { routeLLM } from '../utils/llm_router.mjs';
import { graph } from '../agents/llmmanager/src/llmanager/index.mjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Unified interface for LLM calls across all agents
 * 
 * @param {Object} options - Call options
 * @param {string} options.prompt - The prompt to send
 * @param {string} [options.model='gpt-4o'] - Model to use
 * @param {string} [options.agentName] - Name of calling agent for tracing
 * @param {string} [options.task] - Task category (for specialized routing)
 * @returns {Promise<string>} - LLM response
 */
export async function callLLM({
  prompt,
  model = 'gpt-4o',
  agentName = 'unknown',
  task = null
}) {
  try {
    return await routeLLM({
      prompt,
      model,
      agentName,
      task
    });
  } catch (err) {
    console.error(`❌ [${agentName}] LLM call failed:`, err.message);
    throw err;
  }
}

/**
 * Legacy LangGraph-based LLM interface - maintained for backward compatibility
 * 
 * @param {string} taskType - The type of task (e.g. "planner", "evaluator")
 * @param {string} input - The LLM prompt or task description
 * @returns {Promise<any>} - The output of the graph execution
 */
export async function callLLMGraph(taskType, input) {
  try {
    console.warn('⚠️ Using legacy LangGraph interface - consider migrating to callLLM');
    
    const result = await graph.invoke({
      config: {
        input_type: taskType,
      },
      input,
    });

    return result;
  } catch (err) {
    console.error("❌ LLM call failed:", err.message);
    throw err;
  }
}

/**
 * Legacy adapter function for builder_agent_v1 and other modules
 * that call LLM through a simplified interface
 * 
 * @param {Object} params - Parameters with prompt and model
 * @returns {Promise<string>} - LLM response
 */
export async function callLLMAdapter({ prompt, model, agent = 'legacy' }) {
  const callerInfo = new Error().stack
    .split('\n')[2]
    .trim()
    .match(/(?:at\s+)?(?:.*\s+\()?([^()]+)(?:\))?$/)?.[1] || 'unknown';
  
  // Extract agent name from caller path if possible
  let agentName = agent;
  if (agent === 'legacy') {
    const agentMatch = callerInfo.match(/agents\/([^/]+)/);
    if (agentMatch && agentMatch[1]) {
      agentName = agentMatch[1];
    }
  }
  
  return callLLM({
    prompt,
    model: model || 'gpt-4o',
    agentName
  });
}
