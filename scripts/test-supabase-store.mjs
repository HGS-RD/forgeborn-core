// File: /Users/rogerhill/Documents/GitHub/forgeborn-core/scripts/test-supabase-store.mjs

import { supabaseStore } from '../agents/llmmanager/src/utils/supabase-client.mjs';

const test = async () => {
  const testKey = 'test-store-key';
  const testValue = { message: 'This is a test value' };

  try {
    await supabaseStore.set(testKey, testValue);
    const result = await supabaseStore.get(testKey);
    console.log('Retrieved:', result);
    await supabaseStore.delete(testKey);
    console.log('Test completed successfully.');
  } catch (err) {
    console.error('❌ Supabase store test failed:', err);
  }
};

test();
