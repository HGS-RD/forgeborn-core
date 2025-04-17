import { END, START, StateGraph } from "@langchain/langgraph";
import { AgentZodConfiguration, AgentZodState } from "./state.mjs";
import { graph as reasoningGraph } from "../reasoning/index.mjs";
import { finalAnswer } from "./nodes/final-answer.mjs";
import { humanNode } from "./nodes/human-node.mjs";
import { graph as reflectionGraph } from "../reflection/index.mjs";

const workflow = new StateGraph(AgentZodState, AgentZodConfiguration)
  .addNode("reasoning", reasoningGraph)
  .addNode("final_answer", finalAnswer)
  .addNode("human_node", humanNode, {
    ends: ["reflection", END],
  })
  .addNode("reflection", reflectionGraph)
  .addEdge(START, "reasoning")
  .addEdge("reasoning", "final_answer")
  .addEdge("final_answer", "human_node")
  .addEdge("reflection", END);

export const graph = workflow.compile();
graph.name = "LLManager Graph";
