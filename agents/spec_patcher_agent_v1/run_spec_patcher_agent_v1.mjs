import { patchMissingSpecs } from './spec_patcher_agent_v1.mjs';

patchMissingSpecs().catch(err => {
  console.error("❌ Error patching specs:", err);
});
