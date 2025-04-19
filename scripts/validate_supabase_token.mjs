#!/usr/bin/env node
// scripts/validate_supabase_token.mjs
// A utility to validate and analyze a Supabase JWT token

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
console.log('🔑 Supabase Token Validator');
console.log('─────────────────────────');

// Get Supabase credentials from environment
const supabaseUrl = process.env.SUPABASE_URL || 'https://psbvjpvbhpgsnggbptfa.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Function to decode JWT without verification
// Note: This is just for inspection, not security validation
function decodeJwtPayload(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Invalid JWT format:', e.message);
    return null;
  }
}

// Function to analyze token permissions
function analyzeToken(token) {
  if (!token) {
    return {
      valid: false,
      message: 'No token provided'
    };
  }
  
  const payload = decodeJwtPayload(token);
  
  if (!payload) {
    return {
      valid: false,
      message: 'Invalid token format'
    };
  }
  
  // Extract key information
  const { role, exp, iat, iss, ref } = payload;
  
  // Calculate expiration
  const expirationDate = new Date(exp * 1000);
  const issuedDate = new Date(iat * 1000);
  const now = new Date();
  const expired = now > expirationDate;
  const daysUntilExpiration = Math.round((expirationDate - now) / (1000 * 60 * 60 * 24));
  
  // Check permissions
  const isAnon = role === 'anon';
  const isServiceRole = role === 'service_role';
  const isAuthRole = role === 'authenticated';
  
  // Format the result
  return {
    valid: !expired,
    type: isAnon ? 'Anonymous' : isServiceRole ? 'Service Role' : isAuthRole ? 'Authenticated User' : role,
    project: ref,
    issuer: iss,
    issued: issuedDate.toISOString(),
    expires: expirationDate.toISOString(),
    expired,
    daysUntilExpiration,
    canCreateTables: isServiceRole,
    canReadData: true,
    canWriteData: isServiceRole || isAuthRole,
    payload
  };
}

// Function to validate connection with the token
async function validateConnection(url, token) {
  if (!url || !token) {
    return { connected: false, message: 'Missing URL or token' };
  }
  
  try {
    const supabase = createClient(url, token);
    
    // Try a simple query to see if the connection works
    const { data, error } = await supabase.from('llm_logs').select('*').limit(1);
    
    if (error) {
      // Check if it's a table not found error (which is fine for our test)
      if (error.code === '42P01') {
        return { 
          connected: true, 
          message: 'Connected successfully, but table llm_logs doesn\'t exist yet',
          canRead: true
        };
      }
      
      // Check if it's a permissions error
      if (error.code === '42501' || error.message.includes('permission')) {
        return { 
          connected: true, 
          message: 'Connected successfully, but insufficient permissions',
          canRead: false,
          error: error.message
        };
      }
      
      return { 
        connected: false, 
        message: `Connection error: ${error.message}`,
        error
      };
    }
    
    return { 
      connected: true, 
      message: 'Connected successfully and can read from llm_logs',
      canRead: true,
      recordCount: data?.length || 0
    };
  } catch (err) {
    return { 
      connected: false, 
      message: `Unexpected error: ${err.message}`,
      error: err
    };
  }
}

// Main function to run the validation
async function main() {
  // Validate the anonymous/regular key
  console.log('\n🔍 Analyzing SUPABASE_SERVICE_KEY...');
  if (!supabaseKey) {
    console.log('❌ No SUPABASE_SERVICE_KEY found in .env file');
  } else {
    const tokenInfo = analyzeToken(supabaseKey);
    
    if (!tokenInfo.valid) {
      console.log(`❌ Invalid token: ${tokenInfo.message}`);
    } else {
      console.log('✅ Token is valid');
      console.log(`• Type: ${tokenInfo.type}`);
      console.log(`• Project: ${tokenInfo.project}`);
      console.log(`• Expires: ${tokenInfo.expired ? 'EXPIRED' : tokenInfo.expires} (${tokenInfo.expired ? 'EXPIRED' : `${tokenInfo.daysUntilExpiration} days left`})`);
      console.log(`• Can create tables: ${tokenInfo.canCreateTables ? 'Yes' : 'No'}`);
      console.log(`• Can read data: ${tokenInfo.canReadData ? 'Yes' : 'No'}`);
      console.log(`• Can write data: ${tokenInfo.canWriteData ? 'Yes' : 'No'}`);
      
      if (tokenInfo.type === 'Anonymous') {
        console.log('\n⚠️ Note: Anonymous tokens cannot create tables or modify database schema');
        console.log('  You will need a Service Role token for those operations');
      }
      
      // Test the connection
      console.log('\n🔌 Testing connection with this token...');
      const connectionResult = await validateConnection(supabaseUrl, supabaseKey);
      
      if (connectionResult.connected) {
        console.log(`✅ ${connectionResult.message}`);
        
        if (connectionResult.recordCount !== undefined) {
          console.log(`• Found ${connectionResult.recordCount} records in llm_logs table`);
        }
      } else {
        console.log(`❌ ${connectionResult.message}`);
      }
    }
  }
  
  // Check if service role key is available
  console.log('\n🔍 Checking for SUPABASE_SERVICE_ROLE_KEY...');
  if (!supabaseServiceRoleKey) {
    console.log('❌ No SUPABASE_SERVICE_ROLE_KEY found in .env file');
    console.log('\n📝 To create tables, you need a service role key:');
    console.log('1. Log in to your Supabase dashboard at: https://app.supabase.io');
    console.log('2. Go to Project Settings > API');
    console.log('3. Copy the "service_role" key (Note: Keep this secure!)');
    console.log('4. Add it to your .env file as SUPABASE_SERVICE_ROLE_KEY=your_key_here');
  } else {
    const serviceTokenInfo = analyzeToken(supabaseServiceRoleKey);
    
    if (!serviceTokenInfo.valid) {
      console.log(`❌ Invalid token: ${serviceTokenInfo.message}`);
    } else {
      console.log('✅ Service role token is valid');
      console.log(`• Type: ${serviceTokenInfo.type}`);
      console.log(`• Can create tables: ${serviceTokenInfo.canCreateTables ? 'Yes' : 'No'}`);
      
      if (serviceTokenInfo.type !== 'Service Role') {
        console.log('⚠️ Warning: This token is not a service role token and may not have table creation privileges');
      } else {
        console.log('✅ This token should have sufficient privileges to create tables');
      }
    }
  }
  
  // Final summary
  console.log('\n📋 SUMMARY:');
  if (supabaseKey) {
    const tokenInfo = analyzeToken(supabaseKey);
    if (tokenInfo.valid && tokenInfo.canCreateTables) {
      console.log('✅ Your current configuration should allow creating tables');
    } else if (supabaseServiceRoleKey && analyzeToken(supabaseServiceRoleKey).valid && 
              analyzeToken(supabaseServiceRoleKey).canCreateTables) {
      console.log('✅ You have a valid service role key that can be used to create tables');
      console.log('   Use scripts/create_supabase_table.mjs to create the required tables');
    } else {
      console.log('❌ Your current configuration does not include a key with table creation privileges');
      console.log('   Please add a SUPABASE_SERVICE_ROLE_KEY to your .env file');
    }
  } else {
    console.log('❌ No valid Supabase configuration found');
  }
}

// Run the main function
main().catch(err => {
  console.error('\n💥 Fatal error:', err);
  process.exit(1);
});
