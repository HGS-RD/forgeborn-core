// Copyright (c) 2025 Hillstrong Group Security. All rights reserved.
// Use of this source code is governed by the custom license found in the LICENSE file.

# Blueprint: Scaffold builder_agent_v1 from spec

## Goal:
Generate the folder structure and starter implementation for `builder_agent_v1`, which analyzes a Markdown agent spec and generates agent source files.

## Functional Tasks:
1. Read a Markdown spec document
2. Parse the spec into modules/functions/files
3. Create folders and TypeScript files for each module
4. Populate code templates with stubbed content

## Inputs:
- `builder_agent_spec.md` (Markdown-formatted agent specification)

## Outputs:
- TypeScript files in `agents/builder_agent_v1/`
- Each file contains stub code and documentation header

## Notes:
- Use `utils/spec_parser.ts` to parse the spec
- Use `utils/code_writer.ts` to write files
- Follow the standard Forgeborn agent layout
