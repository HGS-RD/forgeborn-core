import { summarizeTrace } from './skills/summarize_trace_log.mjs';
import { generateInsights } from './skills/generate_reflection_insights.mjs';

export async function runReflectionAgent(ctx) {
  const summary = await summarizeTrace(ctx);
  const insights = await generateInsights(summary);
  return insights;
}
