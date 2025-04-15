// skills/auto_pipeline_skill.mjs
export async function runSkill(config) {
  if (global.__auto_running) {
    console.log("⚠️ auto_pipeline_skill is already running. Skipping to prevent recursion.");
    return;
  }
  global.__auto_running = true;

  const step = async (label, path) => {
    console.log(`\n🔹 ${label}...`);
    try {
      await import(path);
      console.log(`✅ ${label} completed.`);
    } catch (err) {
      console.error(`❌ Failed at ${label}:`, err.message);
    }
  };

  console.log("\n🚀 Starting Auto Pipeline Skill");

  await step("Planning", '../agents/planning_agent_v1/run_planning_agent_v1.mjs');
  await step("Skill Loader", '../agents/skill_loader_agent_v1/skill_loader_agent_v1_core.mjs');
  await step("Blueprint Optimizer", '../agents/blueprint_optimizer_v1/run_blueprint_optimizer_v1.mjs');
  await step("Validation", '../agents/validator_agent_v1/run_validator_agent_v1.mjs');
  await step("Memory Write", '../skills/memory_writer_skill.mjs');
  await step("Memory Indexing", '../skills/index_memory_skill.mjs');
  await step("Usage Report", '../skills/usage_analyzer_skill.mjs');

  console.log("\n🧠 Auto pipeline complete. Memory, trace, coverage, and usage insights updated.");
}
