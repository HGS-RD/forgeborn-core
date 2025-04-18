import { extractGovernanceInsights } from '../../skills/extract_governance_insights.mjs';
import { reportGovernanceSummary } from '../../skills/report_governance_summary.mjs';

export async function observeGovernance() {
  console.log("🔍 Governance Observer Agent started.");

  const issues = await extractGovernanceInsights();
  await reportGovernanceSummary(issues);

  console.log("✅ Governance check complete. Issues found:", issues.length);
}
