import { routeLLM } from '../utils/llm_router.mjs';

/**
 * Unified interface for LLM calls across all agents
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
