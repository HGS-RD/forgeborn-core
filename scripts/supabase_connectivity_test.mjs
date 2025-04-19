#!/usr/bin/env node

/**
 * Supabase Connectivity Test for TaskNavigator.io
 * 
 * This script tests connectivity to Supabase and verifies that
 * secrets/environment variables are correctly set up and accessible.
 */

// Import required libraries
import https from 'https';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  dim: '\x1b[2m',
  bright: '\x1b[1m'
};

console.log(`${colors.bright}${colors.blue}TaskNavigator.io Supabase Connectivity Test${colors.reset}`);
console.log(`${colors.dim}Testing connectivity to Supabase and verifying secrets manager setup${colors.reset}\n`);

// Track overall status
const testResults = {
  environmentVariables: {
    status: 'pending',
    details: {}
  },
  supabaseConnection: {
    status: 'pending',
    details: {}
  },
  secretsManager: {
    status: 'pending',
    details: {}
  }
};

// Step 1: Check for environment variables
console.log(`${colors.cyan}Checking environment variables:${colors.reset}`);

const requiredVars = [
  'SUPABASE_URL',
  'SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_KEY'
];

const missingVars = [];
const presentVars = [];

requiredVars.forEach(varName => {
  if (process.env[varName]) {
    const maskedValue = process.env[varName].substring(0, 4) + '***' + 
                        process.env[varName].substring(process.env[varName].length - 4);
    console.log(`${colors.green}✓${colors.reset} ${varName} is set: ${colors.dim}${maskedValue}${colors.reset}`);
    presentVars.push(varName);
    
    testResults.environmentVariables.details[varName] = {
      present: true,
      masked: maskedValue
    };
  } else {
    console.log(`${colors.red}✗${colors.reset} ${varName} is not set`);
    missingVars.push(varName);
    
    testResults.environmentVariables.details[varName] = {
      present: false
    };
  }
});

if (missingVars.length > 0) {
  console.log(`\n${colors.yellow}Warning: ${missingVars.length} required environment variables are missing${colors.reset}`);
  testResults.environmentVariables.status = 'failed';
} else {
  console.log(`\n${colors.green}All required environment variables are present${colors.reset}`);
  testResults.environmentVariables.status = 'passed';
}

// Step 2: Test Supabase connectivity
console.log(`\n${colors.cyan}Testing Supabase connectivity:${colors.reset}`);

