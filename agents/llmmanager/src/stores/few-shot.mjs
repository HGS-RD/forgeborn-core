import { v4 as uuidv4 } from "uuid";
import { BaseStore } from "@langchain/langgraph";
import { traceable } from "langsmith/traceable";

const FEW_SHOT_NAMESPACE = ["few-shot"];

/**
 * FewShotExample:
 * {
 *   input: string,
 *   answer: string,
 *   explanation: string
 * }
 */

/**
 * Search few-shot examples from the store.
 *
 * @param {BaseStore} store
 * @param {string} query
 * @param {string} assistantId
 * @param {object} [args] - Optional args (limit)
 * @returns {Promise<Array>}
 */
async function searchFewShotExamplesFunc(store, query, assistantId, args = {}) {
  if (!store) {
    throw new Error("Store not found");
  }
  if (!assistantId) {
    throw new Error(
      "No assistant ID found when attempting to search few shot examples."
    );
  }

  const results = await store.search([...FEW_SHOT_NAMESPACE, assistantId], {
    query,
    limit: args.limit,
  });

  return results.map((r) => r.value);
}

export const searchFewShotExamples = traceable(searchFewShotExamplesFunc, {
  name: "search-few-shot-examples",
});

/**
 * Add a few-shot example to the store.
 *
 * @param {BaseStore} store
 * @param {string} assistantId
 * @param {object} example - Must include input, answer, and explanation
 */
async function putFewShotExamplesFunc(store, assistantId, example) {
  if (!store) {
    throw new Error("Store not found");
  }
  if (!assistantId) {
    throw new Error(
      "No assistant ID found when attempting to put few shot examples."
    );
  }

  await store.put([...FEW_SHOT_NAMESPACE, assistantId], uuidv4(), example);
}

export const putFewShotExamples = traceable(putFewShotExamplesFunc, {
  name: "put-few-shot-examples",
});
