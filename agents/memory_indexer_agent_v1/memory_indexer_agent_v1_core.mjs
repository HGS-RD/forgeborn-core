// memory_indexer_agent_v1_core.mjs
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

export const memory_indexer_agent_v1_core = async () => {
  const memDir = './memory';
  const output = { traces: [], planning: [] };

  if (!fs.existsSync(memDir)) {
    console.warn("⚠️ memory/ directory not found.");
    return;
  }

  const files = fs.readdirSync(memDir);
  const traceFiles = files.filter(f => f.startsWith('execution_trace_'));
  const planFiles = files.filter(f => f.startsWith('planning_log_'));

  for (const file of traceFiles) {
    const raw = fs.readFileSync(path.join(memDir, file), 'utf-8');
    try {
      const data = yaml.load(raw);
      output.traces.push({ file, agents: data.agents || [], date: data.timestamp || file });
    } catch (e) {}
  }

  for (const file of planFiles) {
    const raw = fs.readFileSync(path.join(memDir, file), 'utf-8');
    try {
      const data = yaml.load(raw);
      output.planning.push({ file, plan: data.plan || [] });
    } catch (e) {}
  }

  const outFile = path.join(memDir, 'index_summary.yaml');
  fs.writeFileSync(outFile, yaml.dump(output), 'utf-8');
  console.log(`📊 Memory index summary written to ${outFile}`);
};
