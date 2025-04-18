// agents/llm_test_agent_v1/llm_test_agent_v1_core.mjs

export class LLMTestAgent {
    constructor(prompt = "Test prompt") {
      this.prompt = prompt;
    }
  
    run() {
      console.log("🧪 [LLMTestAgent] Running core logic with prompt:", this.prompt);
      return this.prompt;
    }
  }
  