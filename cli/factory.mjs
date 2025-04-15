// cli/factory.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const [, , command, arg] = process.argv;

console.log("🚀 Forgeborn CLI is active!");

// Handle: factory list
if (command === 'list') {
  const skillDir = path.resolve(__dirname, '../skills');
  if (!fs.existsSync(skillDir)) {
    console.log("❌ No skills directory found.");
    process.exit(1);
  }

  const skillFiles = fs.readdirSync(skillDir).filter(f => f.endsWith('.mjs'));
  if (!skillFiles.length) {
    console.log("⚠️ No skill files found in /skills/");
    process.exit(1);
  }

  console.log(`🧠 Registered Skills:\n`);
  skillFiles.forEach(file => {
    console.log(`  - ${path.basename(file, '.mjs')}`);
  });
  process.exit(0);
}

// Handle: factory skill <name>
if (command === 'skill' && arg) {
  const skillPath = path.resolve(__dirname, `../skills/${arg}.mjs`);
  if (!fs.existsSync(skillPath)) {
    console.error(`❌ Skill not found: ${arg}`);
    process.exit(1);
  }
  try {
    const mod = await import(skillPath);
    if (typeof mod.runSkill === 'function') {
      await mod.runSkill({ invokedBy: 'cli' });
    } else {
      console.error(`❌ ${arg}.mjs does not export runSkill()`);
    }
  } catch (err) {
    console.error(`❌ Error executing skill ${arg}:`, err.message);
  }
} else if (command !== 'skill') {
  console.log("Usage:");
  console.log("  factory skill <name>     Run a skill from /skills/");
  console.log("  factory list             Show all available skills");
}
