export class LLMRankingAgent {
  constructor(models = [], taskType = 'codegen') {
    this.models = models;
    this.taskType = taskType;
  }

  async rank() {
    console.log(`📊 [LLMRankingAgent] Ranking models for task type: ${this.taskType}`);
    return this.models.map((model, index) => ({
      model,
      score: 100 - index * 10
    }));
  }
}
