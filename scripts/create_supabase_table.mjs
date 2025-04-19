#!/usr/bin/env node
// scripts/create_supabase_table.mjs
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Load environment variables
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '../agents/llmmanager/.env');
dotenv.config({ path: envPath });

// Log startup information
console.log('🔧 Supabase Table Creation Utility');
console.log('──────────────────────────────────');

// Hardcode the values directly from .env to ensure they're available
const supabaseUrl = process.env.SUPABASE_URL || 'https://psbvjpvbhpgsnggbptfa.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzYnZqcHZiaHBnc25nZ2JwdGZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MDU0OTgsImV4cCI6MjA2MDM4MTQ5OH0.7_hh6nYiWj8FjvHc3JfoUjK8j7wftiVLyN9mciwwESg';

console.log('Connection Info:');
console.log(`  URL: ${supabaseUrl}`);
console.log(`  Key type: ${supabaseKey.includes('role":"anon"') ? 'Anonymous Key (limited permissions)' : 'Service Key'}`);

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// SQL for creating the llm_logs table
const createTableSQL = `
create table if not exists llm_logs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default timezone('utc'::text, now()),
  input text,
  output jsonb,
  model text,
  provider text,
  latency_ms integer,
  status text,
  task text
);

create index if not exists idx_llm_logs_created_at on llm_logs(created_at desc);
`;

// Function to validate connection by making a simple query
async function validateConnection() {
  try {
    const { data, error } = await supabase.from('_pgsodium_key__key_id_seq').select('*').limit(1);
    
    if (error) {
      // This is expected - we can't access internal tables, but it confirms the connection works
      return !error.message.includes('connection');
    }
    
    return true;
  } catch (err) {
    console.error('Connection test failed:', err.message);
    return false;
  }
}

// Try to create the table using different methods
async function createTable() {
  console.log('\n📋 Attempting to create llm_logs table...');
  
  // Check connection first
  const isConnected = await validateConnection();
  if (!isConnected) {
    console.error('❌ Failed to connect to Supabase. Please check your URL and key.');
    return false;
  }
  
  console.log('✅ Connection to Supabase successful');
  
  // Method 1: Try using SQL function (if available)
  try {
    console.log('\n🔍 Method 1: Using rpc(\'exec_sql\')...');
    const { data, error } = await supabase.rpc('exec_sql', { sql: createTableSQL });
    
    if (error) {
      console.log(`⚠️ Method 1 failed: ${error.message}`);
    } else {
      console.log('✅ Table created successfully using Method 1!');
      return true;
    }
  } catch (err) {
    console.log(`⚠️ Method 1 failed: ${err.message}`);
  }
  
  // Method 2: Try using REST API to execute SQL
  try {
    console.log('\n🔍 Method 2: Using REST API...');
    const { data, error } = await supabase.from('_sql').rpc('run', { query: createTableSQL });
    
    if (error) {
      console.log(`⚠️ Method 2 failed: ${error.message}`);
    } else {
      console.log('✅ Table created successfully using Method 2!');
      return true;
    }
  } catch (err) {
    console.log(`⚠️ Method 2 failed: ${err.message}`);
  }
  
  // Method 3: Try direct query method
  try {
    console.log('\n🔍 Method 3: Using direct query...');
    const { data, error } = await supabase.auth.getUser();
    
    if (error) {
      console.log(`⚠️ Auth check failed: ${error.message}`);
    } else {
      console.log(`ℹ️ Connected as ${data.user ? data.user.email || data.user.id : 'anonymous'}`);
      
      const response = await fetch(`${supabaseUrl}/rest/v1/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`
        },
        body: JSON.stringify({ query: createTableSQL })
      });
      
      if (response.ok) {
        console.log('✅ Table created successfully using Method 3!');
        return true;
      } else {
        console.log(`⚠️ Method 3 failed: ${await response.text()}`);
      }
    }
  } catch (err) {
    console.log(`⚠️ Method 3 failed: ${err.message}`);
  }
  
  return false;
}

// Try to check if the table already exists
async function checkTableExists() {
  try {
    console.log('\n🔍 Checking if llm_logs table already exists...');
    const { data, error } = await supabase.from('llm_logs').select('*').limit(1);
    
    if (error) {
      if (error.code === '42P01') { // Table doesn't exist
        console.log('ℹ️ Table does not exist yet');
        return false;
      } else {
        console.log(`⚠️ Error checking table: ${error.message}`);
        return null; // Unknown status
      }
    } else {
      console.log('✅ Table already exists!');
      return true;
    }
  } catch (err) {
    console.log(`⚠️ Error checking table: ${err.message}`);
    return null; // Unknown status
  }
}

// Main function
async function main() {
  const tableExists = await checkTableExists();
  
  if (tableExists === true) {
    // Table already exists, no need to create it
    console.log('\n✅ The llm_logs table is already set up and ready to use!');
  } else if (tableExists === false) {
    // Table doesn't exist, try to create it
    const created = await createTable();
    
    if (!created) {
      console.log('\n❌ Failed to create table. This is likely due to permission issues.');
      console.log('\n📝 RECOMMENDATION:');
      console.log('1. Log in to your Supabase dashboard at: https://app.supabase.io');
      console.log('2. Go to Project Settings > API');
      console.log('3. Use the SQL Editor to execute this SQL directly:');
      console.log('\n```sql');
      console.log(createTableSQL);
      console.log('```');
      console.log('\n4. Alternatively, update your .env to use a service_role key instead of anon key');
    }
  } else {
    // Unknown status
    console.log('\n❓ Unable to determine if the table exists.');
  }
}

// Run the main function
main().catch(err => {
  console.error('\n💥 Fatal error:', err);
  process.exit(1);
});
