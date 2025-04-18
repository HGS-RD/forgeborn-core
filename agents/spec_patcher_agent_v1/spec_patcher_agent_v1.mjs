import { loadGovernanceViolations } from '../../skills/load_governance_violations.mjs';
import { generateMinimalSpec } from '../../skills/generate_minimal_spec.mjs';
import fs from 'fs/promises';

export async function patchMissingSpecs() {
  const violations = await loadGovernanceViolations();
  const patchLog = [];

  for (const v of violations) {
    if (v.issue === "Missing spec file") {
      const agent = v.agent;
      const specPath = `agents/${agent}/spec_${agent}.md`;
      await generateMinimalSpec(agent, specPath);
      patchLog.push({ agent, specPath, status: "created" });
    }
  }

  await fs.writeFile("logs/spec_patch_log.json", JSON.stringify(patchLog, null, 2));
  console.log(`✅ Spec patching complete. Specs created: ${patchLog.length}`);
}
