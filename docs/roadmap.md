# Roadmap

Status: Draft

# 📘 Forgeborn-Core Project Roadmap (v2)

---

**Title:** Autonomous AI-Native Software Factory with Agentic RAG, Multi-LLM Routing, and Role-Aware UX

**Date:** April 17, 2025

**Owner:** Roger Hill

**Lead Architect:** ChatGPT

---

## 🚀 Executive Summary

Forgeborn is a self-evolving, agent-powered software factory designed to autonomously plan, generate, execute, and refine software systems through blueprint-driven recursive agent execution. The architecture integrates LLMs, reflection, memory, and user interfaces across distinct user personas. This document outlines the full roadmap from completed milestones through upcoming strategic phases, including new integration of `llmmanager` for intelligent multi-LLM orchestration.

---

## ✅ Completed Phases (1–11)

| Phase | Component                    | Status | Highlights |
|-------|------------------------------|--------|------------|
| 1     | CLI Bootstrapping            | ✅     | `factory new`, agent blueprint generation |
| 2     | Core Agent Templates         | ✅     | Standard folder structure, CLI runnable |
| 3     | Planning + Evaluator Agents  | ✅     | Planning + blueprint trust scoring |
| 4     | Dynamic Skill Loader         | ✅     | `.mjs` plugins loaded at runtime |
| 5     | Memory Stewardship           | ✅     | Chunking, YAML memory, long-term logs |
| 6     | GitHub Agent + Trace Logging | ✅     | PR creation + execution memory tracing |
| 7     | Supabase Client + Logging    | ✅     | Vector + trace log writing to Supabase |
| 8     | Reflection + Repair Agents   | ✅     | Blueprint repair + self-healing loop |
| 9     | Frontend Bootstrapping       | ✅     | React + Tailwind + Vite, local dashboard running |
| 10    | Dashboard Layout Spec        | ✅     | Memory, reflection, agent usage panel plans created |
| 11    | Rule Compliance Framework    | ✅     | All agents pass structure/filename checks via `check:rules` |


---

## 🆕 Phases 11–20: Strategic Evolution & UX Platform Expansion

### 🔁 Phase 11: `llmmanager` Integration

> Goal: Replace static LLM calls with dynamic, ranked, provider-agnostic execution using forked llmmanager.
> 

### Deliverables:

- Fork `llmmanager` to `forgeborn-llmmanager`
- Wrap in `llm_adapter.mjs` to:
    - Route by task type, agent, or blueprint goal
    - Log latency, success, tokens
    - Write to `model_stats` Supabase table
- YAML config: `llm_strategy.yaml`
- CLI tool: `factory test:models`

---

### 🧠 Phase 12: Model Feedback Intelligence

> Goal: Learn from model history to optimize future model choices.
> 

### Agent: `model_strategy_agent_v1`

- Inputs: reflection logs, llm_logs
- Outputs: forced-ranking suggestions (e.g. Claude > GPT for evaluators)

### Supabase:

- Table: `model_strategy_recs`
- UI Panel: LLM routing timeline + override toggle

---

### 💻 Phase 13: Dashboard Panel Wiring

> Goal: Activate real-time panel population
> 

### Panels:

- ✅ Memory Summary → YAML files
- ✅ Reflection View → latest snapshot
- ✅ Agent Usage → log/blueprint-derived stats
- 🔜 LLM Logs → grouped by model, agent, latency

---

### 📊 Phase 14: Execution Timeline + Diff View

> Goal: Trace agent runs and compare blueprint vs output.
> 

### Features:

- Gantt-style timeline with agent execution and result
- Diff viewer: blueprint vs reflection vs skill call

---

### 🧩 Phase 15: DevOps + Integration Agents

> Goal: Provision external services, secrets, and tokens.
> 

### Agents:

- `devops_agent_v2`
- `secrets_agent_v1`
- `integration_agent_v1` (GitHub, Slack, APIs)

---

### 🧠 Phase 16: Self-Healing Blueprint Execution

> Goal: Repair flawed blueprints and reflect errors autonomously.
> 

### Agents:

- `blueprint_repair_agent_v1`
- `skill_suggester_agent_v1`
- `agent_scorecard_agent_v1`

---

### 🧱 Phase 17: Persona-Centric UX Views

> Goal: Tailor UI/UX to roles: Founder, Architect, Operator, Integrator
> 

### Dashboard Features:

| Persona | Needs | Features |
| --- | --- | --- |
| Founder | Milestone KPIs | High-level stats, trace timelines |
| Architect | Traceability | Memory diff, reflection evolution |
| Operator | System health | Logs, errors, retry queue |
| Integrator | Plugin integration | API keys, custom skills |

---

### 🔒 Phase 18: Role-Based Access + Secrets Vault

> Goal: Harden access and control credentials.
> 

### Deliverables:

- Supabase-based RBAC via JWT auth
- `.env` manager
- Secrets logging and access history

---

### 🔁 Phase 19: Intelligent Cycle Evaluation

> Goal: Meta evaluation of factory behavior and drift.
> 

### Agent:

- `cycle_evaluator_v1`: ranks RC effectiveness
- `goal_alignment_agent`: checks drift from original mission

---

### 📦 Phase 20: Phase Bundling + Remote Factory Support

> Goal: Pack each phase as a zip deliverable, enable API deployment
> 

### Bundles:

- `phase11_llmmanager_bundle.zip`
- `phase12_model_feedback_bundle.zip`
- Full `forgeborn_phase_manifest.yaml`

---

## 📐 Supabase Schema Summary (New Tables)

```sql
-- Existing
CREATE TABLE forgeborn.llm_logs (
  rc_id TEXT,
  agent TEXT,
  message TEXT,
  level TEXT,
  timestamp TIMESTAMP DEFAULT now()
);

-- New
CREATE TABLE forgeborn.model_stats (
  model_name TEXT,
  provider TEXT,
  latency_ms INT,
  tokens INT,
  success BOOLEAN,
  timestamp TIMESTAMP DEFAULT now()
);

CREATE TABLE forgeborn.model_strategy_recs (
  rc_id TEXT,
  agent TEXT,
  best_model TEXT,
  reason TEXT,
  timestamp TIMESTAMP DEFAULT now()
);

```

---

## 🛠️ Internal Bundling Model

Each roadmap phase may now include a zipped artifact bundle:

- Agent folder
- Blueprint
- Sample outputs
- Supabase schema patch (SQL)
- CLI tool if applicable
- README/UX notes

---

## 📘 Final Notes

With `llmmanager` included, Forgeborn will become a **multi-model intelligent AI factory**, capable of:

- Choosing best model for the task based on past performance
- Healing itself through memory and reflection
- Powering different user personas from blueprint to deployment

Let me know if you'd like this:

- Saved as `forgeborn_roadmap_v2.md`
- Bundled as `forgeborn_roadmap_bundle_v2.zip` with Mermaid Gantt + GitHub JSON board + SQL files

Ready to package or proceed to next phase when you are.
