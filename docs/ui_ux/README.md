# 🧭 Forgeborn UI/UX System README

This design system powers the Forgeborn Trust Governance Platform. It includes:

## 📁 Structure
- `personas/`: User roles and UI needs
- `ia/`: Navigation routes and stage mapping
- `components/`: UI parts and reusable layout patterns
- `integration/`: Trust CLI and data-state maps
- `theme_and_accessibility`: Tokens and compliance rules (WCAG 2.1)

## 🎨 Usage
Use `theme_and_accessibility` as the reference for Tailwind tokens and accessibility. Integrate directly into your component styling.

## 🧪 Quick Start
```sh
# Install Tailwind and link token config
npm install tailwindcss
cp ui-ux-tokens.tailwind.config.js tailwind.config.js
```
