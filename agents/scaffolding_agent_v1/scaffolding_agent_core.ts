import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { writeScaffold } from './writer/scaffold_writer.ts';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function runScaffoldingAgent(): Promise<void> {
  const planPath = path.resolve(__dirname, '../../blueprints/builder_agent_plan.yaml');
  const raw = fs.readFileSync(planPath, 'utf-8');
  const plan = yaml.load(raw) as any;

  // 🔧 Ensure the target path is inside agents folder
  const targetDir = path.resolve(__dirname, '../builder_agent_v1');
  const files = [];

  for (const module of plan.modules || []) {
    const filePath = path.join(targetDir, module.path);
    const content = `// ${module.description}\n\nexport async function ${module.stub}() {}\n`;
    files.push({ path: filePath, content });
  }

  await writeScaffold(files);
  console.log('✅ Scaffolding complete.');
}
