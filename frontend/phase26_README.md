# Phase 26 – UI Patch Bundle

This patch fixes the Tailwind CSS visibility issue in the Forgeborn frontend.

## ✅ Summary

- Converts `postcss.config.js` to ESM-safe `postcss.config.cjs`
- Ensures Tailwind loads properly with Vite using `"type": "module"`

## 📦 Files Included

- `frontend/postcss.config.cjs`
- `phase26_README.md`

## 🚀 How to Apply

```bash
cd ~/Documents/GitHub/forgeborn-core/frontend

# Remove broken JS config
rm postcss.config.js

# Unzip the bundle
unzip ~/Downloads/phase26_ui_patch_bundle.zip -d ../

# Clean install and run
rm -rf node_modules
npm install
npm run dev
```

This will restore Tailwind styling and let you continue with visual polish and dashboard design.

— Forgeborn Software Architect
