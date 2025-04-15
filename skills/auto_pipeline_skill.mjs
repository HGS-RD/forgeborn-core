// skills/auto_pipeline_skill.mjs
export async function runSkill(config) {
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
  await step("Orchestration", '../agents/meta_orchestrator_v2/run_meta_orchestrator_v2.mjs');
  await step("Validation", '../agents/coverage_validator_v1/run_coverage_validator_v1.mjs');
  await step("Memory Write", '../skills/memory_writer_skill.mjs');

  console.log("\n🧠 Auto pipeline complete. Memory, trace, and coverage updated.");
}
