// Full Path: /Users/rogerhill/Documents/GitHub/forgeborn-core/cli_commands/call_llm.mjs

import { graph } from "/Users/rogerhill/Documents/GitHub/forgeborn-core/agents/llmmanager/src/llmanager/index.mjs";
import { supabaseStore } from "/Users/rogerhill/Documents/GitHub/forgeborn-core/agents/llmmanager/src/utils/supabase-client.mjs";
import readline from "readline";

const [, , taskType, ...promptParts] = process.argv;
const prompt = promptParts.join(" ");

if (!taskType || !prompt) {
  console.error("❌ Unknown command or missing goal string.");
  process.exit(1);
}

console.log(`🧠 Calling model for: ${taskType}`);
console.log(`💬 Prompt: ${prompt}`);

try {
  const result = await graph.invoke(
    { query: prompt },
    {
      store: supabaseStore,
      configurable: {
        assistant_id: "factory-observability",
        modelId: "openai/gpt-4o",               // ✅ Updated model
        modelProvider: "openai",                // ✅ Required for LangGraph routing
        approvalCriteria: "Supports proactive downtime mitigation.",
        rejectionCriteria: "Reactive-only, non-correlated approaches.",
      },
    }
  );

  console.log("\n✅ Final Result:");
  console.dir(result, { depth: 10, colors: true });
} catch (err) {
  console.error("❌ LLM call failed:", err.message || err);
}
