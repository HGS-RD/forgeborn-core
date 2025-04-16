import { logToSupabase } from './skills/log_to_supabase.mjs';
import { writeBlueprintRecord } from './skills/write_blueprint_record.mjs';

await logToSupabase({ rc_id: "RC8", agent: "meta_orchestrator", message: "Execution started", level: "info" });
await writeBlueprintRecord({ rc_id: "RC8", content: "goal: test supabase", source: "test_agent" });
