// skill_loader_agent_v1_core.mjs
import fs from 'fs';
import path from 'path';

export const skill_loader_agent_v1_core = () => {
  console.log("🔌 skill_loader_agent_v1 is scanning for loadable .mjs skill modules...");

  const SKILLS_DIR = './skills';
  const skills = [];

  if (!fs.existsSync(SKILLS_DIR)) {
    console.log("⚠️ No 'skills' directory found. Nothing to load.");
    return;
  }

  fs.readdirSync(SKILLS_DIR).forEach(file => {
    if (file.endsWith('.mjs')) {
      const skillName = path.basename(file, '.mjs');
      skills.push(skillName);
    }
  });

  if (skills.length > 0) {
    console.log("✅ Found skills:");
    skills.forEach(skill => console.log(`  - ${skill}`));
  } else {
    console.log("⚠️ No .mjs skill modules found in ./skills/");
  }
};
