import { observeGovernance } from './governance_observer_agent_v1.mjs';

observeGovernance().catch(err => {
  console.error("❌ Governance Observer Agent error:", err);
});
