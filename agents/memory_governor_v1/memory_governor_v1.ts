import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("🧠 memory_governor_v1.ts loaded");

export class MemoryGovernorAgent {
  goal: any;

  constructor(goal: any) {
    console.log("🧠 MemoryGovernorAgent constructor called with:", goal);
    this.goal = goal;
  }

  preserveImportantKnowledge(): string {
    console.log("📦 Gathering memory chunks...");
    const memoryDir = join(__dirname, '../../memory/chunks');
    const files = readdirSync(memoryDir);
    const docsPath = join(__dirname, '../../docs/generated_plan_docs.md');
    const rcDir = join(__dirname, '../../rcs');

    let docSummary = '';
    try {
      docSummary = readFileSync(docsPath, 'utf-8');
    } catch {
      console.warn("⚠️ No docs found.");
    }

    const memories = files.map((f) => {
      const content = readFileSync(join(memoryDir, f), 'utf-8');
      return { chunk: f, content };
    });

    const archived = {
      summary: `Preserved ${memories.length} memory chunks.`,
      docsLength: docSummary.length,
      timestamp: new Date().toISOString(),
      notes: 'This data would feed into long-term memory or embedding pipeline in the full system.'
    };

    const outputPath = join(__dirname, '../../memory/long_term_memory.json');
    writeFileSync(outputPath, JSON.stringify(archived, null, 2));
    console.log("✅ Long-term memory written to:", outputPath);
    return outputPath;
  }
}
