---
title: Forgeborn Rules & Structure
status: active
version: 1.2
last_updated: 2025-04-19
---

# Forgeborn Repository Structure and Compliance Rules

These rules define the architectural, structural, and behavioral constraints for all contributors and agents working within the Forgeborn platform.

## 📁 Directory & File Structure

- All agents must live under: `/agents/{agent_name}/`
- Agent entrypoints: `run_{agent_name}.mjs`
- Core logic: `{agent_name}_core.mjs` or `index.mjs`
- Frontend code must live under: `/frontend/catalyst-ui-kit/`
- Configuration lives in: `/config/`
- Logs must be written to: `/logs/`
- Documentation belongs in: `/docs/` or `/docs/ui_ux/`

## 🧠 Naming Conventions

| Component         | Pattern                       |
|------------------|-------------------------------|
| Agent Folder      | `*_agent_vX`                  |
| Entrypoint        | `run_*.mjs`                   |
| Core Agent Logic  | `*_core.mjs` or `index.mjs`   |
| Scripts           | `*.sh` or `*.mjs`             |
| Log Files         | `*.json`, `*.yaml`            |
| Docs              | `*.md`                        |

## ✅ Execution Rules

- All agents must log results to `/logs/` using structured JSON or YAML.
- Agent actions must align with `development_plan.md` and `cline_guide.md`.
- Cline must not modify files outside `/forgeborn-core/` unless explicitly prompted.
- PRs to `main` must come via `github_agent` and be validated by `ci_validator_agent`.

## 🔒 Guardrails for Autonomous Agents

- DO NOT delete `.md`, `.mjs`, `.yaml`, or `.json` files unless explicitly instructed.
- DO NOT execute arbitrary shell commands unless in an approved command list.
- Use `chmod +x install_*.sh && ./install_*.sh` pattern for script execution.
- Use only Git operations approved in `cline_guide.md`.

## 🧪 Validation & Compliance

- Run `npm run check:rules` to lint file structure, naming, and integrity.
- Rule checks are enforced pre-merge via `ci_validator_agent`.
- Violations must be resolved or logged to `logs/rule_violations.json`.

## 📎 Linked References

- [Development Plan](./development_plan.md)
- [Roadmap](./roadmap.md)
- [Cline Guide](./cline_guide.md)
- [UI Docs](./ui_ux/)

---

All updates to this file must be peer-reviewed or logged via `governance_observer_agent_v1`.
