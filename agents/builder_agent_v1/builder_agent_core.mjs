// builder_agent_v1 core logic
import { generateCodeFromSpec } from './skills/generate_code_from_spec.mjs';
import { validateGeneratedCode } from './skills/validate_generated_code.mjs';

export async function runBuilderAgent(context) {
  const code = await generateCodeFromSpec(context);
  const result = await validateGeneratedCode(code);
  return result;
}
