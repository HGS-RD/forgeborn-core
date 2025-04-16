import { repairBlueprint } from './skills/repair_blueprint_from_logs.mjs';

export async function runBlueprintRepair(ctx) {
  return await repairBlueprint(ctx);
}
