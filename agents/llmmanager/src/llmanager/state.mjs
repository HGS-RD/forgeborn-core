import { Annotation } from "@langchain/langgraph";
import "@langchain/langgraph/zod";
import { z } from "zod";

export const AgentZodStateInput = Annotation.Root({
  query: Annotation(),  // ⛔️ Removed <string>
});

export const AgentZodState = Annotation.Root({
  ...AgentZodStateInput.spec,
  promptContext: Annotation(),
  generatedReasoning: Annotation(),
  answer: Annotation(), // Cannot express inline object here — must annotate later
});

// Optional: define more detail inside the LangGraph logic itself
// Or pass schema separately in planning

export const AgentZodConfiguration = z.object({
  approvalCriteria: z.string().optional(),
  rejectionCriteria: z.string().optional(),
  modelId: z.string().optional(),
});
