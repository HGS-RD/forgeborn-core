import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class EvaluatorAgent {
  goal: any;

  constructor(goal: any) {
    console.log("🧠 EvaluatorAgent constructor called with:", goal);
    this.goal = goal;
  }

  evaluate(): string {
    console.log("🔍 Reading RC file...");
    const rcPath = join(__dirname, '../../rcs/rc_forgeborn_core_v1_plan.md');
    const rcContent = readFileSync(rcPath, 'utf-8');

    const score = rcContent.length > 100 ? "trustworthy" : "needs expansion";

    const output = {
      goal: this.goal.description,
      score,
      summary: `Plan is ${score}. Length: ${rcContent.length}`
    };

    const outputPath = join(__dirname, '../../memory/evaluator_score.json');
    writeFileSync(outputPath, JSON.stringify(output, null, 2));
    console.log("✅ Evaluation result written to:", outputPath);

    return outputPath;
  }
}
