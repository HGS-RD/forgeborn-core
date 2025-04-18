import fs from 'fs/promises';
import yaml from 'yaml';

export async function reportGovernanceSummary(issues) {
  const summary = {
    timestamp: new Date().toISOString(),
    issue_count: issues.length,
    issues
  };

  const yamlStr = yaml.stringify(summary);
  await fs.writeFile('./logs/governance_summary.yaml', yamlStr);
}
