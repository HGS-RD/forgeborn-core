/**
 * LLM Test Agent
 * Validates the routing logic and provider connections
 */

import { callLLM } from '../../adapters/llm_adapter.mjs';
import fs from 'fs/promises';
import path from 'path';

/**
 * Test agent to validate LLM routing
 * @param {Object} options - Test options
 * @param {string} options.prompt - Test prompt
 * @param {string} [options.model] - Model to test
 * @returns {Promise<Object>} - Test results
 */
export async function runLLMTest({ prompt, model }) {
  console.log(`🧪 Testing LLM routing with model: ${model || 'default'}`);
  
  try {
    const startTime = Date.now();
    
    // Call with the test agent name for tracing
    const response = await callLLM({
      prompt,
      model,
      agentName: 'llm_test_agent_v1',
      task: 'test'
    });
    
    const elapsed = (Date.now() - startTime) / 1000;
    
    return {
      success: true,
      model: model || 'gpt-4o (default)',
      responseLength: response.length,
      elapsed: `${elapsed.toFixed(2)}s`,
      response: response.substring(0, 500) + (response.length > 500 ? '...' : '')
    };
  } catch (error) {
    return {
      success: false,
      model: model || 'gpt-4o (default)',
      error: error.message
    };
  }
}

/**
 * Run tests against all providers
 * @param {string} prompt - Test prompt to use
 * @returns {Promise<Object>} - Test results
 */
export async function testAllProviders(prompt = "Explain how an LLM router works in a few sentences.") {
  console.log('🧪 Testing all providers with standard prompt');
  
  const results = {
    timestamp: new Date().toISOString(),
    tests: []
  };
  
  // Test all providers
  const modelsToTest = [
    undefined, // Default (should be gpt-4o)
    'gpt-4o',
    'claude',
    'claude-sonnet',
    'mistral',
    'gemini'
  ];
  
  for (const model of modelsToTest) {
    console.log(`Testing model: ${model || 'default'}`);
    try {
      const result = await runLLMTest({ prompt, model });
      results.tests.push({
        model: model || 'default',
        ...result
      });
    } catch (error) {
      results.tests.push({
        model: model || 'default',
        success: false,
        error: error.message
      });
    }
    
    // Small delay between tests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Save test results
  try {
    const outputDir = path.join(process.cwd(), 'logs', 'llm_tests');
    await fs.mkdir(outputDir, { recursive: true });
    
    const filename = `test_results_${new Date().toISOString().replace(/[:\.]/g, '-')}.json`;
    await fs.writeFile(
      path.join(outputDir, filename),
      JSON.stringify(results, null, 2)
    );
    
    console.log(`✅ Test results saved to logs/llm_tests/${filename}`);
  } catch (error) {
    console.error('Failed to save test results:', error);
  }
  
  return results;
}

// CLI entry point
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const prompt = process.argv[2] || "Explain how an LLM router works in a few sentences.";
  testAllProviders(prompt)
    .then(results => {
      console.log("\n📊 Test Summary:");
      results.tests.forEach(test => {
        const icon = test.success ? '✅' : '❌';
        console.log(`${icon} ${test.model}: ${test.success ? test.elapsed : test.error}`);
      });
    })
    .catch(console.error);
}

// Add file URL import for CLI usage
import { fileURLToPath } from 'url';
