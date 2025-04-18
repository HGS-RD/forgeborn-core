import { exec } from 'child_process';
import { promisify } from 'util';
const execAsync = promisify(exec);

async function run(command) {
  console.log(`🔧 Running: ${command}`);
  const { stdout, stderr } = await execAsync(command);
  if (stdout) console.log(stdout);
  if (stderr) console.error(stderr);
}

await run("node agents/self_optimizer_agent_v1/run_self_optimizer_agent_v1.mjs");
await run("node agents/governance_observer_agent_v1/run_governance_observer_agent_v1.mjs");

console.log("✅ Self-optimization and governance check complete.");
