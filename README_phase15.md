# Phase 15: CI Validator Agent

This phase introduces the `ci_validator_agent_v1` to automatically validate rule compliance and CI-ready structure upon GitHub events (e.g., push, PR).

## Components
- `ci_validator_agent_v1_core.mjs`: Agent logic for rule and compliance validation
- `run_ci_validator_agent_v1.mjs`: Entry script to run validation from CLI or GitHub triggers
- `install_phase15_ci_validator.sh`: Installer script
- `README_phase15.md`: This file

## Usage
```bash
node agents/ci_validator_agent_v1/run_ci_validator_agent_v1.mjs push
```