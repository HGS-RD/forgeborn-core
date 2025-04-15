#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const AGENTS_DIR = path.resolve(__dirname, '../agents');
const allowedExtensions = ['.mjs', '.md'];
const requiredExtensions = ['.mjs'];
const args = process.argv.slice(2);
const fix = args.includes('--fix');
const errors = [];
const fixed = [];

const createStub = (filePath, content) => {
  fs.writeFileSync(filePath, content);
  fixed.push(`🛠️ Created stub: ${filePath}`);
};

fs.readdirSync(AGENTS_DIR).forEach(agent => {
  const agentPath = path.join(AGENTS_DIR, agent);
  if (!fs.statSync(agentPath).isDirectory()) return;

  const files = fs.readdirSync(agentPath);
  const hasCore = files.some(f => f === `${agent}_core.mjs`);
  const hasRunner = files.some(f => f === `run_${agent}.mjs`);

  if (!hasCore) {
    const stubPath = path.join(agentPath, `${agent}_core.mjs`);
    if (fix) {
      createStub(stubPath, `export const ${agent}_core = () => {
  console.log('${agent} core logic not yet implemented.');
};`);
    } else {
      errors.push(`❌ Missing core file: ${agent}/${agent}_core.mjs`);
    }
  }

  if (!hasRunner) {
    const stubPath = path.join(agentPath, `run_${agent}.mjs`);
    if (fix) {
      createStub(stubPath, `import { ${agent}_core } from './${agent}_core.mjs';

console.log('Running ${agent}...');
${agent}_core();`);
    } else {
      errors.push(`❌ Missing runner file: ${agent}/run_${agent}.mjs`);
    }
  }

  files.forEach(file => {
    const fullPath = path.join(agentPath, file);
    const ext = path.extname(file);

    if (!allowedExtensions.includes(ext)) {
      if (fix && ext === '.ts') {
        const newName = file.replace(/\.ts$/, '.mjs');
        const newPath = path.join(agentPath, newName);
        fs.renameSync(fullPath, newPath);
        fixed.push(`🛠️ Renamed: ${file} -> ${newName}`);
      } else {
        errors.push(`❌ Invalid extension in ${agent}/${file} — only .mjs is allowed`);
      }
    }
  });
});

if (fix && fixed.length) {
  console.log("🧹 Fix Report:");
  fixed.forEach(f => console.log(f));
  console.log(`✅ ${fixed.length} auto-fix action(s) completed.`);
}

if (!fix) {
  if (errors.length > 0) {
    console.log("🔍 Forgeborn Rule Compliance Report:");
    errors.forEach(e => console.log(e));
    console.log(`❌ ${errors.length} violation(s) found. Fix them before committing.`);
    process.exit(1);
  } else {
    console.log("✅ All agents comply with rules.md");
    process.exit(0);
  }
}
