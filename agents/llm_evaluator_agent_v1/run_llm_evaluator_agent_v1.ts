// Copyright (c) 2025 Hillstrong Group Security. All rights reserved.
// Use of this source code is governed by the custom license found in the LICENSE file.

// run_llm_evaluator_agent_v1.ts
import { evaluateModelsForTask } from './evaluator_core.ts';

const task = "code generation";

evaluateModelsForTask(task)
  .then((result) => {
    console.log(`🏁 Evaluation complete: Best model is ${result.name} from ${result.provider}`);
  })
  .catch((err) => {
    console.error("❌ Evaluation failed:", err);
  });
