// Copyright (c) 2025 Hillstrong Group Security. All rights reserved.
// Use of this source code is governed by the custom license found in the LICENSE file.

import { selectBestModel } from "./selector/llm_selector.ts";
import { callModel } from "./utils/api_client.ts";

export async function runLLMAdapter(task: string) {
  console.log(`🚀 Launching llm_adapter_v1...`);
  console.log(`🔍 Selecting model for task: "${task}"`);

  const selection = selectBestModel(task);

  if (!selection) {
    throw new Error(`❌ No suitable model found for task: ${task}`);
  }

  console.log(`✅ Selected: Provider = ${selection.provider}, Model = ${selection.name}`);

  const result = await callModel(selection, task);

  console.log(`🧠 LLM Response:\n${result}`);
  return result;
}
