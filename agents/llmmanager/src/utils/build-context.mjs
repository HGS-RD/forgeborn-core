import { traceable } from "langsmith/traceable";
import { searchFewShotExamples } from "../stores/few-shot.mjs";
import { getReflections } from "../stores/reflection.mjs";

/**
 * Builds few-shot examples and past reflections to use in prompt context.
 *
 * @param {string} query
 * @param {object} inputs
 * @param {import("@langchain/langgraph").BaseStore | undefined} inputs.store
 * @param {string | undefined} inputs.assistantId
 * @returns {Promise<{ fewShotExamples: Array<any>, reflections: Array<string> }>}
 */
async function buildContextFunc(query, inputs) {
  const examples = await searchFewShotExamples(
    inputs.store,
    query,
    inputs.assistantId,
    { limit: 10 }
  );

  const reflections = await getReflections(inputs.store, inputs.assistantId);

  return {
    fewShotExamples: examples,
    reflections,
  };
}

export const buildContext = traceable(buildContextFunc, {
  name: "build-context",
});

/**
 * Formats context prompt from few-shot examples and reflection history.
 *
 * @param {object} opts
 * @param {Array<any>} opts.fewShotExamples
 * @param {Array<string>} opts.reflections
 * @param {string} [opts.approvalCriteria]
 * @param {string} [opts.rejectionCriteria]
 * @returns {string}
 */
export function formatContextPrompt({
  fewShotExamples,
  reflections,
  approvalCriteria,
  rejectionCriteria,
}) {
  const formattedFewShots = fewShotExamples
    .map(
      (ex, i) => `<example index="${i}">
  Request: ${ex.input}

  Explanation: ${ex.explanation}

  Final Answer: ${ex.answer}
</example>`
    )
    .join("\n\n");

  const formattedReflections = reflections.map((r) => `- ${r}`).join("\n");

  const formattedApprovalCriteria = approvalCriteria ?? "None provided.";
  const formattedRejectionCriteria = rejectionCriteria ?? "None provided.";

  return `<all-examples>\n${formattedFewShots}</all-examples>

<reflections>\n${formattedReflections}</reflections>

<approval-criteria>\n${formattedApprovalCriteria}</approval-criteria>

<rejection-criteria>\n${formattedRejectionCriteria}</rejection-criteria>`;
}
