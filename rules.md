# Forgeborn Agent System – Consistency and Naming Rules

This document defines **code conventions** and **naming rules** for all agents, packages, and project-level practices to ensure architectural integrity and maintainability.

---

## 1. 📁 Directory Structure

Each agent MUST reside in its own folder under `/agents/`, named using the following convention:

```
<agent_type>_agent_v<version>
e.g. planner_agent_v2, devops_agent_v1
```

Each folder MUST contain:

- `package.json`
- `tsconfig.json`
- `run_<agent_type>_agent_v<version>.ts`
- `<agent_type>_agent_core.ts`
- `README.md` (optional but encouraged)

---

## 2. 📄 File Naming Rules

| Purpose                        | File Name                                 | Notes                                  |
|-------------------------------|--------------------------------------------|----------------------------------------|
| Core logic                    | `<agent_type>_agent_core.ts`              | The primary class logic of the agent   |
| Entrypoint for execution      | `run_<agent_type>_agent_v<version>.ts`    | Always separate from core logic        |
| Test scripts (if used)        | `test_<agent_type>.ts`                    | Unit or integration test entrypoint    |
| Supporting utils              | `utils/`, `strategies/`, or `adapters/`   | Group supporting files in subfolders   |

Do NOT place runnable code directly in `core.ts`. It should be class-based and invoked via the `run_*.ts` entrypoint.

---

## 3. 🧠 Class Naming Convention

The main agent class should always follow this structure:

```ts
export class <AgentType>Agent {
  ...
}
```

Example:

```ts
export class PlannerAgent { ... }
export class DevOpsAgent { ... }
```

The constructor must always accept:

```ts
constructor(goal: string, inputDocs: string[] | string)
```

---

## 4. 🏃 Entrypoint Structure

Entrypoint files (`run_*.ts`) must:

- Log initialization clearly
- Create the agent using `goal` and `inputDocs`
- Call the appropriate method (`run()`, `generatePlan()`, `optimizeBlueprint()`, etc.)

Example:

```ts
import { PlannerAgent } from "./planner_agent_core.ts";

const goal = "Generate RC plan";
const inputDocs = ["../../blueprints/optimized_blueprint_v2.yaml"];

async function main() {
  const agent = new PlannerAgent(goal, inputDocs[0]);
  const result = await agent.generatePlan();
  console.log("✅ Output written to:", result);
}

main().catch(console.error);
```

---

## 5. 🧪 TypeScript and Module Settings

- Use `type: "module"` in `package.json`
- Use `.ts` extensions in all import paths
- Use `ts-node` with `--loader ts-node/esm`
- Always define types (`string[]`, `any[]`, `Promise<string>`, etc.)
- Disable `__dirname` errors with:

```ts
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
```

---

## 6. 🔒 Security

- Never hardcode secrets in `.ts` files
- Use `.env` or `supabase_config.sh` + `dotenv/config`
- Sanitize any Supabase or LLM logs before logging

---

## 7. 📦 Commit Practices

- Use semantic commit prefixes:
  - `feat:` for features
  - `fix:` for bug fixes
  - `chore:` for housekeeping
  - `refactor:` for rewrites
- Always stage `package-lock.json` if dependencies change
- Prefer atomic commits per agent update

---

## 8. 🔁 Naming Consistency

Use this pattern throughout:
- `planner_agent_v1`
- `PlannerAgent` (class)
- `planner_agent_core.ts` (core logic)
- `run_planner_agent_v1.ts` (entrypoint)

---

By following these rules, the Forgeborn project will remain consistent, maintainable, and easily scalable as agent complexity grows.
