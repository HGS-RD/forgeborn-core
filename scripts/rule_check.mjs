#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AGENTS_DIR = path.resolve(__dirname, '../agents');
const args = process.argv.slice(2);
const fix = args.includes('--fix');

const errors = [];
const fixed = [];

const allowedExtensions = ['.mjs', '.md', '.json', '.sh', '.yaml', '.yml'];
const allowedFiles = ['package.json', 'package-lock.json', 'tsconfig.json', 'README.md', 'planning_results.yaml'];
const allowedDirs = [
  'specs', 'config', 'utils', 'heuristics', 'strategies', 'test', 'docs', 'ci',
  'provision', 'adapters', 'selector', 'writer', 'blueprints', 'skills'
];
const ignoreFolders = ['node_modules', '.DS_Store', '.bin', '.package-lock.json'];

const createStub = (filePath, content) => {
  fs.writeFileSync(filePath, content);
  fixed.push(`🛠️ Created stub: ${filePath}`);
};

// Agent directory rule checks
fs.readdirSync(AGENTS_DIR).forEach(agent => {
  const agentPath = path.join(AGENTS_DIR, agent);
  if (!fs.statSync(agentPath).isDirectory()) return;
  if (ignoreFolders.includes(agent)) return;

  const files = fs.readdirSync(agentPath);
  const hasCore = files.includes(`${agent}_core.mjs`);
  const hasRunner = files.includes(`run_${agent}.mjs`);

  if (!hasCore) {
    const stubPath = path.join(agentPath, `${agent}_core.mjs`);
    if (fix) {
      createStub(stubPath, `export const ${agent}_core = () => {\n  console.log('${agent} core logic not yet implemented.');\n};`);
    } else {
      errors.push(`❌ Missing core file: ${agent}/${agent}_core.mjs`);
    }
  }

  if (!hasRunner) {
    const stubPath = path.join(agentPath, `run_${agent}.mjs`);
    if (fix) {
      createStub(stubPath, `import { ${agent}_core } from './${agent}_core.mjs';\n\nconsole.log('Running ${agent}...');\n${agent}_core();`);
    } else {
      errors.push(`❌ Missing runner file: ${agent}/run_${agent}.mjs`);
    }
  }

  for (const file of files) {
    const fullPath = path.join(agentPath, file);

    if (fs.statSync(fullPath).isDirectory()) {
      if (!allowedDirs.includes(file) && !ignoreFolders.includes(file)) {
        errors.push(`❌ Unsupported folder: ${agent}/${file}`);
      }
      continue;
    }

    const ext = path.extname(file);
    const isAllowed = allowedExtensions.includes(ext) || allowedFiles.includes(file);
    if (!isAllowed && !ignoreFolders.includes(file)) {
      if (fix && ext === '.ts') {
        const newName = file.replace(/\.ts$/, '.mjs');
        const newPath = path.join(agentPath, newName);
        fs.renameSync(fullPath, newPath);
        fixed.push(`🛠️ Renamed: ${file} -> ${newName}`);
      } else {
        errors.push(`❌ Invalid file in ${agent}/${file}`);
      }
    }
  }
});

// Ghost path checker for deleted folders that might be stale
const ghostPaths = [
  'llmmanager/.env',
  'llmmanager/.env.example',
  'llmmanager/.gitignore',
  'llmmanager/agents',
  'llmmanager/src',
  'llmmanager/dist'
];

ghostPaths.forEach(p => {
  const absPath = path.resolve(__dirname, '..', p);
  if (fs.existsSync(absPath)) {
    errors.push(`❌ Invalid file or folder: ${p}`);
  }
});

// Final output
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
