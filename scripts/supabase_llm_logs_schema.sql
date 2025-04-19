-- SQL script to create the llm_logs table in Supabase
-- Run this directly in the Supabase SQL Editor

-- Create the llm_logs table
CREATE TABLE IF NOT EXISTS llm_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  input TEXT,
  output JSONB,
  model TEXT,
  provider TEXT,
  latency_ms INTEGER,
  status TEXT,
  task TEXT
);

-- Create an index for faster timestamp-based querying
CREATE INDEX IF NOT EXISTS idx_llm_logs_created_at ON llm_logs(created_at DESC);

-- Add a comment to the table for documentation
COMMENT ON TABLE llm_logs IS 'Logs for LLM API calls with request and response data';

-- Sample insert (uncomment to add test data)
/*
INSERT INTO llm_logs (input, output, model, provider, latency_ms, status, task)
VALUES (
  'What is the capital of France?',
  '{"response": "The capital of France is Paris."}',
  'gpt-4',
  'openai',
  250,
  'success',
  'question_answering'
);
*/
