import { StateGraph } from "@langchain/langgraph";

export class LLMManager {
  constructor() {
    this.name = "LLMManager";
  }

  async process(input) {
    return {
      output: `LLMManager processed: ${input}`,
      timestamp: new Date().toISOString()
    };
  }
}

export function buildGraph() {
  const graph = new StateGraph({
    channels: {
      input: {
        value: null,
      },
      output: {
        value: null,
      },
    },
  });

  const manager = new LLMManager();

  graph.addNode("llm_manager", async (state) => {
    const input = state.input;
    const result = await manager.process(input);
    return { output: result };
  });

  graph.setEntryPoint("llm_manager");
  graph.setFinishPoint("llm_manager");

  return graph.compile();
}
