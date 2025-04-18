// agents/autodeploy_agent_v1/run_autodeploy_agent_v1.mjs
import { AutodeployAgent } from "./autodeploy_agent_v1_core.mjs";

const eventType = process.argv[2] || "release";

async function main() {
  const agent = new AutodeployAgent(eventType);
  const result = await agent.run();
  console.log("✅ Deployment Plan:", result);
}

main().catch(console.error);
