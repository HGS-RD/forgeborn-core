# 🤖 Forgeborn Agent Framework Guide

## Agent Lifecycle

1. Agent is instantiated based on a plan.
2. Loads any relevant skills.
3. Executes core logic.
4. Produces output and logs trace.

## Creating a New Agent

1. Add a new folder under `agents/agent_name_v1`.
2. Create:
   - `agent_core.mjs`
   - `run_agent.mjs`
   - `skills/` folder with reusable logic.
3. Register the agent in the orchestrator.

## Best Practices

- Ensure all agents respect the plan structure.
- Use `trace_logger` to emit logs and execution traces.