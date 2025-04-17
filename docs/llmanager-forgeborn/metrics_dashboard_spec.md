# 📊 Metrics Dashboard Spec

## Overview
This dashboard summarizes execution stats across Forgeborn + llm-core agents.

## Data Sources
- Supabase: `agent_runs`, `llm_logs`
- Filesystem: `memory/*.json`, `blueprints/*.yaml`

## Panels

### ✅ LLM Model Usage
- Breakdown by provider (Claude, Gemini, OpenAI, Grok)
- Top agents by model call frequency

### ⏱️ Execution Time
- Avg run time per agent
- Heatmap of call volume by hour

### 🧠 Strategy Performance
- Distribution of strategies returned by strategy_agent_v1
- Top 5 blueprint-driven output variants

