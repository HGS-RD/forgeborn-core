# Navigation Map for UADL Stages

**Location:** /docs/ui_ux/navigation_map.md  
**Author:** ChatGPT (Software Architect)  
**For:** Forgeborn Phase 19 – Catalyst UI Navigation Implementation  
**Last Updated:** 2025-04-19

---

## 🎯 Purpose
This document defines the navigational layout and routing structure for the Forgeborn dashboard across UADL stages. It provides the foundational schema for sidebar navigation, route mapping, and stage-to-panel alignment.

---

## 🧭 UADL Stage Routes
Each stage will be accessible via a top-level route, with subroutes for specific panels or functional views.

### Primary Routes
| Stage       | Route Path              | Sidebar Label     |
|-------------|-------------------------|-------------------|
| Understand  | `/stages/understand`    | Understand        |
| Assess      | `/stages/assess`        | Assess            |
| Design      | `/stages/design`        | Design            |
| Launch      | `/stages/launch`        | Launch            |
| Optimize    | `/stages/optimize`      | Optimize          |

---

## 🧩 Sidebar Navigation Map
Each stage supports the following sidebar sections for user context and data navigation.

| Stage     | Sidebar Sections                             |
|-----------|-----------------------------------------------|
| Understand| Context Overview, Trigger Logs, Uploaded Docs |
| Assess    | Risk Matrix, Memory Browser, Gaps & Issues    |
| Design    | Blueprint Tree, Tasks, Plan Overview          |
| Launch    | CI Results, Deployment Manifest, PR Overview  |
| Optimize  | Patch Diff, Reflection Logs, Metrics Snapshot |

---

## 🧱 Route → Component Map
Routes should mount dynamic layout wrappers per stage:

```tsx
<Route path="/stages/:stageId" element={<StageLayoutWrapper />}>
  <Route path="overview" element={<StageOverviewCard />} />
  <Route path="metrics" element={<MetricSnapshotView />} />
  <Route path="tasks" element={<TaskNodeList />} />
</Route>
```

Sidebar selections must drive URL state (e.g., `/stages/assess/metrics`).

---

## 💾 YAML-Driven Navigation
Navigation tree definitions will be driven from:
- `/docs/ui_ux/ui_stage_layouts.md`
- `task_nodes.yaml`
- `stage_nav_config.yaml` (TBD if needed)

The frontend UI will parse these files to dynamically render context-aware sidebars.

---

## 📎 Related Documents
- [UI Stage Layouts](./ui_stage_layouts.md)
- [Development Plan](../development_plan.md)
- [Roadmap](../roadmap.md)
