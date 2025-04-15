// cli/factory.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const [, , command, arg] = process.argv;

console.log("🚀 Forgeborn CLI is active!");

const runNodeFile = async (relativePath) => {
  const fullPath = path.resolve(__dirname, '..', relativePath);
  if (!fs.existsSync(fullPath)) {
    console.log(`❌ File not found: ${relativePath}`);
    process.exit(1);
  }
  await import(fullPath);
};

// Built-in CLI modes
if (command === 'plan') {
  await runNodeFile('agents/planning_agent_v1/run_planning_agent_v1.mjs');
} else if (command === 'validate') {
  await runNodeFile('agents/validator_agent_v2/run_validator_agent_v2.mjs');
} else if (command === 'trace') {
  await runNodeFile('skills/trace_logger_skill.mjs');
} else if (command === 'check') {
  await runNodeFile('scripts/rule_check.mjs');
} else if (command === 'skill' && arg) {
  const skillPath = path.resolve(__dirname, `../skills/${arg}.mjs`);
  if (!fs.existsSync(skillPath)) {
    console.error(`❌ Skill not found: ${arg}`);
    process.exit(1);
  }
  const mod = await import(skillPath);
  if (typeof mod.runSkill === 'function') {
    await mod.runSkill({ invokedBy: 'cli' });
  } else {
    console.error(`❌ ${arg}.mjs does not export runSkill()`);
  }
} else if (command === 'list') {
  const skillDir = path.resolve(__dirname, '../skills');
  const skillFiles = fs.readdirSync(skillDir).filter(f => f.endsWith('.mjs'));
  console.log("🧠 Registered Skills:");
  skillFiles.forEach(f => console.log(`  - ${path.basename(f, '.mjs')}`));
} else {
  console.log("Usage:");
  console.log("  factory plan         # Run planning_agent_v1");
  console.log("  factory validate     # Run validator_agent_v2");
  console.log("  factory trace        # Run trace_logger_skill");
  console.log("  factory check        # Run rule_check.mjs");
  console.log("  factory skill <name> # Run a skill from /skills/");
  console.log("  factory list         # List all available skills");
}
