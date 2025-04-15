// Copyright (c) 2025 Hillstrong Group Security. All rights reserved.
// Use of this source code is governed by the custom license found in the LICENSE file.

# builder_agent_spec.md

modules:
  - path: run_builder_agent_v1.ts
    description: Entrypoint to launch the builder agent
    stub: runBuilderAgent

  - path: builder_agent_core.ts
    description: Core logic to analyze the spec and generate agent files
    stub: generateAgentCode

  - path: utils/spec_parser.ts
    description: Utility function to parse the spec YAML
    stub: parseSpec

  - path: utils/code_writer.ts
    description: Utility to write code files based on module structure
    stub: writeGeneratedCode
