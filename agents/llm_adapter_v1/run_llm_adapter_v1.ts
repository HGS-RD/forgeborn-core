// Copyright (c) 2025 Hillstrong Group Security. All rights reserved.
// Use of this source code is governed by the custom license found in the LICENSE file.

import { runLLMAdapter } from "./llm_adapter_core.ts";

const task = "code generation";
runLLMAdapter(task).catch((err) => {
  console.error("❌ LLM Adapter failed:", err);
});
