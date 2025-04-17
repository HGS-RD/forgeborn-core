
# 🧭 Forgeborn Developer Guide

This guide onboards, aligns, and empowers developers contributing to `forgeborn-core`.

---

## 🚀 Introduction to Forgeborn

**What is Forgeborn?**  
A fully autonomous, AI-native software factory built using modular agents, dynamic skills, and code orchestration through blueprints and CI/CD.

### Core Concepts

- Agent lifecycle (plan → evaluate → execute → reflect)
- Blueprint-driven software execution
- Runtime skill loading
- Memory logging and traceability
- Supabase as the state + metrics backend
- LLM routing and strategy agent

---

## 🧱 Repository Structure

```bash
.
├── agents/
│   └── agent_name_vX/
├── blueprints/
├── cli/
├── clients/
├── docs/
├── logs/
├── memory/
├── llm_router/
├── scripts/
└── .env
```

---

## 🛠️ Setting Up Your Environment

### Prerequisites

- Node.js v20+
- `npm` or `pnpm`
- Supabase account
- GitHub token
- OpenAI, Claude, Gemini keys

### Install Dependencies

```bash
cd forgeborn-core
npm install
```

### Configure Environment

```bash
cp .env.example .env
# Fill in the required keys
```

---

## 🧠 Agent Development Lifecycle

| Stage | Description |
|-------|-------------|
| Plan | Use `planning_agent_v1` to generate blueprint tasks |
| Build | `builder_agent_v1` creates/updates skills |
| Push | `github_agent_v1` opens PRs with CI |
| Trace | Execution logs stored in memory/Supabase |
| Reflect | `reflection_agent_v1` guides next actions |

---

## ✨ Creating a New Agent

```bash
mkdir agents/my_agent_v1
touch agents/my_agent_v1/{my_agent_core.mjs,run_my_agent.mjs}
```

Add metadata to `memory_index.yaml`, link in CLI if needed.

---

## 🧩 Working with Blueprints

Blueprints drive planning, skill execution, and orchestration.

```yaml
rc_id: RC101
goal: "Add CI validator agent"
steps:
  - use: skill:generate_validator
    input: agent_spec.yaml
  - run: agent:github_agent_v1
    task: "open PR with generated code"
```

---

## 🧪 Running the System

### Single Agent
```bash
node agents/devops_agent_v2/run_devops_agent.mjs
```

### CLI
```bash
./cli/factory.mjs plan RC101
```

### Orchestrator
```bash
npm run dev:meta
```

---

## 🧠 Logging and Memory

- Memory files in `memory/`
- Supabase tables: `forgeborn.llm_logs`, `forgeborn.blueprints`, etc.

---

## 🧰 Tooling

- `scripts/supabase-connectivity-test.cjs`
- `npm run check:rules`

---

## 🔁 Contributing Workflow

- Branch: `feature/agent-xyz`
- Lint: `npm run check:rules`
- PR with conventional commit message

---

## 📋 Best Practices

- Use trace logs for each RC
- Diagram systems in `docs/architecture.md`
- Use `reflection_agent_v1` after major RC execution
