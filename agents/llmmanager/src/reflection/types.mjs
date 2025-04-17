import { Annotation } from "@langchain/langgraph";
import "@langchain/langgraph/zod";
import { z } from "zod";

/**
 * Runtime-safe reflection state annotations.
 */
export const ReflectionZodState = Annotation.Root({
  query: Annotation(),
  generatedReasoning: Annotation(),
  originalAnswer: Annotation(),
  editedAnswer: Annotation(),
  changeType: Annotation(),
  reflectionsSummary: Annotation(),
});

/**
 * Use these like:
 * - state.query
 * - update.originalAnswer
 */
export const ReflectionZodConfiguration = z.object({
  /**
   * The model ID to use for the reflection generation.
   * Should be in the format `provider/model_name`.
   * Defaults to `anthropic/claude-3-7-sonnet-latest`.
   */
  modelId: z.string().optional(),
});
