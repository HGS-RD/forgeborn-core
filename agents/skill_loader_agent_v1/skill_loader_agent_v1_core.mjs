// skill_loader_agent_v1_core.mjs
import fs from 'fs';
import path from 'path';

export const skill_loader_agent_v1_core = async () => {
  console.log("🔌 skill_loader_agent_v1 is scanning for .mjs skill modules...");

  const SKILLS_DIR = './skills';
  const skills = [];

  if (!fs.existsSync(SKILLS_DIR)) {
    console.log("⚠️ No 'skills' directory found. Nothing to load.");
    return;
  }

  const files = fs.readdirSync(SKILLS_DIR);
  for (const file of files) {
    if (!file.endsWith('.mjs')) continue;

    const skillName = path.basename(file, '.mjs');
    const skillPath = path.resolve(SKILLS_DIR, file);

    try {
      const skillModule = await import(skillPath);
      const hasRunSkill = typeof skillModule.runSkill === 'function';

      console.log(`🧩 Found skill: ${skillName}${hasRunSkill ? ' ✅ runSkill() detected' : ' ⚠️ no runSkill() exported'}`);
      skills.push({ name: skillName, hasRunSkill });

      if (hasRunSkill) {
        console.log(`➡️ Executing ${skillName}...`);
        await skillModule.runSkill({ invokedBy: 'skill_loader_agent_v1' });
        console.log(`✅ Skill ${skillName} executed successfully`);
      }
    } catch (err) {
      console.error(`❌ Failed to load skill '${skillName}':`, err.message);
    }
  }

  if (skills.length === 0) {
    console.log("⚠️ No valid skill modules found.");
  }
};
