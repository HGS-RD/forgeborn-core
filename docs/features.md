
# Forgeborn Feature Specification

This document outlines the core and extended feature set for the Forgeborn project.

---

## 1. Core System Features

### 1.1 Autonomous Agent Loop
- Planning, Evaluation, Execution, and Optimization agents
- Agent state awareness and coordination
- Task chaining with memory integration

### 1.2 Blueprint System
- YAML-based blueprint definition format
- Execution lifecycle (Parse → Plan → Run → Reflect)
- Blueprint repair and regeneration system

### 1.3 Skill Runtime
- Modular `.mjs` skill execution system
- Dynamic skill loading and scoped permission model
- LLM-based tool selection and chaining

### 1.4 CLI Factory Interface
- `factory new`, `factory plan`, `factory run` commands
- Direct blueprint triggering and agent launch via CLI
- Real-time logging and tracing with `--trace` flags

### 1.5 Memory System
- Structured memory logs (`memory_index.yaml`, trace YAMLs)
- Reflection-driven feedback loop
- Vector embedding for RC trace embedding and search

---

## 2. Platform Integration Features

### 2.1 GitHub Integration
- Automated PR and branch pushes
- CI validation before merge via GitHub Actions
- GitHub token routing and config via `.env`

### 2.2 Supabase Logging
- Structured logging to `forgeborn.llm_logs` table
- Memory upload (traces, summaries, planning)
- RLS security with scoped insert and read policies

### 2.3 Multi-LLM Strategy
- Integration with OpenAI, Claude, Gemini, Grok
- LLM Router selection with task-type model ranking
- Memory-aware log and strategy enrichment

---

## 3. Observability Features

### 3.1 Trace Logger
- Execution path tracking per RC
- Skill-level invocation metadata
- JSON+YAML hybrid output formats

### 3.2 Dashboard-Ready Exports
- Dashboard YAMLs (`execution_trace_rcX.yaml`)
- Skill chains, reflection outputs, blueprint views

---

## 4. Self-Healing & Cognitive Loops

### 4.1 Reflection Agent
- Post-execution analysis of performance
- Reflection summary generation
- Input to blueprint_repair_agent

### 4.2 Blueprint Repair Agent
- Parses reflection summary
- Modifies or replaces blueprint sections
- Triggers re-planning loop

---

## 5. Future Feature Tracks (Planned)

### 5.1 Meta Agents
- Strategy agent (implemented)
- Governance observer, Output Validator
- Factory lifecycle analytics

### 5.2 UI Dashboard
- Supabase-backed memory browser
- RC-by-RC trace explorer
- Persona-based views

### 5.3 Custom Execution Contexts
- Docker/VM sandbox for codegen
- Fine-tuned context generation based on project type

---

## 6. Contribution & Extensibility Features

### 6.1 Rule Engine
- `check:rules`, `fix:rules` CLI enforcement
- Rule-based commit gatekeeping
- Linting and agent structure validation

### 6.2 Agent Scaffolding
- CLI or LLM-assisted agent scaffolding
- Default skill, runner, core.mjs templates
- GitHub template repository structure

---

## Appendix

- Each RC (Run Cycle) is logged with skill chains and memory output
- All features documented in `docs/`, zipped bundles for portability
- Phase-based roadmap with zip-based deliverables and install scripts

