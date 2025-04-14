import { readFileSync, readdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("🧠 meta_orchestrator_v1.ts loaded");

export class MetaOrchestratorAgent {
  goal: any;

  constructor(goal: any) {
    console.log("🧠 MetaOrchestratorAgent constructor called with:", goal);
    this.goal = goal;
  }

  analyze(): string {
    const blueprintPath = join(__dirname, '../../blueprints/factory_generated_rc.yaml');
    const memoryDir = join(__dirname, '../../memory/chunks');
    const docsPath = join(__dirname, '../../docs/generated_plan_docs.md');

    const blueprint = readFileSync(blueprintPath, 'utf-8');
    const docs = readFileSync(docsPath, 'utf-8');
    const memoryFiles = readdirSync(memoryDir).length;

    const output = {
      blueprintSummary: `Loaded ${blueprint.length} characters.`,
      memoryChunks: memoryFiles,
      docSummary: `Loaded ${docs.length} characters.`,
      recommendation: "Next agent should be a `memory_governor_v1` to manage long-term memory across planning cycles."
    };

    const outPath = join(__dirname, '../../logs/orchestration_log.json');
    writeFileSync(outPath, JSON.stringify(output, null, 2));
    console.log("✅ Orchestration log written to:", outPath);
    return outPath;
  }
}
