#!/bin/bash

echo "📦 Unzipping Phase 9 LLM Strategy Bundle..."
unzip -o ~/Downloads/phase9_llm_strategy_bundle.zip -d . || { echo "❌ Failed to unzip"; exit 1; }

echo "📁 Unpacked strategy agents and config files into ./agents/ and ./skills/"
echo "🧹 Cleaning up legacy .ts files..."

# Remove all .ts files from agents directory
find ./agents -type f -name "*.ts" -exec rm -f {} \;

# Run the compliance check
echo "🔍 Running compliance check against rules.md..."
npm run check:rules || { echo "❌ Rule check failed"; exit 1; }

echo ""
echo "✅ Phase 9 bundle is installed."
echo ""
echo "🧠 To run the LLM strategy ranking and selection agent, use:"
echo "   node agents/llm_ranking_agent_v1/run_llm_ranking_agent_v1.mjs"