const testSupabaseConnection = async () => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.log(`${colors.red}✗${colors.reset} Cannot test connection - missing Supabase URL or anon key`);
    testResults.supabaseConnection.status = 'failed';
    testResults.supabaseConnection.details.error = 'Missing required environment variables';
    return;
  }
  
  console.log(`${colors.dim}Connecting to: ${supabaseUrl}${colors.reset}`);
  
  return new Promise((resolve) => {
    try {
      const healthEndpoint = `${supabaseUrl}/rest/v1/?apikey=${supabaseAnonKey}`;
      
      const req = https.get(healthEndpoint, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`
        }
      }, (res) => {
        const statusCode = res.statusCode;
        
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          if (statusCode >= 200 && statusCode < 300) {
            console.log(`${colors.green}✓${colors.reset} Successfully connected to Supabase (Status: ${statusCode})`);
            testResults.supabaseConnection.status = 'passed';
            testResults.supabaseConnection.details.statusCode = statusCode;
            testResults.supabaseConnection.details.response = data.substring(0, 100); // Only store first 100 chars
            
            // Try to parse headers to get Supabase version info
            const serverInfo = res.headers['x-server-info'] || 'Unknown';
            console.log(`${colors.green}✓${colors.reset} Supabase server info: ${colors.dim}${serverInfo}${colors.reset}`);
            testResults.supabaseConnection.details.serverInfo = serverInfo;
            
            resolve(true);
          } else {
            console.log(`${colors.red}✗${colors.reset} Failed to connect to Supabase (Status: ${statusCode})`);
            console.log(`${colors.red}Response: ${data}${colors.reset}`);
            testResults.supabaseConnection.status = 'failed';
            testResults.supabaseConnection.details.statusCode = statusCode;
            testResults.supabaseConnection.details.error = data;
            resolve(false);
          }
        });
      });
      
      req.on('error', (error) => {
        console.log(`${colors.red}✗${colors.reset} Error connecting to Supabase: ${error.message}`);
        testResults.supabaseConnection.status = 'failed';
        testResults.supabaseConnection.details.error = error.message;
        resolve(false);
      });
      
      req.on('timeout', () => {
        req.destroy();
        console.log(`${colors.red}✗${colors.reset} Connection to Supabase timed out`);
        testResults.supabaseConnection.status = 'failed';
        testResults.supabaseConnection.details.error = 'Connection timed out';
        resolve(false);
      });
      
      req.end();
    } catch (error) {
      console.log(`${colors.red}✗${colors.reset} Exception when connecting to Supabase: ${error.message}`);
      testResults.supabaseConnection.status = 'failed';
      testResults.supabaseConnection.details.error = error.message;
      resolve(false);
    }
  });
};

// Step 3: Check secrets manager
const checkSecretsManager = () => {
  console.log(`\n${colors.cyan}Checking secrets manager:${colors.reset}`);
  
  try {
    // Check for common secrets managers
    const managers = [
      {
        name: 'DigitalOcean App Platform Secrets',
        check: () => {
          try {
            const result = execSync('doctl version 2>/dev/null || echo "Not installed"').toString().trim();
            return !result.includes('Not installed');
          } catch (e) {
            return false;
          }
        },
        getSecrets: () => {
          try {
            const cmd = 'source .env.do-deploy 2>/dev/null && ' +
                      'doctl apps list --format ID --no-header 2>/dev/null | head -n1 | ' +
                      'xargs -I {} doctl apps get {} --format ID,Spec.Name,ActiveDeployment.Phase 2>/dev/null';
            const result = execSync(cmd).toString().trim();
            return result;
          } catch (e) {
            return null;
          }
        }
      },
      {
        name: 'Kubernetes Secrets',
        check: () => {
          try {
            const result = execSync('kubectl version --client 2>/dev/null || echo "Not installed"').toString().trim();
            return !result.includes('Not installed');
          } catch (e) {
            return false;
          }
        },
        getSecrets: () => {
          try {
            const cmd = 'kubectl get secrets -o name 2>/dev/null | head -n5';
            const result = execSync(cmd).toString().trim();
            return result || null;
          } catch (e) {
            return null;
          }
        }
      },
      {
        name: 'AWS Secrets Manager',
        check: () => {
          try {
            const result = execSync('aws --version 2>/dev/null || echo "Not installed"').toString().trim();
            return !result.includes('Not installed');
          } catch (e) {
            return false;
          }
        },
        getSecrets: () => {
          try {
            const cmd = 'aws configure list 2>/dev/null | grep region';
            const result = execSync(cmd).toString().trim();
            return result || null;
          } catch (e) {
            return null;
          }
        }
      },
      {
        name: 'Environment Variables',
        check: () => true, // Environment vars are always available
        getSecrets: () => {
          const supabaseVars = Object.keys(process.env)
            .filter(key => key.includes('SUPABASE'))
            .map(key => key)
            .join(', ');
          return supabaseVars || null;
        }
      }
    ];
    
    let foundSecretManagers = 0;
    
    managers.forEach(manager => {
      const isAvailable = manager.check();
      
      if (isAvailable) {
        console.log(`${colors.green}✓${colors.reset} ${manager.name} is available`);
        foundSecretManagers++;
        
        const secrets = manager.getSecrets();
        if (secrets) {
          // Only show sanitized output for security reasons
          const sanitizedOutput = secrets.split('\n')
            .map(line => {
              // Remove any actual secrets or tokens
              return line.replace(/(key|token|secret|password|auth)=([^\s]{4}).+?([^\s]{4})/gi, '$1=$2***$3');
            })
            .join('\n');
          
          if (sanitizedOutput.includes('SUPABASE') || manager.name === 'Environment Variables') {
            console.log(`${colors.green}✓${colors.reset} Found Supabase-related secrets in ${manager.name}`);
            console.log(`${colors.dim}${sanitizedOutput}${colors.reset}`);
            
            testResults.secretsManager.details[manager.name] = {
              available: true,
              hasSupabaseSecrets: true,
              sample: sanitizedOutput.substring(0, 100) // Only store first 100 chars
            };
          } else {
            console.log(`${colors.yellow}!${colors.reset} No Supabase-related secrets found in ${manager.name}`);
            console.log(`${colors.dim}Sample of available secrets: ${sanitizedOutput.substring(0, 100)}...${colors.reset}`);
            
            testResults.secretsManager.details[manager.name] = {
              available: true,
              hasSupabaseSecrets: false
            };
          }
        } else {
          console.log(`${colors.yellow}!${colors.reset} Could not retrieve secrets from ${manager.name}`);
          
          testResults.secretsManager.details[manager.name] = {
            available: true,
            hasSupabaseSecrets: false,
            error: 'Could not retrieve secrets'
          };
        }
      } else {
        testResults.secretsManager.details[manager.name] = {
          available: false
        };
      }
    });
    
    if (foundSecretManagers > 0) {
      console.log(`\n${colors.green}Found ${foundSecretManagers} available secrets managers${colors.reset}`);
      testResults.secretsManager.status = 'passed';
    } else {
      console.log(`\n${colors.red}No secrets managers found${colors.reset}`);
      testResults.secretsManager.status = 'failed';
    }
  } catch (error) {
    console.log(`${colors.red}✗${colors.reset} Error checking secrets manager: ${error.message}`);
    testResults.secretsManager.status = 'failed';
    testResults.secretsManager.details.error = error.message;
  }
};

// Step 4: Check for Supabase client libraries
const checkSupabaseLibraries = () => {
  console.log(`\n${colors.cyan}Checking for Supabase client libraries:${colors.reset}`);
  
  try {
    const packageJsonPath = resolve(__dirname, '../package.json');
    let packageJson;
    
    try {
      const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
      packageJson = JSON.parse(packageJsonContent);
    } catch (e) {
      console.log(`${colors.yellow}!${colors.reset} Could not find package.json`);
      return;
    }
    
    const dependencies = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies
    };
    
    const supabasePackages = Object.keys(dependencies)
      .filter(pkg => pkg.includes('@supabase') || pkg === 'supabase');
    
    if (supabasePackages.length > 0) {
      console.log(`${colors.green}✓${colors.reset} Found ${supabasePackages.length} Supabase packages:`);
      supabasePackages.forEach(pkg => {
        console.log(`${colors.green}-${colors.reset} ${pkg}: ${dependencies[pkg]}`);
      });
    } else {
      console.log(`${colors.yellow}!${colors.reset} No Supabase packages found in package.json`);
      console.log(`${colors.yellow}!${colors.reset} You may need to install @supabase/supabase-js`);
    }
  } catch (error) {
    console.log(`${colors.red}✗${colors.reset} Error checking Supabase libraries: ${error.message}`);
  }
};

// Run all the tests
const runAllTests = async () => {
  // Check for required environment variables
  if (missingVars.length > 0) {
    console.log(`\n${colors.yellow}Setting missing environment variables for testing purposes...${colors.reset}`);
    
    if (!process.env.SUPABASE_URL) {
      process.env.SUPABASE_URL = 'https://dbid.supabase.co';
      console.log(`${colors.yellow}!${colors.reset} Set placeholder SUPABASE_URL (this won't work for real connections)`);
    }
    
    if (!process.env.SUPABASE_ANON_KEY) {
      process.env.SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder';
      console.log(`${colors.yellow}!${colors.reset} Set placeholder SUPABASE_ANON_KEY (this won't work for real connections)`);
    }
    
    if (!process.env.SUPABASE_SERVICE_KEY) {
      process.env.SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.service-key-placeholder';
      console.log(`${colors.yellow}!${colors.reset} Set placeholder SUPABASE_SERVICE_KEY (this won't work for real connections)`);
    }
  }

  // Check secrets manager
  checkSecretsManager();
  
  // Check for Supabase client libraries
  checkSupabaseLibraries();
  
  // Test connection to Supabase
  await testSupabaseConnection();
  
  // Print summary
  console.log(`\n${colors.bright}${colors.blue}Test Summary:${colors.reset}`);
  
  Object.keys(testResults).forEach(testName => {
    const test = testResults[testName];
    const statusColor = test.status === 'passed' ? colors.green :
                         test.status === 'failed' ? colors.red :
                         colors.yellow;
    
    console.log(`${statusColor}${test.status.toUpperCase()}${colors.reset}: ${testName}`);
    
    if (test.status === 'failed' && test.details.error) {
      console.log(`  ${colors.red}Error: ${test.details.error}${colors.reset}`);
    }
  });
  
  // Print recommendations
  console.log(`\n${colors.bright}${colors.blue}Recommendations:${colors.reset}`);
  
  if (testResults.environmentVariables.status === 'failed') {
    console.log(`${colors.yellow}1. Add missing Supabase environment variables to your deployment${colors.reset}`);
    console.log(`   You can add these in your DigitalOcean App Platform settings or as secrets`);
  }
  
  if (testResults.supabaseConnection.status === 'failed') {
    console.log(`${colors.yellow}2. Verify your Supabase URL and API keys${colors.reset}`);
    console.log(`   Check that your Supabase project is up and running`);
    console.log(`   Ensure network connectivity between your app and Supabase`);
  }
  
  if (testResults.secretsManager.status === 'failed') {
    console.log(`${colors.yellow}3. Set up a secrets manager to securely store your Supabase credentials${colors.reset}`);
    console.log(`   DigitalOcean App Platform provides secrets management`);
  }
  
  console.log(`\n${colors.dim}For more information, see the Supabase documentation: https://supabase.io/docs${colors.reset}`);
};

// Run all tests
runAllTests();
