import fs from 'fs/promises';

export async function generateMinimalSpec(agentName, outputPath) {
  const content = `# ${agentName}

**Description**: _Auto-generated spec file placeholder for ${agentName}_

## Inputs
- TBD

## Outputs
- TBD

## Status
auto-generated
`;

  await fs.writeFile(outputPath, content);
}
