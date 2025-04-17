# 🧱 Forgeborn Architecture Overview

## 🎯 Purpose
The architecture of Forgeborn is designed to enable **modular**, **autonomous**, and **scalable** AI-agent-driven software development. At its core, Forgeborn is an AI-native software factory that orchestrates agents, executes skills, manages plans, stores memory, and delivers outputs through a CLI and dashboard interface.

---

## 📐 Architectural Layers

```
User
│
├── CLI Interface / Web Dashboard
│
├── Agent Orchestrator Layer
│   └── meta_orchestrator_v2
│       └── Routes based on Planning RCs and Evaluator insights
│
├── Agent Layer
│   ├── planning_agent_v1
│   ├── memory_steward_v1
│   ├── docs_agent_v1
│   ├── builder_agent_v1
│   ├── github_agent_v1
│   ├── evaluator_agent_v1
│   ├── validator_agent_v1
│   └── strategy_agent_v1
│
├── Skill Execution Layer
│   ├── Runtime skills via skill_loader_agent_v1
│   └── Skills in `.mjs` files executed dynamically
│
├── Memory & Traceability Layer
│   ├── Supabase: blueprints, logs, reflections
│   └── Local memory: /memory, /logs
│
└── External Integrations
    ├── GitHub: PR, CI/CD
    ├── Supabase: Memory store, logs, blueprints
    └── LLM APIs: Claude, GPT-4, Gemini, Grok
```

---

## ⚙️ Core System Components

### 🧠 Agents
Each agent is a self-contained unit of execution. Agents can:
- Read and write memory
- Load skills via plugins
- Interact with blueprints and orchestrators

> All agents live under `agents/{agent_name}` and have:
> - `*_core.mjs`: main logic
> - `run_*.mjs`: execution harness
> - `skills/`: modular sub-functions

### 🔄 Orchestration Flow
1. **PlanningAgent** creates a blueprint.
2. **MetaOrchestrator** selects next agent to run.
3. Agent uses **SkillLoader** to run `.mjs` skills.
4. **MemorySteward** updates local/Supabase logs.
5. **EvaluatorAgent** reflects on quality.
6. **StrategyAgent** guides future model usage.

---

## 🧪 Memory and Trace Infrastructure

- `.env` contains Supabase credentials.
- `memory/` holds embedded YAML logs.
- `supabase_client.mjs` connects to remote store.
- All agents can write to `forgeborn.llm_logs`.

---

## 📦 Project Structure (Simplified)

```
forgeborn-core/
├── agents/
│   └── {agent_name}/
│       ├── run_*.mjs
│       ├── *_core.mjs
│       └── skills/
├── blueprints/
├── memory/
├── logs/
├── scripts/
├── llm_router/
├── clients/
├── docs/
└── frontend/
```

---

## 🧩 Integration Points

- **Supabase**: long-term memory, blueprints, logging
- **GitHub**: CI/CD, PR creation (via `github_agent`)
- **Cline CLI**: potential LLM-assisted scaffolding
- **Langchain/LLManager**: optional strategy routing (Phase 10+)

---

## 🔐 Security

- `.env` is read via `dotenv` and NOT committed.
- Secrets agent (`secrets_agent_v1`) in development.
- Supabase API hardened via RLS + schema enforcement.

---

## 🗺️ Future Enhancements

| Feature | Target Phase | Notes |
|--------|---------------|-------|
| Langchain fork integration | Phase 10 | Strategy/agent coordination |
| Vector DB or GraphQL integration | Phase 11 | For memory and dependency maps |
| UI RBAC + dashboards | Phase 12 | Per-persona views (CTO, CISO, Engineer) |