
# Forgeborn Data Flow Specification

## Overview

This document describes the data flow architecture and interactions within the Forgeborn system, detailing how data is created, processed, and persisted through various agents, skills, memory layers, and external integrations such as Supabase.

---

## 1. Core Data Flow Overview

### 1.1 Data Flow Diagram
```
User/CLI → Planning Agent → Blueprint → Executor Agents (DevOps, Builder, Validator, etc.) → Supabase + GitHub
                                     ↓
                                Memory Agent
                                     ↓
                            Vector/Graph Memory
```

---

## 2. Phase-Based Data Movement

### 2.1 Phase 1: Core Agents
- **Input**: RC request via CLI
- **Processing**:
  - `planning_agent_v1` generates a blueprint
  - `evaluator_agent_v1` validates readiness
- **Storage**:
  - `memory_index.yaml` for indexing
  - Supabase table: `blueprints`, `agent_runs`

### 2.2 Phase 2–3: UI + Supabase
- **Input**: Frontend user actions, CLI workflows
- **Processing**: Visualization and persistence layer
- **Storage**: Supabase tables `blueprints`, `logs`, `skills`, `agent_runs`

### 2.3 Phase 4–5: DevOps + Builder
- **Input**: Execution blueprint
- **Processing**:
  - `devops_agent_v2` provisions infra
  - `builder_agent_v1` generates and validates code
- **Storage**:
  - Supabase: `skills`, `logs`
  - GitHub: Pushed code commits

### 2.4 Phase 6–7: CI/CD + Memory
- **Input**: Code from `builder_agent_v1`
- **Processing**:
  - `github_agent_v1` pushes to GitHub
  - `graph_mapper_agent_v1` and `vector_agent_v1` extract memory
- **Storage**:
  - Supabase: `memory_chunks`
  - Internal JSON stores for embeddings and memory summaries

### 2.5 Phase 8–9: Reflection + Strategy
- **Input**: Execution trace logs + memory
- **Processing**:
  - `reflection_agent_v1` writes insights to Supabase
  - `strategy_agent_v1` proposes next plan using LLMs
- **Storage**: `reflections`, `llm_logs`, `planning_log.yaml`

---

## 3. External Integration Flow

### 3.1 Supabase (Storage Layer)
- Tables Used:
  - `forgeborn.blueprints`
  - `forgeborn.logs`
  - `forgeborn.memory_chunks`
  - `forgeborn.llm_logs`
  - `forgeborn.skills`

### 3.2 GitHub (Code Management)
- Source control and CI/CD entry points via `github_agent_v1`
- GitHub Actions triggers create feedback loops

### 3.3 LLMs (Autonomous Code Reasoning)
- Accessed via `llm_router.mjs`
- Logging through `log_llm_call.mjs`

---

## 4. Logging and Monitoring

### 4.1 CLI Logging
- Blueprint generation, validation, and failures tracked via terminal outputs and `logs/`.

### 4.2 Supabase Logging
- All significant insertions and agent activities logged to:
  - `llm_logs`, `agent_runs`, `reflections`

### 4.3 Error Capture
- Skill error handling routes to structured error objects
- Insert logs to Supabase `logs` with level `error`

---

## 5. Planned Enhancements

- Bi-directional agent-to-agent message bus (Phase 10)
- Supabase triggers for webhooks on inserts
- Dashboard-driven RC trace replays

---

*Maintained by: Forgeborn Architecture Team*
