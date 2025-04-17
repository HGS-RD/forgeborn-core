import { Command, END, START, StateGraph } from "@langchain/langgraph";
import {
  ReflectionZodConfiguration,
  ReflectionZodState,
} from "./types.mjs";
import { fullReflection } from "./nodes/full-reflection.mjs";
import { explanationReflection } from "./nodes/explanation-reflection.mjs";
import { extractReflections } from "./nodes/extract-reflections.mjs";

/**
 * Routes the reflection based on the change type.
 */
function routeReflection(state) {
  if (state.changeType === "explanationChanged") {
    return new Command({
      goto: "explanation_reflection",
    });
  }
  return new Command({
    goto: "full_reflection",
  });
}

const workflow = new StateGraph(ReflectionZodState, ReflectionZodConfiguration)
  .addNode("routeReflection", routeReflection, {
    ends: ["full_reflection", "explanation_reflection"],
  })
  .addNode("full_reflection", fullReflection)
  .addNode("explanation_reflection", explanationReflection)
  .addNode("extract_reflections", extractReflections)
  .addEdge(START, "routeReflection")
  .addEdge("explanation_reflection", "extract_reflections")
  .addEdge("full_reflection", "extract_reflections")
  .addEdge("extract_reflections", END);

export const graph = workflow.compile();
graph.name = "Reflection Graph";
