# 🧱 Component Naming & Folder Structure Guide

This guide defines how to name and structure UI components in the Forgeborn repo.

## 📂 Directory Structure
```
src/
  components/
    ui/                # ShadCN UI components (source or customized)
    tailwind-ui/       # Tailwind UI-based layout components
    layout/            # Grid or shell templates (e.g., DashboardShell)
```

## 🔤 Naming Conventions
- Components should be **PascalCase**: `TriggerTile.tsx`, `BlueprintCard.tsx`
- Prefix composite components with their domain: `SimulationPanel.tsx`
- File should match the exported component name
