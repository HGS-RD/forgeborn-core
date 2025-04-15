// skills/trace_logger_skill.mjs
import fs from 'fs';
import yaml from 'js-yaml';

export async function runSkill(config) {
  const traceDir = './memory';
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const traceFile = `${traceDir}/execution_trace_${timestamp}.yaml`;

  const log = {
    executed_at: timestamp,
    executed_by: config?.invokedBy || 'unknown',
    agents_run: config?.agents || []
  };

  fs.writeFileSync(traceFile, yaml.dump(log), 'utf-8');
  console.log(`🧠 Execution trace written to: ${traceFile}`);
}
