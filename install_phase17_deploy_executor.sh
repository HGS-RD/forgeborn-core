#!/bin/bash
echo "📦 Installing Phase 17 Deployment Executor Bundle..."

unzip -o ~/Downloads/phase17_deploy_executor_bundle.zip -d $(pwd)

echo "🔍 Running compliance check..."
npm run check:rules

echo "✅ Phase 17 installed. To execute:"
echo "   node agents/deploy_executor_agent_v1/run_deploy_executor_agent_v1.mjs production"
