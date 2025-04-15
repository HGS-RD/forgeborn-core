// Copyright (c) 2025 Hillstrong Group Security. All rights reserved.
// Use of this source code is governed by the custom license found in the LICENSE file.

// orchestrator_agent_core.ts
import { PlannerAgent } from "../planner_agent_v2/planner_agent_core.ts";
import { DevOpsAgent } from "../devops_agent_v1/devops_agent_core.ts";
import { ingestLLMEvaluationsToMemory } from "../memory_steward_v1/memory_steward_v1.ts";


export class OrchestratorAgent {
  static async start(): Promise<void> {
    try {
      console.log("🚀 Starting orchestrator...");

      const planningGoal = "Automate planning, development, and memory capture";
      const inputPath = "../../blueprints/optimized_blueprint_v2.yaml";

      // Planning Phase
      console.log("📐 Running Planning agent...");
      const planner = new PlannerAgent(planningGoal, inputPath);
      const plannerOutput = await planner.generatePlan();
      console.log("✅ Planning complete. Output at:", plannerOutput);

      // DevOps Phase
      console.log("⚙️ Running DevOps agent...");
      const devopsGoal = "Transform RC plan into devops execution plan";
      const devops = new DevOpsAgent(devopsGoal, plannerOutput);
      const devopsOutput = devops.run();
      console.log("✅ DevOps complete. Output at:", devopsOutput);

      // Memory Phase
      console.log("🧠 Running Memory Steward agent...");
      await ingestLLMEvaluationsToMemory();  // This is async
      console.log("🧠 Memory ingestion complete.");
    } catch (err) {
      console.error("❌ Orchestration failed:", err);
    }
  }
}
