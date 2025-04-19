# 💼 Tailwind UI Inventory for Forgeborn

This is a curated list of Tailwind UI components used in the Forgeborn interface.

## ✅ Used Tailwind UI Components
- `AuthCard` (sign in screen)
- `SidebarWithCollapsibleNav` (dashboard shell)
- `SectionHeader` (for compliance export views)
- `FormLayoutWithTabs` (used in settings view)
- `ActionListPanel` (non-governance tables)

## 🔄 Customization Rules
- Always refactor Tailwind UI components to match design tokens
- Avoid using Tailwind UI dialogs/popovers (replace with Radix/ShadCN)
- If component requires YAML awareness or interactivity → use ShadCN instead
