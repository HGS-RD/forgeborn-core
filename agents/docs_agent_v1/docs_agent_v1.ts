import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("🧠 docs_agent_v1.ts loaded");



export class DocsAgent {
  goal: any;

  constructor(goal: any) {
    console.log("🧠 DocsAgent constructor called with:", goal);
    this.goal = goal;
  }

  generateDocumentation(): string {
    console.log("📄 Reading memory chunks...");
    const memoryDir = join(__dirname, '../../memory/chunks');
    const files = readdirSync(memoryDir);

    const docs = files.map((file) => {
      const content = readFileSync(join(memoryDir, file), 'utf-8');
      return `## ${file.replace('.json', '')}\n${content}`;
    }).join('\n\n');

    const outputPath = join(__dirname, '../../docs/generated_plan_docs.md');
    writeFileSync(outputPath, `# 📘 Forged Plan Documentation\n\n${docs}`);
    console.log("✅ Documentation written to:", outputPath);
    return outputPath;
  }
}
