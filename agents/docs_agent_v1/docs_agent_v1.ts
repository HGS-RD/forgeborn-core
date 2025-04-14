import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'fs';
import { join, dirname, resolve } from 'path';
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
    try {
      console.log("📄 Reading memory chunks...");
      const memoryDir = join(__dirname, '../../memory/chunks');
      const files = readdirSync(memoryDir);

      const docs = files.map((file) => {
        const content = readFileSync(join(memoryDir, file), 'utf-8');
        return `## ${file.replace('.json', '')}\n${content}`;
      }).join('\n\n');

      // Determine output path
      const outputPath = this.goal.output
        ? resolve(this.goal.output)
        : join(__dirname, '../../docs/generated_plan_docs.md');

      const outputDir = dirname(outputPath);

      console.log("📁 Output path resolved to:", outputPath);
      console.log("📁 Output directory:", outputDir);

      // Ensure output directory exists
      if (!existsSync(outputDir)) {
        mkdirSync(outputDir, { recursive: true });
        console.log("📁 Created output directory:", outputDir);
      }

      writeFileSync(outputPath, `# 📘 Forged Plan Documentation\n\n${docs}`);
      console.log("✅ Documentation written to:", outputPath);
      return outputPath;

    } catch (err) {
      console.error("❌ Failed to generate documentation:", err);
      throw err;
    }
  }
}
