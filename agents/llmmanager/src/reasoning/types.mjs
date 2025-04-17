// File: agents/llmmanager/src/reasoning/types.mjs

import { Annotation } from "@langchain/langgraph";
import "@langchain/langgraph/zod";
import { z } from "zod";

export const ReasoningZodState = Annotation.Root({
  query: Annotation(),
  generatedReasoning: Annotation(),
  promptContext: Annotation(),
});

// NOTE: TypeScript-only exports removed for ESM compatibility

export const ReasoningZodConfiguration = z.object({
  approvalCriteria: z.string().optional(),
  rejectionCriteria: z.string().optional(),
  modelId: z.string().optional(),
  assistant_id: z.string().optional(),
});
