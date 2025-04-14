import { runLLMAdapter } from "./llm_adapter_core.ts";

const task = "code generation";
runLLMAdapter(task).catch((err) => {
  console.error("❌ LLM Adapter failed:", err);
});
