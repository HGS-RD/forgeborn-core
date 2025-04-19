# Theme & Accessibility Guidelines

# 🎨 Forgeborn Theme & Accessibility Guidelines

This document defines the color system, typography scale, dark/light theming, and accessibility targets used across the Forgeborn Trust Governance UI. It ensures clarity, role differentiation, and compliance with WCAG 2.1 AA standards across all governance interactions.

---

## 🎯 Purpose

- Provide a consistent, role-aware visual language across the dashboard
- Ensure high contrast, readable, and adaptable theming in both light and dark modes
- Comply with accessibility standards and ensure all trust states are distinguishable by vision and cognition

---

## 🌈 Color Tokens

| Token | Use Case | Light Mode | Dark Mode |
| --- | --- | --- | --- |
| `color-bg-base` | App background | #ffffff | #121212 |
| `color-bg-card` | Card surface | #f8f9fa | #1f1f1f |
| `color-text-primary` | Default text | #1a1a1a | #eaeaea |
| `color-text-muted` | Secondary/disabled text | #6b6b6b | #b3b3b3 |
| `color-border` | Card & modal outlines | #dcdcdc | #333333 |
| `color-accent-ctc` | CTO override badge | #003366 | #66b2ff |
| `color-accent-qa` | QA simulation badge | #3c763d | #9ae69a |
| `color-accent-sec` | Security ledger alert | #8a1538 | #ffc9d3 |
| `color-status-pending` | Yellow trust badge | #ffc107 | #ffeeaa |
| `color-status-success` | Green trust badge | #28a745 | #a7f3d0 |
| `color-status-fail` | Red trust badge | #dc3545 | #ff6b6b (use icon shape or suffix to visually distinguish simulation vs signature failure states) |

---

## 🔠 Typography Scale

| Token | Size | Usage |
| --- | --- | --- |
| `text-xl` | 20px | Section headings (sidebar, modals) |
| `text-lg` | 18px | Card and tile titles |
| `text-base` | 16px | Default body copy |
| `text-sm` | 14px | Labels, tooltips, badges |
| `text-xs` | 12px | Hints, helper text, YAML context lines (supports dynamic scaling based on user preference and YAML density toggles) |

Font stack: `"Inter", "Segoe UI", "Helvetica Neue", sans-serif`

---

## 🌒 Theme Support

- **Auto toggle** based on OS `prefers-color-scheme`
- Override toggle in topbar (`light`, `dark`, `auto`)
- Theme state persisted in local storage and optionally available via URL parameter or user profile setting for cross-device sync
- All contrast ratios ≥ 4.5:1 minimum (WCAG AA compliance). Enforced via component testing, design token contrast verification, and optional CI accessibility gating.
- Shadows reduced in dark mode to emphasize surface stacking

---

## 🧩 Accessibility Standards

| Feature | Requirement |
| --- | --- |
| Color contrast | 4.5:1 for text, 3:1 for non-text UI (e.g., icons) |
| Focus indicators | All interactive elements have clear, visible focus ring |
| Role labels | Buttons, nav items, cards include `aria-role`, `aria-label` |
| Keyboard nav | Fully tab-navigable through modals, triggers, review queue |
| Screen reader support | Status badges, reviewer states, and diffs include aria descriptions. Reviewer badge tooltips also surface this info visually for sighted users. |
| Alt text | All trust state and avatar icons have descriptive `alt` or `aria-label` tags |

---

## ✅ Summary

These theme and accessibility guidelines ensure the Forgeborn UI supports every persona, trust role, and visual state with consistency, clarity, and compliance. From trust scorecards to ledger reviews, all components are accessible, adaptive, and legible across devices and contexts.