// Copyright (c) 2025 Hillstrong Group Security. All rights reserved.
// Use of this source code is governed by the custom license found in the LICENSE file.

import { readFileSync, writeFileSync } from 'fs';
console.log("🧠 blueprint_optimizer_v1.ts loaded");

export class BlueprintOptimizerAgent {
  goal: string;
  inputDocs: string[];

  constructor(goal: string, inputDocs: string[]) {
    console.log("🧠 BlueprintOptimizerAgent constructor called with:", { goal, inputDocs });
    this.goal = goal;
    this.inputDocs = inputDocs;
  }

  async optimizeBlueprint(): Promise<string> {
    console.log("📄 optimizeBlueprint() called");
    console.log("🧠 Inputs:", this.inputDocs);
    console.log("🎯 Goal:", this.goal);
  
    const [blueprintPath, executionPath, registryPath] = this.inputDocs;
  
    try {
      console.log("📥 Reading blueprint...");
      const blueprint = readFileSync(blueprintPath, 'utf-8');
  
      console.log("📥 Reading execution log...");
      const executionLog = readFileSync(executionPath, 'utf-8');
  
      console.log("📥 Reading registry...");
      const registry = readFileSync(registryPath, 'utf-8');
  
      const content = `🧠 Optimized Blueprint\nGoal: ${this.goal}\nSources:\n${this.inputDocs.join("\n")}\n\n📄 Blueprint:\n${blueprint}\n\n📝 Execution Log:\n${executionLog}\n\n📚 Registry:\n${registry}`;
  
      const outputPath = "./optimized_blueprint.md";
      console.log("📦 Writing optimized blueprint to:", outputPath);
  
      writeFileSync(outputPath, content);
  
      console.log("✅ Optimization done.");
      return outputPath;
  
    } catch (err) {
      console.error("❌ Error during optimization:", err);
      throw err; // rethrow so we get proper visibility in npm start
    }
  }
  
}
