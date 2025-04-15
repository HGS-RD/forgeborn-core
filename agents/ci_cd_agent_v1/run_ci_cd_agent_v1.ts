// run_ci_cd_agent_v1.ts
import { CICDAgent } from "./ci_cd_agent_core.ts";

console.log("🚀 ci_cd_agent_v1 starting...");

const goal = "Generate CI/CD pipeline from DevOps plan";
const inputPath = "../../blueprints/devops_agent_build_cycle.yaml";

console.log("📦 Declared input:", inputPath);

const agent = new CICDAgent(goal, inputPath);
const result = agent.run();

console.log("✅ CI/CD pipeline created at:", result);
