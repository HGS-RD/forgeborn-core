// skill_loader_agent_v1.mjs
import fs from 'fs';
import path from 'path';

export const skill_loader_agent_v1_core = async () => {
  const skillDir = './skills';
  const skillFiles = fs.readdirSync(skillDir).filter(f => f.endsWith('.mjs') && !f.includes('auto'));

  for (const file of skillFiles) {
    const skillPath = path.resolve(skillDir, file);
    try {
      const mod = await import(skillPath);
      const name = path.basename(file, '.mjs');
      if (typeof mod.runSkill === 'function') {
        console.log(`🧩 Found skill: ${name} ✅ runSkill() detected`);
        console.log(`➡️ Executing ${name}...`);
        await mod.runSkill({ invokedBy: 'skill_loader_agent_v1' });
        console.log(`✅ Skill ${name} executed successfully`);
      }
    } catch (err) {
      console.error(`❌ Error loading skill ${file}:`, err.message);
    }
  }
};
