# Dashboard Signal Stream

# 📡 Dashboard Signal Stream Specification

This document defines how trust-related signals—such as trigger events, simulation results, blueprint score changes, and reviewer approvals—are propagated to the Forgeborn UI. It covers signal types, delivery protocols, stream channels, update frequency, and client display behavior.

---

## 🎯 Purpose

- Provide real-time or near-real-time trust telemetry to the dashboard
- Enable reactive components (e.g. trust scorecards, trigger alerts) to update instantly
- Maintain traceability between live signal data and persisted artifacts (e.g. YAML logs, simulation reports)

---

## 🚦 Signal Types

| Signal Type | Description | Example Payload |
| --- | --- | --- |
| `trigger_fired` | New trigger created due to threshold breach | `{ id: 'trig-023', status: 'pending-review', blueprint: 'bp-102' }` |
| `trigger_reviewed` | Trigger updated by a reviewer | `{ id: 'trig-023', reviewer: 'security', approved: true }` |
| `simulation_result` | Result from a simulation plan run | `{ blueprint: 'bp-104', outcome: 'pass', plan: 'sim-042' }` |
| `trust_score_update` | Score change for a blueprint | `{ blueprint: 'bp-107', old: 82, new: 74 }` |
| `tier_mismatch_detected` | Blueprint trust score now conflicts with tier | `{ blueprint: 'bp-111', score: 58, tier: 'core-product' }` |
| `rollback_committed` | Rollback occurred on a policy or blueprint enforcement block | `{ id: 'rollback-14', target: 'trust_policy.yaml', by: 'CTO' }` |

---

## 🔌 Transport Methods

| Method | Used For | Latency Target |
| --- | --- | --- |
| `WebSocket` | Live dashboards (active sessions) | ~200ms (UX push) |
| `EventSource` / SSE | Lightweight fallback for streaming panels | ~500ms |
| `Polling` | Offline fallback / mobile low-power mode | Configurable (5–30s) |

---

## 🧠 Signal Channels

| Channel | Description |
| --- | --- |
| `dashboard/summary` | Broadcasts system-wide trust posture changes |
| `trigger/queue` | Sends individual trigger create/review updates |
| `simulation/results` | Publishes simulation outcomes with metadata |
| `policy/review` | Informs UI of diff changes or approval state updates |
| `blueprint/scores` | Syncs drift, override, and tier-change signals per blueprint |

---

## ⚙️ Client Behavior

- Signals update only currently viewed routes and tiles (avoid global redraw)
- Outdated UI state includes fade effect or `stale` badge until refreshed
- Critical signals (e.g., rollback) escalate to alert bar or persistent toast
- Users can opt into `signal debug mode` to show JSON payload trace

---

## 🔐 Security Considerations

| Concern | Mitigation |
| --- | --- |
| Signal spoofing | JWT-signed payloads and stream tokens required |
| Stale race conditions | Payloads include timestamps and replay protection ID |
| Unauthorized channels | Role-filtered channel access via RBAC session context |

---

## ✅ Summary

This specification defines the real-time data layer that powers trust telemetry in the Forgeborn dashboard. It supports accurate, role-aware, and timely updates for simulation tracking, trigger governance, score shifts, and critical events such as policy rollback or enforcement conflict.