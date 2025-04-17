# Forgeborn Development Plan – Open Work (v2)

**Date:** April 17, 2025  
**Owner:** Roger Hill  
**Architect:** ChatGPT  
**Focus:** Phases 11–20 from Roadmap v2

## Overview

This document captures all remaining development work for `forgeborn-core`, covering:
- Intelligent LLM routing via `llmmanager`
- Role-based UX dashboards
- Self-healing blueprint execution
- DevOps integration agents
- Supabase-based memory, log, and secret persistence

## Phase Breakdown

(Condensed here for brevity — full breakdown available in the roadmap document. See bundled files.)

| Phase | Component                         | Timeline   |
|-------|-----------------------------------|------------|
| 11    | LLMManager Integration            | 3–5 days   |
| 12    | Model Feedback Strategy Agent     | 3–4 days   |
| 13    | Dashboard Wiring (Live Data)      | 3–4 days   |
| 14    | Execution Timeline + Diff View    | 5–6 days   |
| 15    | DevOps + Secrets Agents           | 4–6 days   |
| 16    | Self-Healing Execution Loop       | 5 days     |
| 17    | Role-Based UI/UX Views            | 3 days     |
| 18    | Supabase RBAC + Secrets Vault     | 3–4 days   |
| 19    | Cycle-Level Blueprint Evaluation  | 4 days     |
| 20    | Bundled Export + Remote Replays   | 3 days     |

## Notes
- Phases 11–13 can start in parallel.
- Recommended to run `factory plan` and `meta_orchestrator` post-Phase 13 to regenerate priorities.

