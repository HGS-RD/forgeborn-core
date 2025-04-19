# Component Library Map

# 🧱  Forgeborn Component Library Map

This document defines the reusable UI components that make up the Forgeborn Trust Governance Platform. Components are designed to support trust enforcement visualization, simulation review, policy lifecycle management, and persona-specific workflows.

---

## 🎯 Purpose

- Standardize the building blocks of the Forgeborn UI
- Ensure visual and functional consistency across dashboard modules
- Support role-aware rendering and interactive governance workflows

---

## 🧩 Core Components

| Component | Description | Used In |
| --- | --- | --- |
| **Trust Score Card** | Displays blueprint trust score, tier, trend icon (up/down/stable), and optionally shows associated risk class or most recent policy diff impact | `/blueprints`, `/dashboard` |
| **Trigger Tile** | Compact summary of a fired trigger, with status badge and linked reviewer state | `/triggers`, `/dashboard` |
| **Reviewer Badge** | Role-based avatar + status (`approved`, `rejected`, `pending`) with timestamp | `/triggers`, `/policy` |
| **Diff Viewer** | Side-by-side YAML or JSON policy diff with syntax highlight and comment threads. Supports inline schema toggling and test-mode simulation of diffs. | `/policy`, `/simulation` |
| **Simulation Result Tile** | Shows blueprint ID, expected/pass/fail, agent, score impact, and conditions tested. Allows grouping/filtering by agent, stage, or volatility band. | `/simulation`, `/dashboard` |
| **Fallback Matrix Table** | Cross-view of blueprint ↔ stage ↔ fallback occurrence rate | `/validate`, `/monitor` |
| **Drift Timeline Chart** | Line graph showing trust score, drift volatility, and override ratios over time | `/blueprints`, `/monitor` |
| **Signature Validation Banner** | Verifies whether policy or report is signed + status indicator + hash viewer | `/policy`, `/compliance` |
| **Policy Impact Panel** | Shows expected vs observed score delta, trigger changes, and affected blueprints | `/simulation`, `/policy` |
| **YAML File Upload Widget** | Styled uploader for `simulation_plan.yaml`, `trust_policy.yaml`, etc. | `/simulation`, `/policy` |
| **Export Tile** | Block UI element showing available compliance report formats and last export timestamp | `/compliance`, `/dashboard` |
| **Alert Card** | UI banner for unresolved scoring outliers, open triggers, or ledger anomalies. Alerts auto-resolve when cleared or timeout after state normalization. | Top of `/dashboard`, `/blueprints` |

---

## 🔁 Component Behavior by State

| Component | State Variants |
| --- | --- |
| `Trust Score Card` | `normal`, `low-risk`, `tier-mismatch`, `volatile` |
| `Trigger Tile` | `pending`, `approved`, `rejected`, `escalated` |
| `Reviewer Badge` | `approved`, `rejected`, `no-review`, `fallback-assigned` |
| `Diff Viewer` | `unchanged`, `highlight-modified`, `comments-open` |
| `Simulation Result Tile` | `expected-pass`, `expected-fail`, `false-negative`, `false-positive` |

---

## 🧠 Role-Aware Modifiers

| Component | Role-Specific Enhancements |
| --- | --- |
| `Reviewer Badge` | Highlights governance quorum if all required approvers signed |
| `Diff Viewer` | Locks comment threads to governance roles (QA, CTO, Security) |
| `Export Tile` | Exports scoped by role — Auditor sees all, PO sees tier-specific |
| `Alert Card` | Severity badge varies by role — CTO sees critical, QA sees drift |

---

## ✅ Summary

> 🔁 This component library should be versioned and linked to a centralized design token and Tailwind variant system to ensure UI consistency across enforcement, simulation, and audit modules.
This component map ensures that all parts of the Forgeborn trust UI reflect governance intent and data state clearly and consistently. Each component is scoped, styled, and permissioned to reinforce trust signal observability, reviewer actionability, and role clarity across the product.
>