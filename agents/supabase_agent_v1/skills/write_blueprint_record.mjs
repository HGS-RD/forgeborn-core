import { supabase } from '../../../clients/supabase_client.mjs';

export async function writeBlueprintRecord({ rc_id, content, source }) {
  const { error } = await supabase.from('forgeborn.blueprints').insert([{ rc_id, content, source }]);
  return error ? { status: "error", error } : { status: "saved" };
}
