# 🧭 Forgeborn UI/UX Documentation Hub

Welcome to the Forgeborn UI/UX system — this directory contains specifications, personas, navigation structures, layout rules, and trust-governance integrations for building and maintaining the Forgeborn interface.

---

## 📁 Document Index

### 🧑 Personas & Access Models
- [Persona Matrix](personas/forgeborn_persona_matrix.md)
- [Persona-to-Route Access Map](ia/nav_structure_definitions.md)

### 🧠 Information Architecture
- [IA Sitemap & Zones](ia/ia_sitemap_and_zones.md)
- [Nav Structure Definitions](ia/nav_structure_definitions.md)

### 🧱 UI Components & Layout
- [Component Library Map](components/component_library_map.md)
- [Layout Patterns & Templates](components/layout_patterns_templates.md)
- [Theme & Accessibility](components/theme_and_accessibility.md)

### 🔌 UI ↔ Governance Integration
- [State-to-Artifact Map](integration/state_to_artifact_map.md)
- [Dashboard Signal Stream Spec](integration/dashboard_signal_stream_spec.md)
- [trustcli-to-UI Hooks](integration/trustcli_to_ui_hooks.md)
- [Trigger Log Schema](integration/trigger_log_spec.md)

---

## 📦 Sample Governance Artifacts
This UI system is backed by production-ready YAML and JSON artifacts under:

```
/docs/specs/
```

Examples include:
- `trust_policy.yaml`
- `simulation_report.yaml`
- `trigger_log.yaml`
- `policy_change_log.yaml`
- `export-compliance.yaml`
- `reviewer_action_report.yaml`

These are the canonical data sources for UI rendering and CI validation.

---

## 🔁 Maintenance & Contributions
- All documentation here is versioned alongside core agents and CLI behavior
- Each spec has been reviewed for WCAG accessibility, governance accuracy, and real-time UI integration
- Use this folder to guide implementation in React, Tailwind, Figma, and CLI simulators

> To propose edits or new components, open a PR and include a link to the relevant markdown spec.
