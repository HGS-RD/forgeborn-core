# trustcli-to-UI Hooks Specification

# Forgeborn trustcli-to-UI Hooks Spec

This document defines the interactions between the `trustcli` command-line interface and the Forgeborn UI system. It details which CLI commands update UI state, which outputs are rendered into dashboards or YAML viewers, and how trust signals or artifacts propagate between CLI events and the user interface.

---

## 🎯 Purpose

- Ensure CLI automation outputs are reflected in the dashboard UI
- Clarify how YAML, JSON, or event outputs drive frontend updates
- Enable trust reviewers and developers to align CLI + dashboard workflows

---

## 📦 CLI Hooks That Update the UI

| Command | UI Target | Description |
| --- | --- | --- |
| `trustcli simulate-changes` | `/simulation`, `/dashboard` | Outputs `simulation_report.yaml`, populates tiles and diff views. Optionally triggers real-time diff validation and score delta signals (`--emit-signal`). |
| `trustcli check-trigger-status` | `/triggers` | Flags unresolved or pending-review triggers in the trigger queue and status widgets |
| `trustcli rollback-policy` | `/dashboard`, `/policy` | Sends rollback signals, updates rollback log. UI reflects rollback in both version history and a dedicated rollback timeline panel. |
| `trustcli validate-schema` | `/policy` | Confirms policy YAMLs are compliant and activates approval toggle on diff viewer |
| `trustcli export-compliance` | `/compliance` | Creates downloadable digest entries with timestamps and hash badges |
| `trustcli write-trigger-log` | `/triggers`, `/dashboard` | Injects new `trigger_log.yaml` entry for live governance state |
| `trustcli approve-trigger` | `/policy`, `/triggers` | Updates reviewer badge and closes quorum alert bar |

---

## 🧩 CLI-Driven YAML Artifact Integration

| Artifact | CLI Producer | UI Consumer |
| --- | --- | --- |
| `simulation_report.yaml` | `simulate-changes` | Simulation result tiles, diff metrics, blueprint scorecards |
| `trigger_log.yaml` | `write-trigger-log`, `check-trigger-status` | Trigger queue, reviewer history, alert cards |
| `policy_change_log.yaml` | `approve-trigger`, `rollback-policy` | Approval timeline view, diff version history |
| `blueprint_enforcement_summary.yaml` | `simulate-changes` | Blueprint tier map, trust scoring trendline |

---

## 🔁 Signal Propagation to UI from CLI Events

- CLI commands trigger **WebSocket or SSE push** to update UI tiles. Optional batching is supported—e.g., `-commit` to suppress intermediate signals until all updates complete.
- CLI success messages may include a `-emit-signal` flag (default: true)
- UI badge components will auto-refresh if artifact timestamp is newer than last state

---

## 🔒 Access Rules

- CLI-triggered updates respect RBAC session context if token-authenticated
- Governance actions (approve, rollback) are signed and validated before UI commit. Signature verification occurs in the CLI backend service and is surfaced to the UI via `verification_status` trace.
- YAML uploads from CLI must pass schema validation before triggering diff display

---

## ✅ Summary

> 🔁 This spec should remain aligned with the Signal Stream Spec to avoid overlap or routing conflicts between CLI-driven and WebSocket-driven payloads. Shared signal types should reuse event structure and timestamps.
This document ensures that trustcli automation flows and manual CLI events feed into the Forgeborn UI with clear mapping, integrity, and responsiveness. From simulations to rollbacks and reviewer approvals, every trust lifecycle CLI action is reflected visually and traceably in the dashboard.
>