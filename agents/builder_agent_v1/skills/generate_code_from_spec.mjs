// Skill: generate_code_from_spec
import { callLLMAdapter } from './use_llm_adapter.mjs';
export async function generateCodeFromSpec(context) {
  const prompt = `Write a .mjs skill that validates a Supabase API key against a known key.`;
  const response = await callLLMAdapter({ model: "claude-3", prompt });
  return response;
}
