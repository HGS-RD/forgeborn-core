# UI Stage Layouts for UADL Navigation

**Location:** /docs/ui_ux/ui_stage_layouts.md  
**Author:** ChatGPT (Software Architect)  
**For:** Forgeborn Phase 19 – UI Navigation & Layout Planning  
**Last Updated:** 2025-04-19

---

## 🎯 Purpose
This document defines the visual and structural layout requirements for each UADL (Understand, Assess, Design, Launch, Optimize) stage within the Forgeborn dashboard. It serves as the source of truth for Phase 19 UI planning and should be referenced by both frontend developers and agents.

---

## 🧭 Stage Overview

### 1. Understand
- **Panel Components**:
  - `StageOverviewCard`
  - `TriggerEventsTimeline`
  - `DocumentLinkList`
- **Sidebar Items**:
  - System context overview
  - Uploaded artifacts summary
- **Main Canvas**:
  - Summary of blueprint triggers + document map

### 2. Assess
- **Panel Components**:
  - `AssessmentMatrix`
  - `RiskCardDeck`
  - `MemoryBrowser`
- **Sidebar Items**:
  - Risk level filters
  - Access to long_term_memory.json
- **Main Canvas**:
  - Visualized maturity, compliance, and system gaps

### 3. Design
- **Panel Components**:
  - `PlanningCanvas`
  - `TaskNodeList`
  - `BlueprintPreview`
- **Sidebar Items**:
  - Editable blueprint tree
  - Node group toggles
- **Main Canvas**:
  - Layout planner and active blueprint viewer

### 4. Launch
- **Panel Components**:
  - `ExecutionProgressChart`
  - `AgentRunLogView`
  - `CICDChecklist`
- **Sidebar Items**:
  - GitHub PR status
  - Deploy manifest toggle
- **Main Canvas**:
  - Visual CI/CD execution progress timeline

### 5. Optimize
- **Panel Components**:
  - `ReflectionLogTable`
  - `PatchGeneratorUI`
  - `MetricSnapshotView`
- **Sidebar Items**:
  - Patch diff selector
  - Reflection summary access
- **Main Canvas**:
  - Loop optimization and agent feedback flow

---

## 🧩 Shared UI Requirements
- All stages must support light/dark mode.
- Each panel should accept data via YAML or JSON artifacts.
- Navigation pane must reflect current UADL stage context.
- Components must map to a corresponding Catalyst-compatible layout.

---

## 🧪 Artifact Inputs per Stage
| Stage | Required Files |
|-------|----------------|
| Understand | `trigger_log.yaml`, `uploaded_docs_index.json` |
| Assess     | `long_term_memory.json`, `evaluation_report.md` |
| Design     | `planning_agent_output.yaml`, `task_nodes.yaml` |
| Launch     | `ci_results.json`, `deploy_manifest.yaml` |
| Optimize   | `reflection_summary.yaml`, `patch_diff.yaml` |

---

## 📎 Related Documents
- [Navigation Map](./navigation_map.md)
- [Roadmap](../roadmap.md)
- [Development Plan](../development_plan.md)
