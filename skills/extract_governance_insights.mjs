import fs from 'fs/promises';

export async function extractGovernanceInsights() {
  const issues = [];

  // Example rule: every agent must have a spec file
  const agentDirs = await fs.readdir('./agents');
  for (const dir of agentDirs) {
    if (dir.endsWith('_agent_v1')) {
      const specPath = `./agents/${dir}/spec_${dir}.md`;
      try {
        await fs.access(specPath);
      } catch {
        issues.push({ agent: dir, issue: "Missing spec file" });
      }
    }
  }

  await fs.writeFile('./logs/governance_trace_log.json', JSON.stringify(issues, null, 2));
  return issues;
}
