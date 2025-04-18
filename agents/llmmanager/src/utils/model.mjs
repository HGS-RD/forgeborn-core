// /Users/rogerhill/Documents/GitHub/forgeborn-core/agents/llmmanager/src/utils/model.mjs
import { initChatModel } from "langchain/chat_models/universal";

/**
 * Loads a chat model from the configuration object.
 * Defaults to `openai/gpt-4o`.
 *
 * @param {object} config - LangGraphRunnableConfig (must include modelId or default will be used)
 * @param {object} [modelConfig] - Optional model parameters
 * @returns {Promise<any>} - A chat model with .call() and .bindTools()
 */
export async function loadModelFromConfig(config, modelConfig = {}) {
  // ✅ Use gpt-4o as default now
  const modelId = config.configurable?.modelId ?? "openai/gpt-4o";

  const provider = modelId.split("/")[0];
  const modelName = modelId.split("/").slice(1).join("/");

  const model = await initChatModel(modelName, {
    ...modelConfig,
    modelProvider: provider,
  });

  if (typeof model.bindTools !== "function") {
    throw new Error("Model does not support binding tools");
  }

  return model;
}
