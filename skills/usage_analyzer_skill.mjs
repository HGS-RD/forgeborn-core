// skills/usage_analyzer_skill.mjs
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export async function runSkill(config) {
  try {
    const memoryDir = path.resolve('./memory');
    console.log(`🔍 Looking in memory directory: ${memoryDir}`);

    const traceFiles = fs.readdirSync(memoryDir).filter(f => f.startsWith('execution_trace_') && f.endsWith('.yaml'));
    if (traceFiles.length === 0) {
      console.warn("⚠️ No execution trace found.");
      return;
    }

    console.log(`📁 Found trace files:`, traceFiles);
    const latestTraceFile = traceFiles.map(f => ({
      file: f,
      ts: fs.statSync(path.join(memoryDir, f)).mtime
    })).sort((a, b) => b.ts - a.ts)[0].file;

    const tracePath = path.join(memoryDir, latestTraceFile);
    console.log(`📂 Using latest trace: ${tracePath}`);

    const traceContent = fs.readFileSync(tracePath, 'utf-8');
    const trace = yaml.load(traceContent);
    console.log("📄 Raw trace object:", trace);

    let agents = [];
    if (Array.isArray(trace?.executed)) {
      agents = trace.executed;
      console.log("✅ Found agents in `executed` field");
    } else if (Array.isArray(trace?.agents_run)) {
      agents = trace.agents_run;
      console.log("✅ Found agents in `agents_run` field");
    } else {
      console.warn("⚠️ No recognizable agent list found in trace");
    }
    
    
    console.log(`🧠 Agents found in trace: ${agents.length}`);
    
    const summary = {
      timestamp: new Date().toISOString(),
      total_agents: agents.length,
      agents: agents.map(name => ({ name }))
    };
    

    const outPath = path.join(memoryDir, 'agent_usage_report.yaml');
    fs.writeFileSync(outPath, yaml.dump(summary), 'utf-8');

    console.log(`📈 Agent usage report written to: ${outPath}`);
  } catch (err) {
    console.error("❌ Error in usage_analyzer_skill:", err.message);
  }
}
