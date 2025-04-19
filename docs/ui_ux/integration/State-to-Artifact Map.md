# UI State-to-Artifact Mapping

# 🧠 Forgeborn UI State-to-Artifact Mapping

This document defines the mapping between UI components, trust enforcement states, and the underlying governance artifacts that power them (YAML, JSON, and CLI outputs). It ensures traceability, transparency, and up-to-date rendering of trust posture across all dashboard views.

---

## 🎯 Purpose

- Establish which UI zones are powered by which YAML/JSON artifacts
- Map trust signals and component states to their source of truth
- Support CLI automation, export auditing, and dashboard accuracy

---

## 🔄 UI Zones to Artifact Mapping

| UI Zone | Component | Artifact(s) |
| --- | --- | --- |
| `/dashboard` | Trust Score Summary, Open Trigger List | `blueprint_enforcement_summary.yaml`, `trigger_log.yaml` |
| `/blueprints` | Score Cards, Drift Timeline, Tier Map | `blueprint_enforcement_summary.yaml` |
| `/triggers` | Trigger Tiles, Reviewer Panel | `trigger_log.yaml`, `policy_change_log.yaml` |
| `/simulation` | Simulation Tiles, YAML Diff Viewer | `simulation_report.yaml`, `simulation_plan.yaml` |
| `/policy` | Policy Diff Viewer, Signature Banner | `trust_policy.yaml`, `policy_change_log.yaml` |
| `/compliance` | Export Tiles, Review Logs, Ledger Audit | `policy_change_log.yaml`, `reviewer_action_report.yaml`, `trigger_log.yaml` (for trace event inclusion) |

---

## 🧩 Component State Drivers

| Component | State Logic | Derived From |
| --- | --- | --- |
| Trust Score Card | Score trend, tier badge | `blueprint_enforcement_summary.yaml` |
| Trigger Tile | Status, reviewer badge, hover comment | `trigger_log.yaml`, `reviewer_action_report.yaml` |
| YAML Diff Viewer | Highlighted lines, schema toggle | `simulation_plan.yaml`, `trust_policy.yaml` |
| Export Tile | Last exported date, hash match badge | `reviewer_action_report.yaml`, `export-compliance` output. UI surfaces revalidation option when mismatches occur. |
| Policy Impact Panel | Score delta, blueprint affected list | `simulation_report.yaml`, `policy_change_log.yaml` |

---

## 🛠️ CLI & Backend Ingestion

- All artifacts are parsed and cached in-memory per session or project context
- YAML files validated via `trustcli validate-schema` before UI display
- Component redraws are triggered on hash change, timestamp update, diff change, simulation replays, or rollback commit events.
- CI export or simulation run triggers WebSocket push to invalidate cached panel data

---

## 🧪 Audit & Trace Tips

- Enable debug mode to view `source_artifact:` in YAML tooltips or hover states
- Reviewer badge metadata includes `signed_by`, `approved_at`, and `quorum_required`
- Out-of-sync badges (`stale`, `unverified`, `unsynced`) pull from timestamp mismatch with last trusted build or export. Users can manually revalidate via UI action or trigger `trustcli validate-state` for confirmation.

---

## ✅ Summary

> 🔁 This map should be kept synchronized with the UI test suite and CI policy config to ensure all components validate presence of expected backing artifacts. Component state, caching, and YAML inputs should remain inspectable by test harness and signed audit viewers.
This state-to-artifact mapping enables every trust enforcement component in the Forgeborn dashboard to remain accurate, auditable, and traceable to governance inputs. YAML artifacts are the canonical source of truth and power all reactive dashboard updates and simulation workflows.
>