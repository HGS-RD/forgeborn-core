# 📏 Forgeborn Core Development Rules

Welcome to the `forgeborn-core` repository! This document defines the structural, naming, and execution rules that must be followed for all new development activities and agent contributions.

---

## 🗂️ File & Directory Naming Conventions

### Agent Structure
Each agent must reside in its own directory within `agents/` and follow this structure:

```
agents/
  agent_name/
    ├── agent_core.ts            # Core logic
    ├── run_agent.ts             # Entrypoint script
    ├── package.json
    ├── tsconfig.json
    ├── README.md                # Agent-level documentation
    ├── config/                  # Any configuration files
    ├── utils/                   # Shared utilities
    └── tests/                   # (optional) unit/integration tests
```

### Filenames
- Use `snake_case` for filenames.
- Use `agent_core.ts` and `run_agent.ts` naming consistently.
- Do not use suffixes like `_v1`, `_v2` in filenames. Use Git for versioning.

---

## 🧠 Agent Definition Standards

- All agents **must export** a primary class (e.g., `PlannerAgent`) from `agent_core.ts`.
- Entrypoint `run_agent.ts` must:
  - Instantiate the agent with a `goal` and `inputDocs`.
  - Log all major steps using emoji-prefixed logging (e.g., `🚀`, `✅`, `❌`).
  - Catch and log any runtime errors.

---

## 📐 Code Quality & Practices

- TypeScript only. No JavaScript files should be committed.
- All imports must include file extensions (e.g., `import { X } from './utils.ts'`).
- Use `__dirname` via ESM-safe workaround (`fileURLToPath`, `dirname`).
- Avoid hardcoding values. Use config files or environment variables.

---

## 🧪 Testing & Linting

- Tests should live in a `tests/` subfolder.
- All new agents must be tested manually before commit.
- ESLint and Prettier must be configured and run before PRs.

---

## 🔐 Secrets & Environment

- No secrets or API keys in committed code.
- Use `.env` or `supabase_config.sh` for local dev and CI/CD separation.

---

## 📝 Commit & Branching Strategy

- Use Conventional Commits (e.g., `feat:`, `fix:`, `chore:`).
- PRs should follow the “Fastlane drop-in” principle: isolated, minimal, working units.
- Main branch must always be working. Use feature branches for active work.

---

By following this `rules.md`, we ensure consistency, clarity, and futureproof growth of the Forgeborn Factory.

