
# Forgeborn Project Roadmap

**Project:** Forgeborn – AI-Native Software Factory  
**Maintainer:** Roger Hill  
**Architect:** ChatGPT  
**Version:** 1.0  
**Last Updated:** 2025-04-19

---

## 🎯 Vision
To deliver an end-to-end AI-native software factory capable of planning, building, validating, and deploying software using autonomous agents and an enterprise-grade UI.

The roadmap below defines the phased evolution of the Forgeborn platform across backend agents, frontend UI, DevOps automation, and governance.

---

## 🗺️ Phase Overview

| Phase | Title | Status | ETA | Notes |
|-------|-------|--------|-----|-------|
| 1 | ESM Agent Architecture + CLI | ✅ Complete | - | Rule engine + CLI bootstrapped |
| 2 | Planning Agent + RC Execution | ✅ Complete | - | RC3 executed with blueprint mapping |
| 3 | Supabase Integration | ✅ Complete | - | Logging connected via REST API |
| 4 | DevOps Agent (infra scaffold) | ✅ Complete | - | Infrastructure agent pipeline online |
| 5 | Builder Agent | ✅ Complete | - | Supports codegen from spec/blueprint |
| 6 | GitHub Agent + PR Flow | ✅ Complete | - | PR/CI/CD lifecycle built in |
| 7 | Memory + Trace Logging | ✅ Complete | - | Vector-based log + YAML snapshotting |
| 8 | Reflection + Blueprint Repair | ✅ Complete | - | Cognitive loop repairs malformed plans |
| 9 | LLM Strategy + Ranking Agent | ✅ Complete | - | Model selection config complete |
| 10 | UI Bootstrapping (Catalyst) | ✅ Complete | - | Vite + Catalyst UI Pro wired up |
| 11 | Autopilot Agent | ✅ Complete | - | Multi-agent planner executor loop |
| 12 | Self-Optimizer + Trace Loop | ✅ Complete | - | Generates patch plans for improvement |
| 13 | Patch Generator + Diff Engine | ✅ Complete | - | Diffs blueprints and agents |
| 14 | CI Event Listener Agent | ✅ Complete | - | PR event watcher hooked to GitHub |
| 15 | CI Validator Agent | ✅ Complete | - | Lint/structure checks pre-merge |
| 16 | Autodeploy Agent | ✅ Complete | - | Deploy manifest builder |
| 17 | Deploy Executor Agent | ✅ Complete | - | Runs multi-step production launch |
| 18 | Governance Observer Agent | 🚧 In Progress | Apr 2025 | Monitors architecture & rules |
| 19 | UADL UI Staging + Navigation | ⏳ Planned | Apr 2025 | Use `/docs/ui_ux/ui_stage_layouts.md`, `navigation_map.md` for UI planning |
| 20 | Supabase Memory Timeline Views | ⏳ Planned | Apr/May 2025 | Memory & LLM logs in dashboard |
| 21 | Agent History + Graph Viz | ⏳ Planned | May 2025 | Codebase intelligence + graph mapping |
| 22 | Runtime Permissions Agent | ⏳ Planned | May 2025 | Sandboxing and write policy routing |
| 23 | LLM Plugin Framework | ⏳ Planned | May 2025 | Skill-based dynamic execution plugins |
| 24 | Meta-Agent Reflex Engine | ⏳ Planned | Jun 2025 | Self-improvement & coordination layer |

---

## 🔄 Maintenance Cadence
- **Weekly**: Evaluate agent logs and blueprint diffs.
- **Biweekly**: Update roadmap phase statuses.
- **Monthly**: Review with Roger and publish dashboard export.

---

## 🧠 Meta Note
The roadmap is used to drive all `development_plan.md` phases and Cline execution prompts. Each new phase will also trigger an update to `/docs/roadmap.md`, `/logs/`, and GitHub milestones.

---

## 📎 Related Documents
- [Development Plan](./development_plan.md)
- [Rules & Structure](../rules.md)
- [UI Design Docs](./ui_ux/ui_stage_layouts.md), [theme_tokens.md](./ui_ux/theme_tokens.md), [component_library_map.md](./ui_ux/component_library_map.md), [navigation_map.md](./ui_ux/navigation_map.md)
