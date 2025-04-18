// File: agents/llmmanager/src/utils/build-context.mjs

import { traceable } from "langsmith/traceable";
import { searchFewShotExamples } from "../stores/few-shot.mjs";
import { getReflections } from "../stores/reflection.mjs";

/**
 * Builds few-shot examples and past reflections to use in prompt context.
 */
async function buildContextFunc(query, inputs) {
  let examples = [];
  let reflections = [];

  try {
    examples = await searchFewShotExamples(inputs.store, query, inputs.assistantId, {
      limit: 10,
    });
  } catch (e) {
    console.warn("⚠️ Failed to fetch few-shot examples, falling back to []");
  }

  try {
    reflections = await getReflections(inputs.store, inputs.assistantId);
  } catch (e) {
    console.warn("⚠️ Failed to fetch reflections, falling back to []");
  }

  return {
    fewShotExamples: examples ?? [],
    reflections: reflections ?? [],
  };
}

export const buildContext = traceable(buildContextFunc, {
  name: "build-context",
});

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
