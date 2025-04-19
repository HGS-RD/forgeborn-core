// Copyright (c) 2025 Hillstrong Group Security. All rights reserved.
// Use of this source code is governed by the custom license found in the LICENSE file.

# cycle_memory_v1

Analyzes the `cycle_registry_log.json` and `long_term_memory.json` to detect redundant goals and suggest skip logic or refinements.

## Purpose

Avoid repeating blueprint cycles by identifying semantic duplicates across memory chunks.

## Output

Writes result to:  
`/logs/cycle_memory_log.json`
