import { supabase } from '../../../clients/supabase_client.mjs';

export async function logLLMCall({ rc_id, model, task, result }) {
  const logData = {
    rc_id,
    agent: model,
    message: result?.slice(0, 100) || 'No output',
    level: task
  };

  console.log('🪵 Logging to Supabase with input:', JSON.stringify(logData, null, 2));

  const { error } = await supabase
    .from('llm_logs')  // ✅ FORCE correct schema
    .insert([logData]);

  if (error) {
    console.error('❌ Supabase insert error:', error);
  } else {
    console.log('✅ Supabase log written');
  }
}
