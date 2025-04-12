# Forgeborn Core

Forgeborn is an AI-native software factory designed to autonomously plan, execute, evaluate, and evolve software systems using recursive agent loops.

## 🧠 Core Capabilities
- Accepts natural language goals via CLI (`factory`)
- Generates executable blueprints
- Executes agents to fulfill tasks:
  - Planning Agent
  - Evaluator Agent
  - Memory Steward
  - Docs Agent
  - Meta-Orchestrator
- Stores results in memory and trust logs
- Evolves the factory by closing recursive RC loops

## 🚀 Getting Started
```bash
factory new "Build a devops agent"
cd agent_execution_engine_v2
npm start
```

## 📂 Repo Structure
- `agents/` – modular agent implementations (TS-based)
- `blueprints/` – YAML-based RC instructions
- `rcs/` – Generated run candidate plans
- `logs/` – Evaluator output, trust scores, execution logs
- `memory/` – Chunked RC memory
- `docs/` – Self-generated documentation
- `orchestrator/` – Loop trace and governance logic
- `cli/` – Compiled factory CLI

## 🛡️ Security
All agents operate under trust evaluation and hallucination detection guardrails. Audit logs and memory persistence ensure reproducibility and safe self-modification.

## 🔁 Vision
The long-term goal of Forgeborn is to eliminate the gap between software ideation and production by enabling recursive AI-first development at scale.