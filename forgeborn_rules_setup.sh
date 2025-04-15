
#!/bin/bash

# Step 1: Add fix:rules script to package.json if not already there
echo "🛠️  Updating package.json with fix:rules..."

node -e "
const fs = require('fs');
const pkgPath = './package.json';
const pkg = JSON.parse(fs.readFileSync(pkgPath));
pkg.scripts['fix:rules'] = 'node scripts/rule_check.mjs --fix';
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
"

# Step 2: Write GitHub Action for check:rules CI
echo "⚙️  Creating GitHub Actions CI workflow..."

mkdir -p .github/workflows
cat << 'EOF' > .github/workflows/rule-check.yml
name: Forgeborn Rule Compliance

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  rule-check:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install

      - name: Run rule check
        run: npm run check:rules
EOF

# Step 3: Update rule_check.mjs to allow exceptions
echo "🔍 Updating rule_check.mjs to allow README.md..."

sed -i '' 's/const allowedExtensions = \[.*\]/const allowedExtensions = [".mjs", ".md"]/' scripts/rule_check.mjs
sed -i '' 's/const requiredExtensions = \[".mjs"\]/const requiredExtensions = [".mjs"]/' scripts/rule_check.mjs

echo "✅ All steps complete!"
