// usage_analyzer_agent_v1_core.mjs
import fs from 'fs';
import yaml from 'js-yaml';

export const usage_analyzer_agent_v1_core = async () => {
  const indexPath = './memory/index_summary.yaml';
  if (!fs.existsSync(indexPath)) {
    console.error("❌ index_summary.yaml not found. Run memory indexer first.");
    return;
  }

  const indexRaw = fs.readFileSync(indexPath, 'utf-8');
  const index = yaml.load(indexRaw);
  const frequency = {};

  for (const entry of index.traces || []) {
    for (const agent of entry.agents || []) {
      frequency[agent] = (frequency[agent] || 0) + 1;
    }
  }

  const outFile = './memory/agent_usage_report.yaml';
  fs.writeFileSync(outFile, yaml.dump(frequency), 'utf-8');
  console.log(`📈 Agent usage report saved to ${outFile}`);
};
