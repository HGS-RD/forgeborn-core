#!/bin/bash
echo "🚀 Running Governance Observer and displaying YAML summary..."
node agents/governance_observer_agent_v1/run_governance_observer_agent_v1.mjs
cat logs/governance_summary.yaml
