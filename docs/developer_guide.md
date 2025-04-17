# Forgeborn Developer Guide

Welcome to the Forgeborn Developer Guide. This document is intended to support new and existing developers working on the `forgeborn-core` project. It includes onboarding steps, local development setup, coding conventions, agent integration, testing, and deployment practices.

---

## 1. Project Overview

Forgeborn is an AI-native software factory designed for autonomous and human-assisted agent-based application development. The system supports planning, skill execution, memory, cognitive reflection, and DevOps operations across a modular architecture.

---

## 2. Getting Started

### Prerequisites

- Node.js v20+
- Supabase account and project
- Git and GitHub CLI
- VSCode (recommended)
- `dotenv` and `@supabase/supabase-js` libraries installed

### Repository Setup

```bash
git clone https://github.com/HGS-RD/forgeborn-core.git
cd forgeborn-core
npm install
cp .env.example .env
```

Fill in the `.env` file with your Supabase keys and model API credentials.

---

## 3. Project Structure

```
agents/
  └── <agent_name>/
      ├── run_<agent>.mjs
      ├── <agent>_core.mjs
      └── skills/
cli/
docs/
blueprints/
logs/
memory/
scripts/
```

---

## 4. Coding Conventions

- All files are ES Modules (`.mjs`)
- Use descriptive naming: `run_agent_name.mjs`
- Import relative paths explicitly (e.g., `../utils/helper.mjs`)
- Follow linting rules and run `npm run check:rules` before commits

---

## 5. Adding a New Agent

1. Create a folder under `agents/agent_name/`
2. Implement:
   - `run_agent_name.mjs`
   - `agent_name_core.mjs`
   - `skills/*.mjs`
3. Define a blueprint (YAML) in `blueprints/`
4. Register and test locally

---

## 6. Running Agents

```bash
node agents/<agent_name>/run_<agent_name>.mjs
```

Agents typically accept input from a planning file and emit logs and updated blueprints.

---

## 7. Supabase Integration

Agents log data to Supabase (logs, blueprints, memory). Ensure RLS policies are in place for:
- `forgeborn.logs`
- `forgeborn.blueprints`
- `forgeborn.memory_chunks`

Use `scripts/supabase-connectivity-test.cjs` to validate your connection.

---

## 8. Testing and Validation

- Unit tests for skills and helpers (future)
- `check:rules` to ensure compliance with structure and imports
- Run agents manually to validate execution chain

---

## 9. CI/CD

- GitHub PR-based GitOps flow
- Phase 6 integrates `github_agent_v1` for GitHub CI interaction
- Future phases will automate validation, merge, and deployment

---

## 10. Contributing

See `CONTRIBUTING.md` for more guidelines. Open PRs with clear descriptions. Coordinate large feature development through planning agents and blueprints.

---

## 11. Roadmap

- Multi-model agent reasoning (Phase 9+)
- Visual graph memory and cognitive loop visualization
- Production containerized deployment via DevOps agents
- IDE plugins for skill authoring and blueprint validation

---

## Contact

- [@roger.hill](mailto:roger.hill@hillstrongsecurity.com)
- Project Lead and Software Architect: Roger Hill

---

Happy coding and building with Forgeborn!