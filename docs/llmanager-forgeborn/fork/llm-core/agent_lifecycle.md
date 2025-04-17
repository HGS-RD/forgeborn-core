# ♻️ Agent Lifecycle - Forgeborn LLM Core

1. 🧬 Registered via planning_agent_v1 blueprint
2. 🛠️ Initialized via skill_loader_agent_v1
3. 📡 Calls `llm_router.mjs` with task context
4. 💾 Logs to Supabase via `log_llm_call.mjs`
5. 📦 Output is routed into memory, blueprint, or evaluation
