# Phase 16 – Autonomous Deployment Planner

This phase introduces the `autodeploy_agent_v1`, which listens for system readiness signals and stages a release strategy.

## Components
- `autodeploy_agent_v1_core.mjs`: Core logic for deployment decisions
- `run_autodeploy_agent_v1.mjs`: Entry script
- `deployment_manifest_generator_skill.mjs`: Produces deployment blueprints

## Run
```bash
node agents/autodeploy_agent_v1/run_autodeploy_agent_v1.mjs release
```
