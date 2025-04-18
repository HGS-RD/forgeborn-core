import { CIValidatorAgent } from "./ci_validator_agent_v1_core.mjs";

const event = process.argv[2] || "push";

async function main() {
  const agent = new CIValidatorAgent();
  await agent.run(event);
}

main();