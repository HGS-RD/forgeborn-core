// Copyright (c) 2025 Hillstrong Group Security. All rights reserved.
// Use of this source code is governed by the custom license found in the LICENSE file.

// utils/model_loader.ts
import yaml from "js-yaml";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

interface LLMModel {
  name: string;
  provider: string;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Loads and returns all LLM models listed for a given task.
 * The task-to-model ranking is defined in model_ranking.yaml.
 */
export function selectAllLLMsForTask(task: string): LLMModel[] {
  const configPath = path.resolve(__dirname, "../config/model_ranking.yaml");

  if (!fs.existsSync(configPath)) {
    throw new Error(`⚠️ model_ranking.yaml not found at ${configPath}`);
  }

  const yamlText = fs.readFileSync(configPath, "utf8");
  const ranking = yaml.load(yamlText) as Record<string, LLMModel[]>;

  const models = ranking[task];
  if (!models || models.length === 0) {
    console.warn(`⚠️ No models found for task: "${task}" in model_ranking.yaml`);
    return [];
  }

  return models;
}
