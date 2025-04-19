# IA Sitemap & Navigation Zones

# 🗺️  IA Sitemap & Navigation Zones

This document outlines the Information Architecture (IA) of the Forgeborn Trust Governance UI. It includes route hierarchy, navigation zones, interface context switching, and stage-based dashboard behavior. The goal is to ensure users of different roles can navigate complex trust governance features efficiently and contextually.

---

## 🎯 Purpose

- Define the structure and hierarchy of the trust dashboard
- Align nav zones with UADL (Unified Autonomous Delivery Loop) stages
- Support persona-aware routing and information density

---

## 🧭 Global Navigation Zones

| Nav Section | Route Path | Description |
| --- | --- | --- |
| **Dashboard** | `/dashboard` | Summary overview: system-wide trust posture, open triggers, recent approvals, active blueprints |
| **Blueprints** | `/blueprints` | Searchable list with tier, score trend, override frequency, drift volatility |
| **Triggers** | `/triggers` | Trigger log, reviewer history, status filters, and quorum logic UI |
| **Simulation** | `/simulation` | Upload simulation plans, validate outputs, replay policy diffs across blueprints, and bookmark key simulation runs for tier review cycles |
| **Policy Review** | `/policy` | Diff viewer, trust policy version history, reviewer panel, digital signature pane |
| **Compliance** | `/compliance` | Export digests, signed reviewer history, scoring audit trail, policy lineage viewer |

---

## 🔁 Contextual Zones by UADL Stage

| Stage | View Contexts |
| --- | --- |
| **Ideate** | Blueprint drafts, simulation plan templates |
| **Plan** | Blueprint registration, tier selection, signal targets, trigger sensitivity setup |
| **Build** | Agent execution logs, test coverage viewer, scoring preview tools |
| **Validate** | Simulation outcomes, fallback matrix, alignment/diff visualizers |
| **Deploy** | CI badge view, commit approvals, rollback visibility, post-merge scoring trend delta. Rollback actions trigger alerts and auto-update policy diff history for all users. |
| **Monitor** | Dashboard timeline, trust score volatility, override fatigue tracker |

---

## 🧩 Topbar + Sidebar Composition

### Topbar Elements

- Context-aware smart search
- Trigger/notification indicator with count
- Role badge and user profile icon
- YAML artifact quick toggle (live ↔ draft — where 'draft' refers to CI-staged or simulation-only policies)

### Sidebar Elements

- Fixed persona-aware nav (links adapt based on role)
- Expandable stage-based grouping (UADL-aligned)
- Highlight for new alerts, pending reviews, or scoring outliers (alerts persist until resolved or explicitly dismissed)

---

## 📱 Responsive Layout

- Tablet layout: collapsible left nav, topbar search + avatar stack
- Mobile layout: hamburger for nav, modal-first flow for interactions
- View states preserved across devices using role-aware local storage

---

## ✅ Summary

> 🔁 This IA structure should be reviewed quarterly in alignment with governance expansion, agent feature growth, or changes to scoring and simulation coverage.
This IA map ensures that the Forgeborn dashboard layout and route logic support high-context governance workflows, lightweight blueprint search, simulation inspection, and compliance trail visibility across roles and environments.
>