import { embedAndStore } from './skills/embed_memory_chunk.mjs';

export async function runVectorAgent(context) {
  const result = await embedAndStore(context);
  return result;
}
