#!/bin/bash

echo "📦 Unzipping Phase 8 Cognition Bundle..."
unzip -o ~/Downloads/phase8_cognition_bundle.zip -d .

echo "📁 Unpacked cognition agents and skills into ./agents/ and ./skills/"

echo "🧹 Cleaning up legacy .ts files..."
find ./agents -type f -name "*.ts" -exec rm -f {} \;

echo "🔍 Running compliance check against rules.md..."
npm run check:rules

echo ""
echo "✅ Phase 8 bundle is installed."
echo ""
echo "🧠 To run the cognitive repair and reflection cycle, use:"
echo "   node agents/reflection_agent_v1/run_reflection_agent_v1.mjs"
