// skills/auto_pipeline_skill.mjs
import { planning_agent_v1_core } from '../agents/planning_agent_v1/planning_agent_v1_core.mjs';
import { meta_orchestrator_v2_core } from '../agents/meta_orchestrator_v2/meta_orchestrator_v2_core.mjs';
import { skill_loader_agent_v1_core } from '../agents/skill_loader_agent_v1/skill_loader_agent_v1_core.mjs';
import { blueprint_optimizer_v1_core } from '../agents/blueprint_optimizer_v1/blueprint_optimizer_v1_core.mjs';
import { validator_agent_v1_core } from '../agents/validator_agent_v1/validator_agent_v1_core.mjs';

import { runSkill as traceLogger } from './trace_logger_skill.mjs';
import { runSkill as memoryWriter } from './memory_writer_skill.mjs';
import { runSkill as memoryIndexer } from './index_memory_skill.mjs';
import { runSkill as usageAnalyzer } from './usage_analyzer_skill.mjs';

export async function runSkill(config) {
  console.log('\n🚀 Starting Auto Pipeline Skill\n');

  // 1. Planning Phase
  console.log('🔹 Planning...');
  await planning_agent_v1_core();
  console.log('✅ Planning completed.\n');

  // 2. Orchestration Phase
  console.log('🔹 Skill Loader...');
  await skill_loader_agent_v1_core();
  console.log('✅ Skill Loader completed.\n');

  console.log('🔹 Blueprint Optimizer...');
  await blueprint_optimizer_v1_core();
  console.log('✅ Blueprint Optimizer completed.\n');

  console.log('🔹 Validation...');
  await validator_agent_v1_core();
  console.log('✅ Validation completed.\n');

  // 3. Memory & Trace
  console.log('🔹 Memory Write...');
  await memoryWriter({ invokedBy: 'auto_pipeline_skill' });
  console.log('✅ Memory Write completed.\n');

  console.log('🔹 Memory Indexing...');
  await memoryIndexer({ invokedBy: 'auto_pipeline_skill' });
  console.log('✅ Memory Indexing completed.\n');

  console.log('🔹 Execution Trace...');
  await traceLogger({
    invokedBy: 'auto_pipeline_skill',
    agents: [
      'skill_loader_agent_v1',
      'blueprint_optimizer_v1',
      'validator_agent_v1'
    ]
  });
  console.log('✅ Execution Trace written.\n');

  console.log('🔹 Usage Report...');
  await usageAnalyzer({ invokedBy: 'auto_pipeline_skill' });
  console.log('✅ Usage Report completed.\n');

  console.log('\n🧠 Auto pipeline complete. Memory, trace, coverage, and usage insights updated.');
}
