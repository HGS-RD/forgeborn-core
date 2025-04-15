// ci_cd_agent_core.ts
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class CICDAgent {
  goal: string;
  planPath: string;

  constructor(goal: string, planPath: string) {
    console.log("🚀 CICDAgent initialized with:", goal, planPath);
    this.goal = goal;
    this.planPath = planPath;
  }

  run(): string {
    const planYaml = readFileSync(this.planPath, 'utf-8');
    const plan = yaml.load(planYaml) as any;

    const ciSteps = (plan.tasks || []).map((task: any, index: number) => ({
      name: `Run Task ${index + 1}`,
      run: `echo "${task.description}" && echo "Running CI/CD task..."`,
    }));

    const pipeline = {
      name: "CI Pipeline",
      on: ["push"],
      jobs: {
        build: {
          "runs-on": "ubuntu-latest",
          steps: [
            { name: "Checkout code", uses: "actions/checkout@v2" },
            ...ciSteps,
          ],
        },
      },
    };

    const outputPath = join(__dirname, "../../pipelines/ci_cd_pipeline.yaml");
    writeFileSync(outputPath, yaml.dump(pipeline));

    console.log("✅ CI/CD pipeline written to:", outputPath);
    return outputPath;
  }
}
