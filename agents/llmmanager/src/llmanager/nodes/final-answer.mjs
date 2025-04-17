import { z } from "zod";
import { loadModelFromConfig } from "../../utils/model.mjs";

const FINAL_ANSWER_PROMPT = `You're a highly advanced AI manager, tasked with approving or rejecting one of your employees requests.

Here is the users request:
{REQUEST}

To assist with this task, you're provided with the following context:
- Examples of previous requests, along with their outcomes.
- Reflections you've made on previous requests.
- Approval criteria on what types of requests should be approved.
- Rejection criteria on what types of requests should be rejected.

{CONTEXT}

Finally, you are also given a detailed reasoning report into why the request should be approved or rejected.
{REASONING}

Once again, here is the user's request:
{REQUEST}

Ensure your answer is accurate, and accounts for all of the context provided above.
`;

export async function finalAnswer(state, config) {
  const finalAnswerSchema = z.object({
    explanation: z.string().describe("Detailed explanation for the final decision."),
    status: z.enum(["approved", "rejected"]).describe("The final decision."),
  });

  const formattedPrompt = FINAL_ANSWER_PROMPT.replace(
    "{CONTEXT}",
    state.promptContext,
  )
    .replace("{REASONING}", state.generatedReasoning)
    .replaceAll("{REQUEST}", state.query);

  const model = await loadModelFromConfig(config, {
    temperature: 0,
  });

  const modelWithTools = model.bindTools([
    {
      name: "finalAnswer",
      schema: finalAnswerSchema,
      description: "The explanation and final decision for the user's request.",
    },
  ]);

  const response = await modelWithTools.invoke([
    {
      role: "user",
      content: formattedPrompt,
    },
  ]);

  const toolCallArgs = response.tool_calls?.[0]?.args;
  if (!toolCallArgs) {
    throw new Error("No tool call found");
  }

  return {
    answer: finalAnswerSchema.parse(toolCallArgs),
  };
}
