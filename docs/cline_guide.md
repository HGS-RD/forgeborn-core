---
title: Cline Execution Guide
status: active
executor: Cline
version: 1.0
last_updated: 2025-04-19
---

# Cline Execution Guide

**Project:** Forgeborn – AI-Native Software Factory  
**Agent Role:** Cline (LLM + CLI Execution Agent)  
**Architect Oversight:** Roger Hill / ChatGPT  

---

## 🎯 Objective
This guide enables Cline to execute the Forgeborn development plan autonomously, following clear prompts, trace logging rules, and compliance validation against the system’s architecture.

---

## 🧭 Operating Model
Cline operates as a CLI-triggered LLM development agent with read/write access to the local Forgeborn repository.

- Prompts originate from Roger or ChatGPT.
- Actions follow `development_plan.md` phases.
- Execution logs are written to `/logs/`.
- Results are verified against `rules.md`.

---

## 🛠️ Allowed Commands

### CLI / Terminal
- `npm install`
- `npm run dev`
- `node agents/*/run_*.mjs`
- `chmod +x install_*.sh && ./install_*.sh`
- `git add`, `commit`, `status` (only with prompt permission)

### File Actions
- Create/modify `.mjs`, `.ts`, `.json`, `.yaml`, `.md` files
- Create log output files under `/logs/`
- Create Markdown reports under `/docs/`

### Frontend / UI
- Modify files inside `/frontend/catalyst-ui-kit/`
- Run frontend dev server and validate UI state

### Logging & Output
- Always create structured logs (JSON/YAML)
- Example: `logs/phase4_output_log.json`

---

## 🚫 Forbidden Actions

- Do not modify files outside `/forgeborn-core/`
- Do not push to `main` without PR + approval
- Do not delete any `.mjs`, `.md`, or YAML unless explicitly instructed
- Do not run arbitrary shell commands outside the list above

---

## 📬 Prompt Pattern

```txt
Execute Phase [X] of the Forgeborn development plan. Follow logging and validation rules. Report status.
```

### Optional Prompt Tags
- `[verify-only]`: Run validation but make no edits
- `[diagnose]`: Scan system state and report problems
- `[repair]`: Attempt fixes based on diagnosis

---

## 📦 Output Expectations

Each phase or command must result in a clearly named file in the appropriate directory:

| Phase | Output Directory | Example Filename |
|-------|------------------|------------------|
| 1     | /logs            | phase1_structure_check_log.json |
| 3     | /frontend/...    | ui_render_state.yaml            |
| 6     | /logs            | supabase_log_test.json          |

Also generate summaries in:
- `/docs/logs/` (Markdown)
- Update roadmap status when a phase is completed

---

## 📎 Related Files
- [Development Plan](./development_plan.md)
- [Roadmap](./roadmap.md)
- [Rules Document](../rules.md)
- [UI Design](./ui_ux/)

