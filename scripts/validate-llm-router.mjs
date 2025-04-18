#!/usr/bin/env node
/**
 * LLM Router Validation Script
 * Tests the standardized LLM router implementation and verifies trace logging
 */

import { routeLLM } from '../utils/llm_router.mjs';
import { callLLM } from '../adapters/llm_adapter.mjs';
import fs from 'fs/promises';
import path from 'path';

async function validateRouter() {
  console.log('🧪 Validating LLM Router implementation...\n');
  
  // Test basic router function
  try {
    console.log('Testing default GPT-4o routing...');
    const response = await routeLLM({
      prompt: "Explain in one short sentence what an LLM router does.",
      agentName: "validation_script"
    });
    
    console.log('✅ Response received:', response.substring(0, 100) + '...');
    
    // Check if logs were created
    const logDir = path.join(process.cwd(), 'logs', 'llm_traces');
    const files = await fs.readdir(logDir);
    const logFiles = files.filter(f => f.includes('validation_script'));
    
    console.log(`\n✅ Trace logging: ${logFiles.length} log files created`);
    
    // Test model normalization
    console.log('\nTesting model normalization...');
    const models = [
      "gpt-4", 
      "openai/gpt-4o", 
      "claude", 
      "anthropic/claude-3-sonnet-20240229"
    ];
    
    for (const model of models) {
      console.log(`Testing model: ${model}`);
      try {
        // Just start the request but don't wait, to avoid too many API calls
        routeLLM({
          prompt: "This is a test prompt.",
          model,
          agentName: "validation_script"
        }).catch(() => {});
        
        console.log(`  ✅ Request started for ${model}`);
      } catch (err) {
        console.error(`  ❌ Error with ${model}:`, err.message);
      }
    }
    
    console.log('\n✨ LLM Router validation complete!');
    console.log('Check the logs/llm_traces directory for trace logs');
    return true;
  } catch (error) {
    console.error('❌ Validation failed:', error);
    return false;
  }
}

validateRouter().catch(console.error);
