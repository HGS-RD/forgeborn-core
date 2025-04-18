#!/usr/bin/env node
/**
 * Command line runner for llm_test_agent_v1
 */

import { testAllProviders, runLLMTest } from './llm_test_agent_v1.mjs';

const args = process.argv.slice(2);
const command = args[0]?.toLowerCase();

async function main() {
  console.log('🧪 LLM Test Agent v1');
  
  try {
    if (command === 'single' && args[1]) {
      // Test a single model
      const model = args[1];
      const prompt = args[2] || "Explain what an LLM router does in a few sentences.";
      
      console.log(`Testing model: ${model}`);
      console.log(`Prompt: ${prompt}`);
      
      const result = await runLLMTest({ prompt, model });
      console.log('\n📊 Test Result:');
      console.log(result);
      
      if (result.success) {
        console.log('\n✅ Response:');
        console.log(result.response);
      } else {
        console.log('\n❌ Error:');
        console.log(result.error);
      }
    } else {
      // Test all providers
      const prompt = args[0] && args[0] !== 'all' 
        ? args.join(' ') 
        : "Explain what an LLM router does in a few sentences.";
      
      console.log(`Testing all providers with prompt: ${prompt}`);
      const results = await testAllProviders(prompt);
      
      console.log("\n📊 Test Summary:");
      results.tests.forEach(test => {
        const icon = test.success ? '✅' : '❌';
        const details = test.success 
          ? `${test.elapsed} (${test.responseLength} chars)` 
          : test.error;
        console.log(`${icon} ${test.model}: ${details}`);
      });
      
      // Print a successful response as sample
      const successfulTest = results.tests.find(t => t.success);
      if (successfulTest) {
        console.log("\n📝 Sample Response:");
        console.log(successfulTest.response);
      }
    }
  } catch (error) {
    console.error('❌ Test failed with error:', error);
    process.exit(1);
  }
}

main().catch(console.error);
