import { supabase } from '../../../clients/supabase_client.mjs';

export async function logToSupabase({ rc_id, agent, message, level }) {
  const { error } = await supabase.from('forgeborn.logs').insert([{ rc_id, agent, message, level }]);
  return error ? { status: "error", error } : { status: "logged" };
}
