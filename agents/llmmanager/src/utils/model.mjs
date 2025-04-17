import { initChatModel } from "langchain/chat_models/universal";

/**
 * Loads a chat model from the configuration object.
 * Defaults to `anthropic/claude-3-7-sonnet-latest`.
 *
 * @param {object} config - LangGraphRunnableConfig (must include modelId or default will be used)
 * @param {object} [modelConfig] - Optional model parameters
 * @returns {Promise<any>} - A chat model with .call() and .bindTools()
 */
export async function loadModelFromConfig(config, modelConfig = {}) {
  const modelId =
    config.configurable?.modelId ?? "anthropic/claude-3-7-sonnet-latest";

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
