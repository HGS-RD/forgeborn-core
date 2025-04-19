# 📐 UI Component Usage Conventions: Tailwind UI vs ShadCN UI

This guide defines how and when to use **Tailwind UI Pro** vs **ShadCN UI** components in Forgeborn.

## ✅ Use Tailwind UI For:
- Marketing pages
- Landing layouts
- Authentication flows
- Settings panels (where no trust interaction occurs)
- Basic navigation and footers

## ✅ Use ShadCN UI For:
- Reviewer approval flows
- Trigger queues and YAML artifact displays
- Simulation result tiles, blueprint scorecards
- Policy diff viewers (with Radix interactivity)
- Modal controls, tabs, and popovers with advanced state

## 🔧 Custom Hybrid Components:
When integrating Tailwind UI layout with ShadCN logic, wrap Tailwind UI components with ShadCN interactive behavior (e.g. dialog, tooltip, toast).
