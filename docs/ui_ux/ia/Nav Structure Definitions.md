# Nav Structure Definitions

# 🧭 Forgeborn Nav Structure Definitions

This document defines the primary navigation system used in the Forgeborn Trust Governance UI. It outlines the left sidebar (stage-based hierarchy), topbar actions, breadcrumb conventions, and alert indicators for key governance roles.

---

## 🎯 Purpose

- Provide a consistent, persona-aware nav structure
- Align left nav categories to UADL stages
- Support topbar tools, quick nav patterns, and UI alerts for trust state monitoring

---

## 📂 Sidebar Navigation Hierarchy

Below is the base navigation structure. In implementation, this structure is filtered and grouped dynamically based on the current user's persona (e.g., CTO, QA, DevOps, Product Owner, Security, Auditor). Each role sees only what they need, mapped to their UADL stage responsibilities and governance privileges. Users may also pin favorite routes or collapse/expand sections by UADL group for a personalized layout experience. Default visibility rules can be adjusted by an administrator or site owner via the governance configuration panel.

Below is the base navigation structure. In implementation, this structure is filtered and grouped dynamically based on the current user's persona (e.g., CTO, QA, DevOps, Product Owner, Security, Auditor). Each role sees only what they need, mapped to their UADL stage responsibilities and governance privileges.

| Group | Label | Route | Visibility |
| --- | --- | --- | --- |
| `home` | Dashboard | `/dashboard` | All roles |
| `explore` | Blueprints | `/blueprints` | DevOps, PO, QA |
| `governance` | Triggers | `/triggers` | CTO, QA, Security |
| `governance` | Policy Review | `/policy` | CTO, Security, Reviewer |
| `review` | Simulation | `/simulation` | QA, Product, DevOps |
| `audit` | Compliance | `/compliance` | Security, Auditor |
| `system` | Admin / Settings | `/settings` | Admin-only |

Stage-based grouping mirrors UADL phases under the hood but collapses into a semantic experience (e.g., “Explore” for ideate/plan).

---

## 🔝 Topbar Elements

| Element | Function |
| --- | --- |
| Global Search | Context-aware trust artifact search (trigger ID, blueprint, diff) |
| Notifications | Badge count and preview of signal-triggered updates (e.g., fallback, override) |
| Profile Menu | Role switcher (for multi-role users or reviewers), theme toggle, `trustcli` auth token refresh. Role switch triggers dynamic nav refresh and may persist session state if supported. |
| YAML Toggle | Quick preview of live vs draft `trust_policy.yaml` / `simulation_plan.yaml` |

---

## 🧭 Breadcrumb Logic

| Pattern | Example |
| --- | --- |
| `/triggers/:id` | `Triggers > TRIG-023 > Reviewer Panel` |
| `/simulation/:blueprintId` | `Simulation > BP-008 > Scorecard + Diff` |
| `/policy/version/:hash` | `Policy Review > Version History > v1.2.4` |

Breadcrumbs reflect hierarchy and optionally highlight current trust object with status icon (e.g., 🟡 pending, ✅ approved). Breadcrumbs may also include quick actions (e.g., reopen diff, jump to reviewer) for advanced or power users.g., 🟡 pending, ✅ approved).

---

## 🚨 Trust State Alerts in Navigation

| Indicator | Location | Triggered By |
| --- | --- | --- |
| 🔴 Dot on `/triggers` | Sidebar | New trigger logged or reviewer update pending |
| 🟡 Badge on `/simulation` | Sidebar | Simulation plan incomplete or under review |
| 🛑 Modal toast in `/policy` | Topbar | Unsigned or failed trust policy diff detected |

Visual indicators use role-aware severity mapping: CTO sees red, QA sees yellow, PO sees grey badge-only. Alerts may be delegated or forwarded between roles (e.g., a QA reviewer may inherit alerts from an absent approver).

---

## 🧑‍💼 Persona-Based Navigation Access Matrix

| Persona | Visible Routes |
| --- | --- |
| **CTO** | `/dashboard`, `/triggers`, `/policy`, `/settings` |
| **QA Lead** | `/dashboard`, `/triggers`, `/simulation`, `/blueprints` |
| **DevOps** | `/dashboard`, `/blueprints`, `/simulation` |
| **Product Owner** | `/dashboard`, `/blueprints`, `/simulation` (read-only), `/triggers` (read-only optional) |
| **Security Officer** | `/dashboard`, `/triggers`, `/policy`, `/compliance`, `/settings` |
| **Auditor** | `/dashboard`, `/compliance`, `/policy` (read-only) |
| **Reviewer (rotating role)** | `/dashboard`, `/policy`, `/triggers` (as assigned) |

Administrators may override or extend route visibility per persona to support custom roles or tier-specific governance responsibilities.

## ✅ Summary

This document now incorporates persona-based navigation mapping as a foundational concept. Sidebar visibility, alert logic, and topbar tools should all derive dynamically from the authenticated user's trust role, reinforcing clarity, focus, and mission-aligned UX per persona. Route visibility defaults may be tailored by administrators through policy configuration.

Breadcrumbs, alert logic, and personalization features (e.g., pinning, stage grouping) should continue evolving based on usability feedback and governance needs. Role-switching behavior and notification delegation should be fully testable in multi-role QA or hybrid-product environments.. Sidebar visibility, alert logic, and topbar tools should all derive dynamically from the authenticated user's trust role, reinforcing clarity, focus, and mission-aligned UX per persona. Route visibility defaults may be tailored by administrators through policy configuration.

This document now incorporates persona-based navigation mapping as a foundational concept. Sidebar visibility, alert logic, and topbar tools should all derive dynamically from the authenticated user's trust role, reinforcing clarity, focus, and mission-aligned UX per persona.
This navigation structure ensures governance users across roles can access the right trust enforcement, simulation, and approval views quickly, with intuitive breadcrumbs and alerts reflecting the current state of trust signals, trigger reviews, and blueprint risks.