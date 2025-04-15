#!/usr/bin/env node

const [,, command, arg] = process.argv;

console.log("🚀 Forgeborn CLI is active!");

if (command === "run") {
  if (!arg) {
    console.error("❌ Please specify an agent name to run.");
    process.exit(1);
  }

  const runnerPath = `../agents/${arg}/run_${arg}.mjs`;

  import(runnerPath)
    .then(() => {
      console.log(`✅ Agent '${arg}' executed successfully.`);
    })
    .catch((err) => {
      console.error(`❌ Failed to run agent '${arg}':`, err.message);
      process.exit(1);
    });
} else {
  console.error("❌ Unknown command. Try: factory run <agent_name>");
  process.exit(1);
}
