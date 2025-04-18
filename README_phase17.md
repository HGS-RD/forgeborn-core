# Phase 17 – Deployment Executor Agent

This phase introduces the `DeployExecutorAgent`, responsible for automating the final step of pushing Forgeborn deployments to the cloud.

## Components
- `deploy_executor_agent_v1_core.mjs`: Core deployment logic
- `run_deploy_executor_agent_v1.mjs`: Entrypoint script
- `cloud_deployment_orchestrator_skill.mjs`: Deployment orchestration skill

## Usage

```bash
node agents/deploy_executor_agent_v1/run_deploy_executor_agent_v1.mjs production
```

This command simulates deploying to the production environment using a pre-defined plan.
