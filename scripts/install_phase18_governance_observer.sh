#!/bin/bash

echo "🚀 Installing Phase 18: Governance Observer Agent..."

# Ensure required directories exist
mkdir -p logs
mkdir -p config
mkdir -p skills
mkdir -p agents/governance_observer_agent_v1

# Display key files
echo "📂 Verifying agent directory:"
ls agents/governance_observer_agent_v1

# Reminder to add agent to self-optimize cycle, if desired
echo "✅ Governance Observer Agent installed."
echo "👉 You can now run: node agents/governance_observer_agent_v1/run_governance_observer_agent_v1.mjs"
