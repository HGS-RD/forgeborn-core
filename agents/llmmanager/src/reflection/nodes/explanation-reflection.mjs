// File: /agents/llmmanager/src/reflection/nodes/explanation-reflection.mjs

import { ChatAnthropic } from "@langchain/anthropic";
import { getReflections } from "../../stores/reflection.mjs";

/**
 * LangGraph node to generate a reflection summary for incorrect explanations.
 * @param {object} state - ReflectionState object with explanation correction context
 * @param {object} config - LangGraphRunnableConfig with store and assistant ID
 * @returns {Promise<object>} - ReflectionUpdate with reflectionsSummary
 */
async function explanationReflection(state, config) {
  const reflections = await getReflections(
    config.store,
    config.configurable?.assistant_id,
  );

  const prompt = buildPrompt({
    explanation: state.originalAnswer.explanation,
    correctedExplanation: state.editedAnswer.explanation,
    reasoning: state.generatedReasoning,
    reflections,
  });

  const model = new ChatAnthropic({
    model: "claude-3-7-sonnet-latest",
    maxTokens: 4000,
  });

  const response = await model.invoke([
    {
      role: "human",
      content: prompt,
    },
  ]);

  return {
    reflectionsSummary: response.content,
  };
}

function buildPrompt({ explanation, correctedExplanation, reasoning, reflections }) {
  return EXPLANATION_REFLECTION_PROMPT
    .replace("{EXPLANATION}", explanation)
    .replace("{CORRECTED_EXPLANATION}", correctedExplanation)
    .replace("{REASONING}", reasoning)
    .replace(
      "{REFLECTIONS}",
      reflections.map((r) => `- ${r}`).join("\n"),
    );
}

const EXPLANATION_REFLECTION_PROMPT = `You're an advanced AI tasked with reflecting on a situation where your explanation was incorrect, even though your final answer was correct.

You’ll be provided:
- Your original (incorrect) explanation
- The human-corrected explanation
- Your original reasoning
- A list of previous reflections

<reflection-context>
Incorrect Explanation: {EXPLANATION}
Corrected Explanation: {CORRECTED_EXPLANATION}
Original Reasoning: {REASONING}
Previous Reflections:
{REFLECTIONS}
</reflection-context>

Your job is to deeply think through:
1. Where your explanation failed.
2. Why your reasoning didn’t translate into an accurate explanation.
3. What actionable lessons or insights should guide future explanations.

Your answer should be a single concise summary of these new reflections (not individual items). No need for verbose wording—just clarity and insight.`;

export { explanationReflection };
