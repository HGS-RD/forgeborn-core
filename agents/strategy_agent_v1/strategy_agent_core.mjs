import { routeLLM } from '../../llm_router/llm_router.mjs';
import { logLLMCall } from './skills/log_llm_call.mjs';

export async function generateStrategy(rcId) {
  const prompt = `Analyze RC7–RC9 and propose an optimized RC10 blueprint.`;
  const output = await routeLLM({ task: "reflection", model: "gemini", prompt });
  await logLLMCall({ rc_id: rcId, model: "gemini", task: "rc_strategy", result: output });
  console.log("🧠 Strategy:", output);
}
