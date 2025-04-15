// Copyright (c) 2025 Hillstrong Group Security. All rights reserved.
// Use of this source code is governed by the custom license found in the LICENSE file.

import yaml from "js-yaml";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function selectBestModel(task: string): any {
  const configPath = path.resolve(__dirname, "../config/model_ranking.yaml");
  const doc = yaml.load(fs.readFileSync(configPath, "utf8")) as any;
  return doc[task]?.[0];  // pick top-ranked model
}
