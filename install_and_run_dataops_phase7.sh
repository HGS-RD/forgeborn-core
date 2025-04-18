#!/bin/bash

echo "📦 Unzipping Phase 7 DataOps Bundle..."
unzip -o ~/Downloads/phase7_dataops_bundle.zip -d .

echo "📁 Unpacked agent and utils files into ./agents/ and ./utils/"

echo "🧹 Cleaning up legacy .ts files..."
find ./agents -type f -name "*.ts" -exec rm -f {} \;

echo "🔍 Running compliance check against rules.md..."
npm run check:rules

echo ""
echo "✅ Phase 7 bundle is installed."
echo ""
echo "📡 To run the trace logging and memory pipeline, use:"
echo "   node agents/vector_agent_v1/run_vector_agent_v1.mjs"
echo ""
