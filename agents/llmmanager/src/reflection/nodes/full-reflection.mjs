// File: agents/llmmanager/src/reflection/nodes/full-reflection.mjs

import { getReflections } from "../../stores/reflection.mjs";
import { callLLM } from "../../../../../adapters/llm_adapter.mjs";

/**
 * Builds a detailed reflection prompt to help the AI self-correct its reasoning.
 *
 * @param {object} inputs
 * @returns {string}
 */
function buildReflectionPrompt(inputs) {
  return FULL_REFLECTION_PROMPT.replace("{EXPLANATION}", inputs.explanation)
    .replace("{ANSWER}", inputs.answer)
    .replace("{CORRECTED_EXPLANATION}", inputs.correctedExplanation)
    .replace("{CORRECTED_ANSWER}", inputs.correctedAnswer)
    .replace(
      "{REFLECTIONS}",
      inputs.reflections.map((r) => `<reflection>${r}</reflection>`).join("")
    );
}

/**
 * LangGraph node to generate a summary of reflections after identifying an incorrect answer.
 *
 * @param {object} state - Should contain original and edited answers
 * @param {object} config - LangGraphRunnableConfig with store and assistant ID
 * @returns {Promise<object>} - Summary string of reflection insights
 */
export async function fullReflection(state, config) {
  const reflections = await getReflections(
    config.store,
    config.configurable?.assistant_id
  );

  const prompt = buildReflectionPrompt({
    explanation: state.originalAnswer.explanation,
    answer: state.originalAnswer.status,
    correctedExplanation: state.editedAnswer.explanation,
    correctedAnswer: state.editedAnswer.status,
    reflections: reflections,
  });

  const response = await callLLM({
    prompt,
    model: "gpt-4o",
    agentName: "llmmanager_reflection",
    task: "reflection"
  });

  return {
    reflectionsSummary: response,
  };
}

const FULL_REFLECTION_PROMPT = `You're an advanced AI assistant tasked with generating a summary of your reflection to an incorrect answer and explanation you provided.
A human manually reviewed the answer, and the explanation and determined they were both incorrect.

The answer and explanation are apart of a review process, where an employee submits a request for approval, and given some approval and rejection criteria, you determined whether to approve or reject the request.
Before coming to a final decision, you generated an explanation and reasoning behind your decision. A manual review has determined both of these were incorrect.

Here is your original (incorrect) answer and explanation:
<original-incorrect-response>
  <explanation>
    {EXPLANATION}
  </explanation>
  <answer>
    {ANSWER}
  </answer>
</original-incorrect-response>

And here is the human corrected answer, along with the human corrected explanation:
<corrected-response>
  <explanation>
    {CORRECTED_EXPLANATION}
  </explanation>
  <answer>
    {CORRECTED_ANSWER}
  </answer>
</corrected-response>

You've also been provided with reflections you generated in the past from incorrect responses. Here is the full list of reflections:
<all-reflections>
  {REFLECTIONS}
</all-reflections>

Your new task is to do the following:
1. Carefully examine your original (incorrect) answer and explanation.
2. Carefully examine the corrected answer and explanation.
3. Think deeply about where you went wrong, and how you can avoid making the same mistake in the future. Compare your explanation to the human corrected explanation to identify the root cause.
4. Generate clear, concise thinking into exactly where your thought process went wrong, and how you can avoid making the same mistake in the future.
5. Read the 'reflection-generation-rules' below for more details.

<reflection-generation-rules>
1. Reflections must be concise, and direct.
2. Reflections should never be duplicated. If the reflection you want to generate already exists in the 'all-reflections' section, do not generate it again.
3. Avoid generating multiple, similar reflections, as this will bloat the list, and can lead to confusion.
4. Reflections should be specific and actionable.
5. Reflections should be focused on the root cause of the error, as to prevent the same mistake from happening again.
6. Reflections should be written in the present tense, as they will be used to guide future decision-making.

You are not generating the exact reflections in this step, but rather a summary of your reflections to this error. In a future step you'll extract the specific reflections from this summary.
</reflection-generation-rules>

With all of this in mind, please generate a summary of new reflections on your mistake to assist with future decision-making. You do not need to be overly verbose, the less the better. Your main goal is to figure out exactly what went wrong, and how you can avoid making the same mistake in the future.
Think long and hard, go!`;
