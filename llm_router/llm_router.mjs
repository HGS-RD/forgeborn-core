import { callOpenAI } from './providers/openai.mjs';
import { callClaude } from './providers/claude.mjs';
import { callMistral } from './providers/mistral.mjs';
import { callGemini } from './providers/gemini.mjs';

export async function routeLLM({ task, model }) {
  switch (model || task) {
    case "claude":
    case "reflection":
      return await callClaude(task);
    case "mistral":
    case "draft":
      return await callMistral(task);
    case "gemini":
    case "summary":
      return await callGemini(task);
    default:
      return await callOpenAI(task);
  }
}
