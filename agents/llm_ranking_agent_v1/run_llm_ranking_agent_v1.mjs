import { LLMRankingAgent } from './llm_ranking_agent_v1_core.mjs';

const models = ['gpt-4o', 'claude-3-opus-20240229', 'gpt-3.5-turbo'];
const taskType = 'codegen';

async function main() {
  const agent = new LLMRankingAgent(models, taskType);
  const result = await agent.rank();
  console.log('🏆 Ranked Models:', result);
}

main().catch(console.error);
