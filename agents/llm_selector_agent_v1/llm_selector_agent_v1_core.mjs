
export class LLMSelectorAgent {
  constructor(task = "codegen", rankingFile = "./config/llm_ranking_config.yaml") {
    this.task = task;
    this.rankingFile = rankingFile;
  }

  async selectTopModel() {
    const fs = await import('fs/promises');
    const yaml = await import('js-yaml');
    const data = await fs.readFile(this.rankingFile, 'utf8');
    const parsed = yaml.load(data);
    const models = parsed[this.task] || [];

    return models.length > 0 ? models[0].model : "gpt-4o";
  }
}
