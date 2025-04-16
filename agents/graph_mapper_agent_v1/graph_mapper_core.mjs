import { mapCodeGraph } from './skills/scan_codebase_for_graph.mjs';

export async function runGraphMapper(context) {
  return await mapCodeGraph(context);
}
