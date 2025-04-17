# Cline CLI Guardrails for Forgeborn-Core

This document defines the strict development rules and architectural guidelines for using Cline CLI in the Forgeborn-Core project. It ensures any AI-generated code aligns with Forgeborn’s architectural integrity, coding standards, and long-term vision.

---

## 1. Purpose

This document acts as a safeguard against drift or inconsistency introduced by AI-generated code, particularly when using Cline CLI. These rules ensure every contribution adheres to the Forgeborn design principles.

---

## 2. Repository Boundaries

- **All generated agents or skills** must reside in their appropriate folders:
  - Agents: `agents/`
  - Skills: `skills/`
  - Blueprints: `blueprints/`
- Never generate files in root unless explicitly for orchestration, CLI, or configuration.

---

## 3. Naming Conventions

- Use snake_case for files (e.g., `plan_validator.mjs`).
- Use camelCase for functions and variables.
- Agent directories must follow: `agentname_agent_vX/` (e.g., `memory_agent_v1/`).

---

## 4. File and Module Architecture

- All agents must contain:
  - `run_agentname.mjs`
  - `agentname_core.mjs`
  - `agentname_spec.md`
- All agents must use `esm` modules (`.mjs`) and support runtime-loaded skills.

---

## 5. Logging and Output

- Agents must log all major steps to `Supabase` via `log_to_supabase.mjs`.
- Always include `rc_id`, `agent`, `message`, and `level` in log events.

---

## 6. Runtime Contracts

- Skills must follow the standard skill contract (`export default async function(context) {}`).
- All skills must validate input and log context-aware errors.
- Skills must not directly mutate filesystem or memory unless explicitly designed to.

---

## 7. Metadata and Traceability

- Every agent must append its trace to `trace_logger_skill.mjs`.
- Runtime decisions should be linked to the originating blueprint or plan.

---

## 8. Commit Discipline

- Every cline-generated commit must:
  - Reference the associated blueprint or spec.
  - Include CI validation pass logs.
  - Include `#cline` tag in the commit message footer.

---

## 9. Manual Review Required

All Cline-generated artifacts must undergo:
- Manual code review before merge.
- Architecture validation by meta orchestrator, if automated.

---

## 10. Forbidden Behaviors

- No inline JSON config hardcoding.
- No external fetch calls without routing through `integration_proxy.mjs`.
- No skill or agent should run without being registered in `memory_governor` or `cycle_registry`.

---

## 11. Approved Prompts and Patterns

- Prompts must follow this structure:  
  `Given spec <path>, generate compliant agent folder under <parent>. Use contracts from /docs/skills.md.`
- Prefer guided agent scaffolding over unstructured code generation.

---

## 12. Violations

If any rule is violated:
- A CI hook should flag and prevent merge.
- Log violation in `llm_logs` with level `error` and include offending file.

---

## Final Note

These rules exist to protect the design intent of Forgeborn. Cline CLI is a powerful tool, but must always operate under supervision and architectural constraints. This document will evolve with the system.

