# 🧱 Forgeborn Architecture Overview

This document provides a high-level view of the Forgeborn platform architecture.

## Core Modules

- **agents/**: Autonomous workers responsible for specific tasks.
- **blueprints/**: YAML-based plans that define execution intent.
- **cli/**: The command-line interface for interacting with Forgeborn.
- **skills/**: Pluggable functional units used by agents.
- **rcs/**: Release candidates for blueprint and plan versions.

## Architecture Diagram

_📌 Include a diagram here using Mermaid or similar tool._

## System Flow

1. `factory new` CLI command creates a blueprint.
2. Agents read and execute plans from the blueprint.
3. Skills are invoked during execution.
4. Logs and traces are stored in Supabase.