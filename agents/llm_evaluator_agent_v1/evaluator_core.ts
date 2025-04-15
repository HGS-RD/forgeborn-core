// Copyright (c) 2025 Hillstrong Group Security. All rights reserved.
// Use of this source code is governed by the custom license found in the LICENSE file.

// evaluator_core.ts
import { invokeLLM } from "./utils/api_client.ts";
import { selectAllLLMsForTask } from "./utils/model_loader.ts";
import { logLLMEvent } from "../supabase_adapter_v1/supabase_logger.ts"; // ✅ Log to Supabase

interface LLMModel {
  name: string;
  provider: string;
}

interface LLMResult extends LLMModel {
  latency: number;
  output: string | null;
}
export async function evaluateModelsForTask(task: string): Promise<LLMModel> {
  console.log(`📊 Running LLM evaluation for task: ${task}`);

  const models: LLMModel[] = selectAllLLMsForTask(task);
  if (!models || models.length === 0) {
    throw new Error(`❌ No models found for task: ${task}`);
  }
  const prompt = `Write a concise TypeScript function to return the current timestamp.`;
  const evaluations: LLMResult[] = await Promise.all(
    models.map(async (model): Promise<LLMResult> => {
      const start = Date.now();
      try {
        const output = await invokeLLM(model.provider, model.name, { prompt });
        const latency = Date.now() - start;
        console.log(`✅ Model: ${model.name} (${model.provider}) responded in ${latency}ms`);

        await logLLMEvent({
          task,
          model: model.name,
          provider: model.provider,
          latency,
          status: "success",
          timestamp: new Date().toISOString(),
          output, // ✅ new
        });
        

        return { ...model, latency, output };
      } catch (err) {
        console.warn(`⚠️  Model failed: ${model.name} (${model.provider})`);

        // 🔴 Log failure to Supabase
        await logLLMEvent({
          task,
          model: model.name,
          provider: model.provider,
          latency: Infinity,
          status: "fail",
          timestamp: new Date().toISOString(),
        });

        return { ...model, latency: Infinity, output: null };
      }
    })
  );

  const best = evaluations.reduce((a, b) => (a.latency < b.latency ? a : b));
  console.log(`🏆 Best model for ${task} is: ${best.name} (${best.provider})`);
  await logLLMEvent({
    task,
    model: best.name,
    provider: best.provider,
    latency: best.latency,
    status: "success", // this is the winner
    timestamp: new Date().toISOString(),
    output: best.output ?? "", // ✅ fallback to empty string
  });
  

  return best;
}
