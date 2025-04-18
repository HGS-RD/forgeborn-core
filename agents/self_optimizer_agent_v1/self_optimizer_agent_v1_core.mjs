// /agents/self_optimizer_agent_v1/self_optimizer_agent_v1_core.mjs

import fs from 'fs/promises';
import path from 'path';

export class SelfOptimizerAgent {
  constructor(tracePath = 'logs/trace_logs/latest_trace.json') {
    this.tracePath = tracePath;
    this.outputPath = 'logs/self_optimizer/insights_latest.json';
  }

  async run() {
    console.log("🔧 Running self-optimizer logic...");

    try {
      const raw = await fs.readFile(this.tracePath, 'utf-8');
      const trace = JSON.parse(raw);

      const insight = this.analyze(trace);

      // Ensure output directory exists
      const dir = path.dirname(this.outputPath);
      await fs.mkdir(dir, { recursive: true });

      // Save insight
      await fs.writeFile(this.outputPath, JSON.stringify(insight, null, 2));
      console.log("✅ Insight written to:", this.outputPath);
    } catch (err) {
      console.error("❌ Optimizer failed:", err.message);
    }
  }

  analyze(trace) {
    const { agent, task, latency, errors, timestamp } = trace;

    const issues = [];
    if (latency > 10) issues.push("High latency");
    if (errors > 0) issues.push("Agent experiencing errors");

    return {
      agent,
      task,
      timestamp,
      score: 100 - latency - errors * 5,
      issues,
      recommendation:
        issues.length > 0
          ? "Review agent implementation or adjust LLM selection."
          : "Agent is operating within optimal parameters."
    };
  }
}
