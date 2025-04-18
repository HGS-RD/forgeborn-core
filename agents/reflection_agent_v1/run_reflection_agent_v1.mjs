
import { ReflectionAgent } from "./reflection_agent_v1_core.mjs";

const goal = "Self-reflect on execution trace";
const logPath = "./logs/trace_logs/";

async function main() {
  const agent = new ReflectionAgent(goal, logPath);
  const result = await agent.run();
  console.log("✅ Reflection Insight:", result);
}

main().catch(console.error);
