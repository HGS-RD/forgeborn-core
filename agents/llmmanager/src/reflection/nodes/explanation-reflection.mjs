// File: agents/llmmanager/src/reflection/nodes/explanation-reflection.mjs

import { callLLM } from "../../../../../adapters/llm_adapter.mjs";

const EXPLANATION_REFLECTION_PROMPT = `You're an expert AI reviewing a previous decision. Analyze the explanation and determine if the logic was sound. If it wasn’t, briefly identify the flaw.`;

/**
 * LangGraph node to reflect on the explanation and generate a single sentence about what could improve.
 * 
 * @param {object} state
 * @param {object} config
 * @returns {Promise<object>} with `reflectionsSummary`
 */
export async function explanationReflection(state, config) {
  const prompt = `${EXPLANATION_REFLECTION_PROMPT}

<explanation>
${state.generatedReasoning}
</explanation>`;

  const response = await callLLM({
    prompt,
    model: config.configurable?.modelId ?? "gpt-4o",
    agentName: "llmmanager_explanation",
    task: "reflection"
  });

  return {
    reflectionsSummary: response,
  };
}
