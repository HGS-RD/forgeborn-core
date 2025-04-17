# 🧩 Forgeborn CLI Manual

## Commands

- `factory new <goal>`: Create a blueprint.
- `factory run`: Execute the orchestrator.
- `factory log`: View trace logs.
- `check:rules`: Run rule engine on codebase.

## Usage Examples

```sh
factory new create-codegen-agent
factory run
```

## Output Files

Generated plans, execution logs, and agent traces are written to:
- `blueprints/`
- `logs/`
- `memory/`