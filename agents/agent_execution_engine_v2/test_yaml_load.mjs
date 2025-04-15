// Copyright (c) 2025 Hillstrong Group Security. All rights reserved.
// Use of this source code is governed by the custom license found in the LICENSE file.

import { readFileSync } from 'fs';
import { join } from 'path';
import yaml from 'js-yaml';

// Manually load blueprint from expected path
const blueprintPath = join(__dirname, '../../blueprints/planning_agent_output.yaml');
console.log("🔍 Loading YAML from:", blueprintPath);

try {
  const blueprint = yaml.load(readFileSync(blueprintPath, 'utf-8'));
  console.log("✅ YAML loaded successfully:\n", JSON.stringify(blueprint, null, 2));
} catch (err) {
  console.error("❌ YAML load failed:", err);
}
