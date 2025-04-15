// usage_analyzer_skill.mjs
import { usage_analyzer_agent_v1_core } from '../agents/usage_analyzer_agent_v1/usage_analyzer_agent_v1_core.mjs';

export async function runSkill(config) {
  await usage_analyzer_agent_v1_core();
}
