#!/bin/bash
echo "📦 Installing Phase 15 CI Validator Bundle..."
unzip ~/Downloads/phase15_ci_validator_bundle_20250418-033302.zip -d $(pwd)
npm run check:rules
echo "✅ Phase 15 installed. Run: node agents/ci_validator_agent_v1/run_ci_validator_agent_v1.mjs push"