import { DeployExecutorAgent } from "./deploy_executor_agent_v1_core.mjs";

const targetEnv = process.argv[2] || "production";

async function main() {
  const agent = new DeployExecutorAgent(targetEnv);
  await agent.execute();
}

main().catch(console.error);
