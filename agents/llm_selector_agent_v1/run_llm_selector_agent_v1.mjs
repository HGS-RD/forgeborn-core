
import { LLMSelectorAgent } from "./llm_selector_agent_v1_core.mjs";

async function main() {
  const agent = new LLMSelectorAgent("codegen");
  const model = await agent.selectTopModel();
  console.log("🏆 Selected model:", model);
}

main().catch(console.error);
