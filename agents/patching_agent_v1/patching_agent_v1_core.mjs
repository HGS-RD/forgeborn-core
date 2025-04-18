import fs from 'fs/promises';
import path from 'path';
import { generatePatchFromInsight } from '../../skills/patch_generator_skill.mjs';

export class PatchingAgent {
  constructor(insightPath = 'logs/self_optimizer/insights_latest.json') {
    this.insightPath = insightPath;
  }

  async run() {
    console.log("🩹 [PatchingAgent] Running patch cycle...");
    try {
      const insightRaw = await fs.readFile(this.insightPath, 'utf-8');
      const insight = JSON.parse(insightRaw);
      const patch = await generatePatchFromInsight(insight);

      const patchLogPath = path.join('logs/patches', `patch_${Date.now()}.diff`);
      await fs.mkdir('logs/patches', { recursive: true });
      await fs.writeFile(patchLogPath, patch);

      console.log(`✅ Patch generated and saved: ${patchLogPath}`);
    } catch (err) {
      console.error("❌ [PatchingAgent] Failed:", err.message);
    }
  }
}
