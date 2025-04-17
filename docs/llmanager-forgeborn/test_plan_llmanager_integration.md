# ✅ Test Plan: llmanager Integration

## Objectives
- Validate agent execution in isolated Forgeborn agent loop
- Ensure compatible tracing + memory logging
- Compare output parity between standalone llmanager and Forgeborn runtime

## Tests

### 🔹 LLM Agent Load Test
- Load a cloned agent from llmanager into skill_loader_agent_v1
- Verify skill schema, execution chain, and logging

### 🔹 Memory + Trace Insertion Test
- Run an LLM agent
- Ensure output appears in `memory/execution_trace_*.yaml` and Supabase

### 🔹 Fork Autonomy Compatibility
- Simulate autonomous loop using blueprint + evaluation agent
- Evaluate agent performance routing compared to Forgeborn native agents

## Metrics to Watch
- Execution latency
- Number of failed agent attempts
- Supabase record insertions

