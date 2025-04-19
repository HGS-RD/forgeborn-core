# 🤝 UI/UX Contribution Guide

This document outlines how to contribute changes to the Forgeborn UI system.

## 🛠️ Contributing Code
- All PRs must cite a relevant design spec:
  - Example: `Relates to [Component Library Map]`
- Update or create component test cases if changing UI behavior
- Verify behavior in both light and dark themes

## 📚 Contributing Docs
- New components must be listed in `component_registry.yaml`
- Document usage if a new component is composed from Tailwind UI
- Match tokens to `theme_and_accessibility.md`

## 🔒 CI Enforcement
- UI tests may enforce schema presence, accessibility tags, and token compliance
