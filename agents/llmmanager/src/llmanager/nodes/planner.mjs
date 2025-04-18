// File: /Users/rogerhill/Documents/GitHub/forgeborn-core/agents/llmmanager/src/llmanager/nodes/planner.mjs

import { callLLM } from "../../../../../adapters/llm_adapter.mjs";
import { buildContext, formatContextPrompt } from "../../utils/build-context.mjs";

/**
 * Planner Node — Generates a draft plan or response using GPT-4o (OpenAI).
 *
 * @param {object} state
 * @param {object} config
 * @returns {Promise<object>} new state with answer, generatedReasoning, and updated context
 */
export async function planner(state, config) {
  const context = await buildContext(state.query, {
    store: config.store,
    assistantId: config.configurable?.assistant_id,
  });

  const contextPrompt = formatContextPrompt({
    fewShotExamples: context.fewShotExamples ?? [],
    reflections: context.reflections ?? [],
    approvalCriteria: config.configurable?.approvalCriteria,
    rejectionCriteria: config.configurable?.rejectionCriteria,
  });

  const systemPrompt = `You are an expert planner. Analyze the user query and generate a high-quality, risk-based roadmap or plan.

${contextPrompt}

<query>
${state.query}
</query>

<instructions>
- Use prior examples and reflections when applicable.
- Output a clear explanation and an approved/rejected decision.
- Avoid fluff or generic content.
</instructions>`;

  const response = await callLLM({
    prompt: systemPrompt,
    model: config.configurable?.modelId ?? "gpt-4o",
    agentName: "llmmanager_planner",
    task: "planning"
  });

  return {
    ...state,
    generatedReasoning: response,
    answer: {
      status: "approved",
      explanation: response,
    },
  };
}
