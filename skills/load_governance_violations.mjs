import fs from 'fs/promises';
import yaml from 'yaml';

export async function loadGovernanceViolations() {
  const yamlStr = await fs.readFile('logs/governance_summary.yaml', 'utf8');
  const parsed = yaml.parse(yamlStr);
  return parsed.issues || [];
}
