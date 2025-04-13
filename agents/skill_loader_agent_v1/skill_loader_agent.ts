import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("🧠 skill_loader_agent.ts loaded");

export class SkillLoaderAgent {
  goal: any;

  constructor(goal: any) {
    console.log("🧠 SkillLoaderAgent constructor called with:", goal);
    this.goal = goal;
  }

  matchSkills(): string {
    console.log("🧩 Matching skills to blueprint...");

    const [rcPath, registryPath] = this.goal.inputDocs;

    const rcYaml = readFileSync(rcPath, 'utf-8');
    const registryYaml = readFileSync(registryPath, 'utf-8');
    

    const outputPath = join(__dirname, '../../memory/skill_load_log.json');
    writeFileSync(outputPath, JSON.stringify({
      goal: this.goal.description,
      rcChars: rcYaml.length,
      registryChars: registryYaml.length,
      note: 'Simulated match for now.'
    }, null, 2));

    console.log("✅ Skill matching log written to:", outputPath);
    return outputPath;
  }
}
