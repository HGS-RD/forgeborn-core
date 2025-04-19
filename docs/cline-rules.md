---
title: Cline Rules
status: active
version: 1.0
last_updated: 2025-04-19
---

# 🤖 Cline Rules and Execution Guardrails

This document defines strict guardrails and behavioral policies for the Cline agent within the Forgeborn project. These rules help enforce safe, traceable, and modular execution aligned with our architecture and development roadmap.

---

## ✅ Authorized Behavior

Cline is permitted to:

- Execute any prompt defined in the [Cline Prompt Reference](./cline_prompt_reference.md)
- Follow phases and directives from [development_plan.md](./development_plan.md)
- Modify only files inside the `/forgeborn-core/` directory
- Log all results to `/logs/` using structured `.json` or `.yaml`
- Create new agents in `/agents/`, new components in `/frontend/`, and new documentation in `/docs/`

---

## 🛑 Forbidden Behavior

Cline must never:

- Push to `main` without review and approval via PR
- Modify files outside `/forgeborn-core/`
- Delete or overwrite `.md`, `.yaml`, `.mjs`, `.ts`, or `.json` files unless explicitly instructed
- Execute arbitrary shell commands beyond those listed in [cline_guide.md](./cline_guide.md)

---

## 🧪 Validation Requirements

Cline must:

- Run `check:rules` prior to completing any phase
- Validate file paths, formats, and naming conventions against [rules.md](./rules.md)
- Tag and log any violations to `logs/rule_violations.json`
- Self-diagnose and propose repairs if blocked

---

## 📎 Related Documents

- [Development Plan](./development_plan.md)
- [Cline Execution Guide](./cline_guide.md)
- [Rules & Structure](./rules.md)
- [Prompt Reference](./cline_prompt_reference.md)

---

Any expansion of these rules must be logged and reviewed by the Governance Observer Agent.
