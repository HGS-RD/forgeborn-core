import { runBlueprintRepair } from './blueprint_repair_core.mjs';
runBlueprintRepair({
  original_blueprint: '../../blueprints/rc7_memory_graph_plan.yaml',
  reflection_log: '../../logs/reflection_summary_rc7.yaml'
});
