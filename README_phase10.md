
# Phase 10 – Multi-Model Execution & Adapter Optimization

## Components
- `llm_selector_agent_v1`: Selects top-ranked LLM based on task
- `fallback_adapter_skill.mjs`: Adds robust fallback between LLMs
- Adapter and skill system integration with `callLLM()`

## Run the selector agent:
```bash
node agents/llm_selector_agent_v1/run_llm_selector_agent_v1.mjs
```

## Use fallback logic:
```js
import { fallbackAdapterSkill } from "../../skills/fallback_adapter_skill.mjs";
const result = await fallbackAdapterSkill({
  prompt: "Summarize this document.",
  primary: "claude-3-opus-20240229",
  backup: "gpt-4o",
  callLLM
});
```
