// pr_publisher_agent_v1_core.mjs

import { exec } from 'child_process';
import fs from 'fs/promises';
import path from 'path';

export async function prPublisherAgentCore() {
  console.log("🔍 Running rule check...");
  await runShell('npm run check:rules', 'violation(s) found');

  console.log("🛠 Attempting auto-fix if violations exist...");
  await runShell('node scripts/fix_phase19_violations.mjs');

  console.log("📦 Staging governance files...");
  await runShell(`git add -f \
    agents/*_agent_v1/*_core.mjs \
    agents/*_agent_v1/run_*.mjs \
    docs/logs/structure_fix_report.md \
    logs/structure_fixes_applied.json \
    logs/execution_log_v2.json \
    commit_message.txt \
    pr_checklist.md \
    pr_submission_README.md \
    pull_request.md \
    scripts/fix_phase19_violations.mjs \
    submit_pr.sh \
    skills/middle_out_compressor.mjs \
    .gitignore`);

  console.log("✅ Committing changes...");
  await runShell('git commit -F commit_message.txt');

  console.log("🚀 Pushing branch...");
  await runShell('git push -u origin fix/phase19-structure-compliance');

  console.log("🎉 PR submission complete.");
}

function runShell(cmd, failOnMatch = null) {
  return new Promise((resolve, reject) => {
    console.log(`➡️ Executing: ${cmd}`);
    exec(cmd, { shell: '/bin/bash' }, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Command failed: ${cmd}`);
        console.error(stderr || error.message);
        return reject(new Error(stderr || error.message));
      }

      if (failOnMatch && stdout.includes(failOnMatch)) {
        console.error(`❌ Rule check violation: "${failOnMatch}" detected.`);
        return reject(new Error("Rule check failed due to violation output."));
      }

      console.log(stdout);
      resolve(stdout);
    });
  });
}