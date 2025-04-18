import { callOpenAI } from '../llm_router/providers/openai.mjs';
import { callClaude } from '../llm_router/providers/claude.mjs';
// import { callGemini } from '../llm_router/providers/gemini.mjs'; // Gemini temporarily disabled
import fs from 'fs/promises';
import path from 'path';
import 'dotenv/config';

const LOG_DIR = path.join(process.cwd(), 'logs', 'llm_traces');

export async function routeLLM({ prompt, model = 'gpt-4o', agentName = 'unknown', task }) {
  const normalizedModel = normalizeModelName(model);
  await logLLMCall({ prompt, model: normalizedModel, agentName, task });

  try {
    console.log(`🧠 [${agentName}] Routing to ${normalizedModel.provider}/${normalizedModel.model}`);
    let response;

    switch (normalizedModel.provider) {
      case "anthropic":
        response = await callClaude(prompt, normalizedModel.model);
        break;
      case "google":
        throw new Error('Gemini support is currently disabled — awaiting stable SDK and model access.');
      case "openai":
      default:
        response = await callOpenAI(prompt, normalizedModel.model || 'gpt-4o');
        break;
    }

    await logLLMCall({
      prompt,
      model: normalizedModel,
      agentName,
      task,
      status: 'complete',
      responseLength: response?.length || 0
    });

    return response;
  } catch (error) {
    console.error(`🔴 [${agentName}] LLM call failed: ${error.message}`);
    await logLLMCall({
      prompt,
      model: normalizedModel,
      agentName,
      task,
      error: error.message,
      status: 'error'
    });
    throw error;
  }
}

function normalizeModelName(model) {
  if (model.includes('/')) {
    const [provider, modelName] = model.split('/');
    return { provider, model: modelName };
  }

  switch (model) {
    case 'claude':
    case 'claude-3':
      return { provider: 'anthropic', model: 'claude-3-opus-20240229' };
    case 'claude-haiku':
      return { provider: 'anthropic', model: 'claude-3-haiku-20240307' };
    case 'claude-sonnet':
      return { provider: 'anthropic', model: 'claude-3-sonnet-20240229' };
    case 'gpt4':
    case 'gpt-4':
      return { provider: 'openai', model: 'gpt-4o' };
    case 'gpt-3.5':
    case 'gpt-3.5-turbo':
      return { provider: 'openai', model: 'gpt-3.5-turbo' };
    case 'mistral':
      throw new Error('Mistral support has been removed — model not available.');
    case 'gemini':
      throw new Error('Gemini support is currently disabled — model not available.');
    default:
      return { provider: 'openai', model };
  }
}

async function logLLMCall({ prompt, model, agentName, task, status = 'start', error = null, responseLength = 0 }) {
  try {
    await fs.mkdir(LOG_DIR, { recursive: true });

    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      agentName,
      model,
      task,
      promptLength: prompt?.length || 0,
      responseLength,
      status,
      error
    };

    const logId = `${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
    const filename = `${timestamp.replace(/[:.]/g, '-')}_${agentName}_${logId}.json`;

    if (status === 'start' || status === 'error') {
      await fs.writeFile(
        path.join(LOG_DIR, filename),
        JSON.stringify({
          ...logEntry,
          promptPreview: prompt?.substring(0, 200) + (prompt?.length > 200 ? '...' : '')
        }, null, 2)
      );
    }

    const consolidatedLog = path.join(LOG_DIR, 'llm_usage_summary.jsonl');
    await fs.appendFile(
      consolidatedLog,
      JSON.stringify(logEntry) + '\n'
    );

    return true;
  } catch (logError) {
    console.warn(`⚠️ Failed to log LLM call: ${logError.message}`);
    return false;
  }
}
