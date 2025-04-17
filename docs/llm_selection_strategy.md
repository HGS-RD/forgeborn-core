
# LLM Selection Strategy for Forgeborn

## Purpose

This document outlines the strategy used in the Forgeborn system to dynamically select the most suitable Large Language Model (LLM) based on task type, performance metrics, provider capabilities, and architectural constraints.

---

## 1. Overview

Forgeborn supports multiple LLMs from various providers, including:

- **OpenAI (e.g., GPT-4o)**
- **Anthropic (e.g., Claude 3.7)**
- **Google (e.g., Gemini Pro)**
- **xAI (e.g., Grok)**

---

## 2. Selection Criteria

### ✅ Task Category
Each task is classified into a defined category, such as:

- Code Generation
- Planning & Reasoning
- Summarization
- Extraction
- Classification
- Evaluation

### ✅ Performance Ranking
Each LLM is benchmarked and assigned scores per category:

- **Accuracy**
- **Latency**
- **Cost per token**
- **Context length support**
- **Tool usage / API calling ability**
- **Retrieval-Augmented Generation (RAG) support**

### ✅ Compatibility Matrix
A matrix is maintained to flag compatibility and alignment with:

- Internal prompt format
- Execution engine (e.g., Claude for planning agent, GPT-4o for blueprint repair)
- Memory capacity (long-context support)

---

## 3. Strategy Algorithm

```txt
1. Determine task category from blueprint or agent metadata.
2. Query `model_ranking.yaml` to get ranked list of LLMs.
3. Filter based on minimum latency or cost constraints.
4. Evaluate fallback and retry path if primary fails.
5. Return selected model and usage instructions to agent runtime.
```

---

## 4. Configuration

Configuration is stored in:

```bash
/config/llm/model_ranking.yaml
/config/llm/fallback_chains.yaml
```

These allow rapid updates without code redeployment.

---

## 5. Runtime Considerations

- Each agent receives `llm_strategy.mjs` as part of its execution context.
- The strategy module supports:
  - Forced overrides (e.g., use GPT-4o explicitly)
  - Silent fallback to a cheaper LLM for low-priority tasks
  - A/B testing configuration (e.g., test Claude vs GPT for blueprint scoring)

---

## 6. Governance

The **LLM Strategy Agent** audits performance logs and rotates preference models every `N` cycles.

The results are stored in Supabase under `forgeborn.llm_logs` with strategy metadata for transparency and traceability.

---

## 7. Future Enhancements

- Add token-cost-per-task tracking.
- Implement automatic regression testing per LLM upgrade.
- Develop UI dashboard to visualize strategy decisions in real-time.

---

## Conclusion

This LLM selection strategy ensures that Forgeborn delivers optimal performance, cost-efficiency, and model alignment for every agent-driven task. It is designed for extensibility, observability, and rapid evolution alongside the LLM landscape.
