# Phase 13 – Agent Patching & Self-Versioning

This phase enables the system to apply optimization patches based on insights.

## Components
- `patching_agent_v1`: Generates patch suggestions
- `patch_generator_skill.mjs`: Converts insights to patch format
- `version_registry.json`: Stores historical changes

## Run:
```bash
node agents/patching_agent_v1/run_patching_agent_v1.mjs
```
