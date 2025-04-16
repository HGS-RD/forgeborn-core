// skills/reflection_summary_skill.mjs
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export async function runSkill(config) {
  try {
    const memoryDir = path.resolve('./memory');
    const traceFiles = fs.readdirSync(memoryDir)
      .filter(f => f.startsWith('execution_trace_') && f.endsWith('.yaml'))
      .map(f => f.trim());

    const usageReportPath = path.join(memoryDir, 'agent_usage_report.yaml');

    const summary = {
      analyzed_files: traceFiles,
      agent_usage: []
    };

    if (fs.existsSync(usageReportPath)) {
      const usageData = yaml.load(fs.readFileSync(usageReportPath, 'utf-8'));
      summary.agent_usage = usageData.agents || [];
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const outTimestamped = path.join(memoryDir, `reflection_summary_${timestamp}.yaml`);
    const outLatest = path.join(memoryDir, 'reflection_summary.yaml');

    fs.writeFileSync(outTimestamped, yaml.dump(summary), 'utf-8');
    fs.writeFileSync(outLatest, yaml.dump(summary), 'utf-8');

    console.log(`📘 Reflection summary saved to ${outTimestamped}`);
  } catch (err) {
    console.error("❌ Error in reflection_summary_skill:", err.message);
  }
}

// ✅ Named export for agent imports
export const reflection_summary_skill = runSkill;
