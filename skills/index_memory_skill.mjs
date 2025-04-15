// index_memory_skill.mjs
import { memory_indexer_agent_v1_core } from '../agents/memory_indexer_agent_v1/memory_indexer_agent_v1_core.mjs';

export async function runSkill(config) {
  await memory_indexer_agent_v1_core();
}
