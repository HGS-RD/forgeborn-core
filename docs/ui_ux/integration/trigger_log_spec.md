# Trigger Log Spec

# 📄 Trigger Log Specification

This document defines the schema and required fields for the `trigger_log.yaml` artifact used in the Forgeborn trust governance system. The trigger log captures any event that breaches a defined trust threshold and requires review, approval, or escalation.

---

## 🎯 Purpose

- Provide a consistent schema for generating and validating trigger logs
- Power UI components such as the trigger queue, alert banners, reviewer panels, and history timelines
- Ensure governance traceability, reviewer transparency, and policy enforcement accuracy

---

## 🧩 Schema Overview

Additional optional fields for streaming and severity awareness have been included to support dashboard signal traceability and role-based UI filtering.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | ✅ | Unique trigger ID (e.g. `trig-core-041`) |
| `blueprint_id` | string | ✅ | Affected blueprint (e.g. `bp-core-041`) |
| `type` | enum | ✅ | Signal that caused the trigger (`fallback_rate`, `override_ratio`, `trust_score`, etc.) |
| `threshold` | float | ✅ | Policy-defined trust threshold (e.g. 0.25 for `fallback_rate`) |
| `observed` | float | ✅ | Actual observed value that breached the threshold |
| `status` | enum | ✅ | One of: `pending-review`, `approved`, `rejected`, `escalated`, `rollback-committed`. If `rejected`, `comment` is mandatory and re-triggering is suppressed for 6 hours unless conditions change. |
| `created_by` | string | ✅ | Creator (`system`, `cli`, or human actor ID) |
| `created_at` | ISO8601 string | ✅ | When the trigger was logged |
| `reviewers_required` | list of role strings | ✅ | Roles required for quorum approval (e.g. `security`, `cto`) |
| `reviewer_log` | list of reviewer action objects | ✅ | Contains decisions, timestamps, and optional comments. Entries must be immutable, append-only, and sorted by `approved_at` ascending. |

---

## 📦 Reviewer Log Entry Object

Reviewer logs reflect the history of approvals or rejections. Each log must include a decision timestamp and should be append-only for audit integrity.

| Field | Type | Description |
| --- | --- | --- |
| `reviewer` | string | Role or user ID of the reviewer (e.g. `security`) |
| `approved` | boolean | Whether the reviewer approved the trigger or not |
| `approved_at` | ISO8601 string | Timestamp of decision |
| `comment` | string (optional) | Any optional reviewer remarks |

---

## 🧠 Governance Rules

- A trigger may optionally include a `severity` field with values: `low`, `medium`, `high`. UI filters and alert colors are derived from this field.
- A `cursor_id` field may be included to support real-time stream cursoring or replay.
- A trigger must not move to `approved` unless all `reviewers_required` have submitted an `approved: true` log.
- UI components may treat missing quorum as `⚠️ Needs Review`
- Rejection or rollback updates must be explicitly added to the trigger's `status` and tracked in `reviewer_log`
- External trust events may log triggers with `created_by: external-<source>` for trace federation.
- Trigger logs may be rotated (`trigger_log.1.yaml`, `archive/`) once exceeding N entries to maintain readability and CI performance.
- A trigger must not move to `approved` unless all `reviewers_required` have submitted an `approved: true` log
- UI components may treat missing quorum as `⚠️ Needs Review`
- Rejection or rollback updates must be explicitly added to the trigger's `status` and tracked in `reviewer_log`

---

## 🧪 UI Usage

- `/triggers`: trigger queue, status chips, reviewer quorum logic
- `/dashboard`: new trigger alerts, critical threshold breach notices
- `/policy`: reviewer badge hovercards, approval chain visualization
- `/compliance`: signature and action audit trail for policy changes

---

## ✅ Summary

This schema now supports real-time event streaming, replay cursoring, severity classification, reviewer audit trails, and log lifecycle rotation. The `trigger_log.yaml` remains the canonical source of record for all threshold-driven trust events in Forgeborn.
This specification defines the canonical format and enforcement rules for the `trigger_log.yaml` file. It ensures integrity of trust signal monitoring, review cycle clarity, and UI alignment across Forgeborn’s governance lifecycle.