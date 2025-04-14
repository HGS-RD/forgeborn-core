// cycle_memory_v1.ts
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("🧠 cycle_memory_v1.ts loaded");

export interface Goal {
  description: string;
  inputDocs: string[];
}

export class CycleMemoryAgent {
  goal: Goal;

  constructor(goal: Goal) {
    console.log("🧠 CycleMemoryAgent constructor called with:", goal);
    this.goal = goal;
  }

  async analyzeCycles(): Promise<string> {
    console.log("🔍 Starting cycle memory analysis...");

    const [registryPath, memoryPath] = this.goal.inputDocs;

    const registryText = readFileSync(registryPath, 'utf-8');
    const memoryText = readFileSync(memoryPath, 'utf-8');

    const registry = JSON.parse(registryText);
    const memoryData = JSON.parse(memoryText);

    const memoryChunks = memoryData.memoryChunks || [];
    if (!Array.isArray(memoryChunks)) {
      throw new Error("Expected memoryChunks to be an array.");
    }

    const lastGoal = registry.goal;
    const duplicateChunk = memoryChunks.find(chunk =>
      chunk.text && chunk.text.includes(lastGoal)
    );

    let recommendation: string;

    if (duplicateChunk) {
      recommendation = `⚠️ Detected duplicate goal in chunk ${duplicateChunk.id}. Consider revising or skipping this agent.`;
    } else {
      recommendation = `✅ No duplication detected. Proceed as planned.`;
    }

    const output = {
      registryGoal: lastGoal,
      recommendation,
      timestamp: new Date().toISOString()
    };

    const outputPath = join(__dirname, '../../logs/cycle_memory_log.json');
    writeFileSync(outputPath, JSON.stringify(output, null, 2));

    console.log("✅ Cycle memory analysis written to:", outputPath);
    return outputPath;
  }
}
