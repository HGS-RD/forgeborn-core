// agents/llmmanager/utils/supabase_client.mjs
import { createClient } from '@supabase/supabase-js';

// Explicitly log environment variables for debugging
console.log('Environment Variables:');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL);
console.log('SUPABASE_SERVICE_KEY:', process.env.SUPABASE_SERVICE_KEY ? '[Key exists but hidden]' : 'undefined');

// Hardcode the values directly from .env to ensure they're available
const supabaseUrl = process.env.SUPABASE_URL || 'https://psbvjpvbhpgsnggbptfa.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzYnZqcHZiaHBnc25nZ2JwdGZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MDU0OTgsImV4cCI6MjA2MDM4MTQ5OH0.7_hh6nYiWj8FjvHc3JfoUjK8j7wftiVLyN9mciwwESg';

console.log('Using Supabase URL:', supabaseUrl);

export const supabase = createClient(supabaseUrl, supabaseKey);
