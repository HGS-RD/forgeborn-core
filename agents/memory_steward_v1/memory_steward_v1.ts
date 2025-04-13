import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("🧠 memory_steward_v1.ts loaded");

export class MemoryStewardAgent {
  goal: any;

  constructor(goal: any) {
    console.log("🧠 MemoryStewardAgent constructor called with:", goal);
    this.goal = goal;
  }

  chunkMemory(): string {
    const rcPath = join(__dirname, '../../rcs/rc_forgeborn_core_v1_plan.md');
    const evalPath = join(__dirname, '../../memory/evaluator_score.json');
    const memoryDir = join(__dirname, '../../memory/chunks');

    if (!existsSync(memoryDir)) {
      mkdirSync(memoryDir, { recursive: true });
    }

    const rcContent = readFileSync(rcPath, 'utf-8');
    const score = JSON.parse(readFileSync(evalPath, 'utf-8'));

    const chunks = rcContent.split('\n').filter(line => line.trim() !== '');

    chunks.forEach((chunk, idx) => {
      const filePath = join(memoryDir, `chunk_${idx + 1}.json`);
      writeFileSync(filePath, JSON.stringify({
        id: idx + 1,
        text: chunk,
        source: 'rc_forgeborn_core_v1_plan.md',
        trust: score.score
      }, null, 2));
    });

    console.log(`✅ Memory chunked into ${chunks.length} files.`);
    return memoryDir;
  }
}
