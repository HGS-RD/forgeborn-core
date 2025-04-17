# 📘 Blueprint System Documentation

## Blueprint Format

All blueprints are YAML and follow the schema:

```yaml
rc_id: RC10
description: Blueprint for CI/CD agent
steps:
  - agent: github_agent_v1
    task: create_pull_request
    inputs:
      branch_name: feature/new-branch
```

## Lifecycle

1. Generated via CLI or agent.
2. Parsed and executed by `meta_orchestrator`.
3. Logs and feedback used for reflection.

## Editor Guidance

Use comments to annotate intent.