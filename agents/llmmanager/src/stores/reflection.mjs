import { v4 as uuidv4 } from "uuid";
import { traceable } from "langsmith/traceable";

/**
 * @param {any} store
 * @param {string} assistantId
 * @returns {Promise<string[]>}
 */
async function getReflectionsFunc(store, assistantId) {
  if (!store) throw new Error("Store not found");
  if (!assistantId) {
    throw new Error("No assistant ID provided for getReflections.");
  }

  const results = await store.search(["reflections", assistantId], {
    limit: 100,
  });

  return results.map((r) => r.value);
}

export const getReflections = traceable(getReflectionsFunc, {
  name: "get-reflections",
});

/**
 * @param {any} store
 * @param {string} assistantId
 * @param {string[]} reflections
 * @returns {Promise<void>}
 */
async function putReflectionsFunc(store, assistantId, reflections) {
  if (!store) throw new Error("Store not found");
  if (!assistantId) {
    throw new Error("No assistant ID provided for putReflections.");
  }

  const promises = reflections.map((reflection) => {
    return store.put(["reflections", assistantId], uuidv4(), reflection);
  });

  await Promise.all(promises);
}

export const putReflections = traceable(putReflectionsFunc, {
  name: "put-reflections",
});
