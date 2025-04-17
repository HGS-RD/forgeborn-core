import { graph } from "../agents/llmmanager/src/llmanager/index.mjs";
import { supabaseStore } from "../agents/llmmanager/src/utils/supabase-client.mjs"; // ✅ make sure this exists
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
      store: supabaseStore, // ✅ uses your connected Supabase backend
      configurable: {
        assistant_id: "factory-observability", // 🔁 tweak per use case
        modelId: "anthropic/claude-3-7-sonnet-latest",
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
