// adapters/llm_adapter.mjs

import path from 'path';
import { fileURLToPath } from 'url';
import { graph } from '../agents/llmmanager/src/llmanager/index.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Dynamically call your LangGraph-based LLM workflow.
 * @param {string} taskType - The type of task (e.g. "planner", "evaluator")
 * @param {string} input - The LLM prompt or task description
 * @returns {Promise<any>} - The output of the graph execution
 */
export async function callLLM(taskType, input) {
  try {
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
