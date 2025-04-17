
# Forgeborn Security Requirements Specification

## 1. Overview

This document outlines the security requirements for the Forgeborn autonomous software factory platform. It establishes the principles, practices, and specific controls required to protect the integrity, confidentiality, and availability of Forgeborn systems and data.

## 2. Security Objectives

- **Confidentiality**: Ensure that data (e.g., RC blueprints, agent logs, credentials) is accessible only to authorized components and users.
- **Integrity**: Guarantee that data and agent behaviors are not tampered with or altered maliciously.
- **Availability**: Maintain operational availability of critical services, agents, and APIs.
- **Auditability**: Provide detailed logs and traceability of agent actions, code changes, and execution histories.

## 3. Access Control

### 3.1 Role-Based Access Control (RBAC)
- Define developer, operator, auditor, and admin roles.
- Restrict write/modify access to agents, memory, and blueprints by role.
- Supabase table-level policies enforce schema-level RBAC for:
  - `llm_logs`
  - `blueprints`
  - `agent_runs`

### 3.2 GitHub Integration
- Use fine-grained GitHub personal access tokens (PAT) with minimal scopes.
- Tokens must be loaded from environment variables or a secret vault (not stored in `.json` files).

## 4. Data Protection

### 4.1 At-Rest
- Supabase data encrypted with PostgreSQL encryption.
- Tokens and API keys stored in `.env` with `.gitignore` enforcement.

### 4.2 In-Transit
- All communication between agents and LLM APIs must use HTTPS.
- All GitHub API calls over HTTPS.

## 5. API Security

- Supabase RLS must be enforced with explicit `INSERT`/`SELECT`/`UPDATE` policies per table.
- Only the `forgeborn` schema should be exposed to the Supabase REST API.
- Require `apikey` and `Authorization` headers for all external POST operations.

## 6. Secret Management

- Use `dotenv` for local development secrets.
- Plan migration to a cloud-native secrets vault (e.g., Supabase Edge Functions secrets, AWS Secrets Manager).
- Implement `secrets_agent_v1` to manage runtime token checks.

## 7. Agent Execution Security

- Memory write operations must be guarded by execution context (RC ID + agent hash).
- Add sandboxing for skill execution to limit access to Node.js globals.
- Trace logs must be written before and after every agent execution step.

## 8. CI/CD Security

- GitHub Actions must:
  - Avoid using secrets in logs.
  - Scan for secret leakage using GitHub’s push protection.
  - Require code review for all PR merges.
- Validate blueprint and skill changes before running CI-based builds.

## 9. Logging & Audit Trails

- Supabase `llm_logs`, `agent_runs`, `reflections`, and `blueprints` tables must be:
  - Immutable (append-only via RLS).
  - Queryable only by `auditor` roles or `supabase_service_key`.

## 10. Dependencies and Supply Chain

- Use `npm audit` and `dependabot` in GitHub Actions to scan for vulnerable packages.
- Pin all major dependencies and allow only patch version upgrades without review.

## 11. Future Enhancements

- Implement `security_meta_agent` to:
  - Analyze system configurations and enforce zero trust rules.
  - Alert on unusual access patterns.
- Integrate AI-powered anomaly detection via vector memory embeddings.

---

_This specification evolves with each phase of Forgeborn. All modifications must pass through governance review._
