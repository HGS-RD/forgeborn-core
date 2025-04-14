import { runProvision } from './provision/provision_runner.ts';
import { runTests } from './test/test_runner.js';
import { generateCIReport } from './ci/report_generator.js';

async function main() {
  console.log('🧪 Starting DevOps Agent pipeline...');
  await runProvision();
  await runTests();
  await generateCIReport();
  console.log('✅ DevOps Agent pipeline complete.');
}

main().catch(console.error);
