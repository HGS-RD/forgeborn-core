export async function callModel(model: any, task: string): Promise<string> {
  // Placeholder to simulate LLM call
  return Promise.resolve(`Output from ${model.name} (${model.provider}) for task: "${task}"`);
}
