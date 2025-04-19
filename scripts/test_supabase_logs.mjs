// scripts/test_supabase_logs.mjs
import { supabase } from '../agents/llmmanager/utils/supabase_client.mjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from the llmmanager directory
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '../agents/llmmanager/.env');
dotenv.config({ path: envPath });

const sampleLogs = [
  {
    agent: "llmmanager",
    level: "INFO",
    message: "Agent initialized successfully",
    timestamp: new Date().toISOString()
  },
  {
    agent: "completion_agent",
    level: "DEBUG",
    message: "Processing user request: 'Generate a summary of quantum computing'",
    timestamp: new Date(Date.now() - 60000).toISOString()
  },
  {
    agent: "orchestrator",
    level: "INFO",
    message: "Task distributed to workers",
    timestamp: new Date(Date.now() - 120000).toISOString()
  },
  {
    agent: "validator",
    level: "WARNING",
    message: "Response quality below threshold (0.68)",
    timestamp: new Date(Date.now() - 180000).toISOString()
  },
  {
    agent: "llmmanager",
    level: "ERROR",
    message: "Failed to connect to LLM API: Rate limit exceeded",
    timestamp: new Date(Date.now() - 240000).toISOString()
  }
];

async function checkOrCreateTable() {
  console.log("🔍 Checking if llm_logs table exists...");
  
  try {
    // Try to select a single row to check if the table exists
    const { error } = await supabase
      .from('llm_logs')
      .select('*')
      .limit(1);
    
    if (error) {
      if (error.code === '42P01') { // Table doesn't exist
        console.log("⚠️ Table 'llm_logs' doesn't exist. Creating it now...");
        
        // Use Supabase SQL to create the table (this requires storage admin privileges)
        const { error: createError } = await supabase.rpc('create_llm_logs_table');
        
        if (createError) {
          console.error("❌ Error creating table:", createError);
          console.log("⚙️ Attempting to use direct SQL query...");
          
          // Alternative approach using SQL query
          const { error: sqlError } = await supabase.rpc('execute_sql', {
            query: `
              CREATE TABLE IF NOT EXISTS llm_logs (
                id SERIAL PRIMARY KEY,
                agent TEXT NOT NULL,
                level TEXT NOT NULL,
                message TEXT NOT NULL,
                timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                metadata JSONB
              );
            `
          });
          
          if (sqlError) {
            console.error("❌ Error executing SQL:", sqlError);
            return false;
          }
        }
        
        console.log("✅ Table created successfully");
        return true;
      } else {
        console.error("❌ Error checking table:", error);
        return false;
      }
    } else {
      console.log("✅ Table 'llm_logs' exists");
      return true;
    }
  } catch (err) {
    console.error("❌ Unexpected error:", err);
    return false;
  }
}

async function insertTestLogs() {
  console.log("🔧 Inserting test logs into Supabase...");
  
  try {
    const { data, error } = await supabase
      .from('llm_logs')
      .insert(sampleLogs)
      .select();
    
    if (error) {
      console.error("❌ Error inserting logs. Details:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      console.error("Error details:", error.details);
      return;
    }
    
    console.log(`✅ Successfully inserted ${data?.length || 0} test log entries`);
    console.log("Sample log:", data?.[0] || "No data returned");
  } catch (err) {
    console.error("❌ Unexpected error:", err);
  }
}

// Execute the functions
async function main() {
  // First check if the table exists, and create it if it doesn't
  const tableExists = await checkOrCreateTable();
  if (tableExists) {
    // Only try to insert logs if the table exists or was created successfully
    await insertTestLogs();
  }
  console.log("🏁 Test complete");
  process.exit(0);
}

main().catch(err => {
  console.error("💥 Fatal error:", err);
  process.exit(1);
});
