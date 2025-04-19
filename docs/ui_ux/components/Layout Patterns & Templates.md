# Layout Patterns & Templates

# 🧰 Forgeborn Layout Patterns & Templates

This document defines the layout system and reusable UI templates that structure the Forgeborn Trust Governance Platform. It covers grid configurations, container padding, responsive rules, section hierarchy, modal behavior, and dashboard view scaffolding.

---

## 🎯 Purpose

- Enforce visual consistency across trust views and governance flows
- Define structure rules for responsive layouts and modular component zones
- Accelerate UI prototyping with standardized scaffolds

---

## 🧱 Layout Grid System

| Property | Value |
| --- | --- |
| Base grid | 12-column fluid grid |
| Gutters | 16px horizontal / 24px vertical |
| Max content width | 1440px (desktop) |
| Side padding | 24px (desktop), 16px (mobile/tablet) |
| Breakpoints | sm: 640px, md: 768px, lg: 1024px, xl: 1280px |

---

## 🧩 Dashboard View Templates

| Template | Use Case |
| --- | --- |
| `Entity Table + Sidebar Detail` | Blueprints list with score cards + inspector pane that supports real-time trust score drift updates and optional pinned sections |
| `Review Queue + Activity Feed` | Trigger queue or open simulation review panel |
| `Simulation Panel + YAML Diff Tabs` | Inline viewer for simulation results with code diff toggle. YAML tabs support both side-by-side and overlay diff modes depending on screen width |
| `Policy Viewer + Approval Rail` | Diff history + reviewer panel with scroll lock |
| `Timeline Grid + Chart Drawer` | Monitoring view with chart cards and drilldown overlay |

---

## 📐 Common Card Sizes

| Card Type | Width | Height |
| --- | --- | --- |
| Trust Score Card | 300px | 140px |
| Trigger Tile | 340px | 120px |
| Simulation Tile | 380px | 160px (expandable) |
| YAML Diff Viewer | 100% | dynamic height (min 320px) |
| Export Tile | 360px | 100px |

---

## 🪟 Modal & Overlay Patterns

| Modal Type | Description |
| --- | --- |
| `Approve Trigger` | Two-step modal with comment input, policy link validation, and quorum status indicator for reviewer awareness |
| `Rollback Confirm` | Warning modal with rollback scope, score delta, and ledger record preview |
| `Simulation Run Summary` | Side panel with pass/fail ratio, outlier tags, and preview/export controls |
| `Policy Diff Viewer` | Full-screen modal w/ timeline slider and role-based annotation visibility |

---

## 🔁 Responsive Layout Behavior

| View Type | Mobile | Tablet | Desktop |
| --- | --- | --- | --- |
| Dashboard Summary | Card stack | 2-column grid | 3-column grid (column density optionally adjustable by role or user setting) |
| Trigger Queue | List view w/ tabs | Split feed + detail | Grid queue + reviewer sidebar |
| Policy Review | Full tabs | Tab + diff modal | Tabs + fixed approval rail |
| Simulation Results | Expandable drawer | Side tab panel | Tabs + full YAML viewer |

---

## ✅ Summary

> 🔁 Layout tokens and container spacing should be mapped to Tailwind utility classes and design tokens for long-term maintainability and consistent component rendering.
These layout rules and templates ensure that all views in Forgeborn’s UI scale properly, respect semantic zones, and reuse components in predictable ways. This system supports design velocity, code reusability, and role-based consistency across trust enforcement, simulation, and review interfaces.
>