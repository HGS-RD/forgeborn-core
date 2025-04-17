# ✨ Feature Spec - Forgeborn LLM Core Integration

## Features

### 🔁 Agent Registry Extension
- Load agents from YAML or in-code definitions
- Override with planning_agent_v1 suggestions

### 📥 Skill Runtime Adapter
- Standardize `.mjs` skill invocation from llmanager format

### 🧠 Multi-LLM Strategy Adapter
- Let strategy_agent_v1 rank which LLM model to use per task

### 🪵 Supabase Logging
- Log calls to `forgeborn.llm_logs`
- Record trace ID and RC tag for backreferencing

