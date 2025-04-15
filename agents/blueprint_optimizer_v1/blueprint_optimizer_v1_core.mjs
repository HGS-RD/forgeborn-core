// Core logic for blueprint_optimizer_v1
import fs from 'fs';
import path from 'path';

export const blueprint_optimizer_v1_core = () => {
  console.log("🧠 blueprint_optimizer_v1 is analyzing agent execution patterns...");

  const AGENTS_DIR = './agents';
  const suggestions = [];

  fs.readdirSync(AGENTS_DIR).forEach(agent => {
    const agentPath = path.join(AGENTS_DIR, agent);
    if (!fs.statSync(agentPath).isDirectory()) return;

    const files = fs.readdirSync(agentPath);
    const hasCore = files.some(f => f === `${agent}_core.mjs`);
    const hasRunner = files.some(f => f === `run_${agent}.mjs`);

    if (!hasCore) suggestions.push(`⚠️ Missing core file in ${agent}`);
    if (!hasRunner) suggestions.push(`⚠️ Missing runner file in ${agent}`);
  });

  if (suggestions.length) {
    console.log("🔍 Optimization Suggestions:");
    suggestions.forEach(s => console.log(s));
  } else {
    console.log("✅ All agents are correctly structured.");
  }
};
