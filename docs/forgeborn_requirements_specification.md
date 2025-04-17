
# Forgeborn Requirements Specification

## 1. Introduction

### 1.1 Purpose
This document defines the functional, non-functional, and technical requirements for the Forgeborn system — an AI-native software factory designed to autonomously plan, build, orchestrate, and evolve software using LLM agents and blueprint-driven workflows.

### 1.2 Scope
Forgeborn supports enterprise-grade code generation, memory integration, and CI/CD with dynamic agent-based planning. It is used internally by Hillstrong and also designed for future SaaS extension.

### 1.3 Intended Audience
- CTO / Engineering Leadership
- Software Architects
- Core Developers
- External Contributors

---

## 2. Overall Description

### 2.1 Product Perspective
Forgeborn operates as a modular code factory where agents perform planning, blueprint generation, skill execution, and strategy orchestration. It interfaces with Supabase, GitHub, and multiple LLM providers.

### 2.2 Product Functions
- Autonomous planning and execution of development cycles
- Code generation based on blueprints
- CI/CD pipeline management
- Embedding and memory recall of blueprint and skill logs
- Integration with OpenAI, Claude, Gemini, Grok

---

## 3. Functional Requirements

### 3.1 Planning Agent
- FR-001: Shall analyze memory and generate blueprint planning YAML
- FR-002: Shall support prioritization by RC value and phase

### 3.2 Builder Agent
- FR-003: Shall generate skills or agent code from a blueprint spec
- FR-004: Shall validate outputs using runtime skill tests

### 3.3 Strategy Agent
- FR-005: Shall select optimal LLM for the task via model router
- FR-006: Shall log all LLM choices and strategy feedback to Supabase

### 3.4 GitHub Agent
- FR-007: Shall push committed files to GitHub via PR
- FR-008: Shall track and validate rule-compliant commits

### 3.5 Memory & Vector Agent
- FR-009: Shall chunk and embed blueprint and execution logs
- FR-010: Shall enable recall of related memory for RC planning

### 3.6 Supabase Agent
- FR-011: Shall write blueprint records to the `forgeborn.blueprints` table
- FR-012: Shall query logs and reflections as JSON for runtime feedback

---

## 4. Non-Functional Requirements

### 4.1 Performance
- NFR-001: All agent executions must complete within 30s in local dev
- NFR-002: CI/CD integration must operate under 3s response latency

### 4.2 Scalability
- NFR-003: Must support parallel execution of at least 10 agents
- NFR-004: LLM adapter must route across at least 4 model types

### 4.3 Security
- NFR-005: Secrets must be loaded only from `.env` or Supabase
- NFR-006: GitHub tokens must never be committed to the repo

### 4.4 Usability
- NFR-007: CLI and dashboard must provide logs of all agent outputs
- NFR-008: Agent failure reports must be human-readable in memory logs

---

## 5. External Interfaces

### 5.1 GitHub
- Push-to-PR via `simple-git` and `octokit`
- CI trigger via GitHub Actions

### 5.2 Supabase
- Data store for logs, blueprints, reflections, and skill embeddings

### 5.3 LLMs
- OpenAI (gpt-4o), Claude (3.5), Gemini, Grok — unified via `llm_router.mjs`

---

## 6. Future Requirements

- FR-013: Support remote agent containers via WebSocket bridge
- FR-014: Add OAuth for user-level traceability in dashboard
- FR-015: Enable model evaluation agent to score LLM output quality

---

## 7. Appendices

- A. Glossary
- B. Rules Engine (`rules.md`)
- C. RC Planning Cycles

