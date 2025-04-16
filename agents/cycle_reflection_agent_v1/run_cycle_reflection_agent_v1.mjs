// agents/cycle_reflection_agent_v1/run_cycle_reflection_agent_v1.mjs
import { reflection_summary_skill } from '../../skills/reflection_summary_skill.mjs';

console.log("Running cycle_reflection_agent_v1...");
console.log("🪞 cycle_reflection_agent_v1 is starting reflection...");
await reflection_summary_skill();
console.log("✅ Reflection completed.");
