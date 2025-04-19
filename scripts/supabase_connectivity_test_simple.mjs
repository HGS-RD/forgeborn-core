#!/usr/bin/env node

/**
 * Simple Supabase Connectivity Test
 * 
 * A lightweight script to quickly verify Supabase connectivity
 * using ES modules syntax.
 */

import https from 'https';
import { URL } from 'url';
import * as dotenv from 'dotenv';
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

console.log('\n🔎 Supabase Connectivity Test');
console.log('──────────────────────────────\n');

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Missing required environment variables: SUPABASE_URL or SUPABASE_ANON_KEY');
  process.exit(1);
}

console.log(`🌐 Supabase URL: ${SUPABASE_URL}`);
console.log(`🔑 Anon Key: ${SUPABASE_ANON_KEY.slice(0, 6)}...${SUPABASE_ANON_KEY.slice(-6)}`);
if (SUPABASE_SERVICE_ROLE_KEY) {
  console.log(`🛡️  Service Role Key: ${SUPABASE_SERVICE_ROLE_KEY.slice(0, 6)}...${SUPABASE_SERVICE_ROLE_KEY.slice(-6)}`);
}

const endpoint = new URL('/rest/v1/', SUPABASE_URL);

const options = {
  method: 'GET',
  headers: {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json'
  }
};

console.log(`\n🚀 Testing connectivity to: ${endpoint.href}\n`);

const req = https.request(endpoint, options, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log(`✅ Response status: ${res.statusCode}`);
    if (res.statusCode >= 200 && res.statusCode < 300) {
      console.log('✅ Supabase connection succeeded.');
    } else {
      console.error(`❌ Unexpected status code: ${res.statusCode}`);
      console.error(`Response: ${data}`);
    }
  });
});

req.on('error', e => {
  console.error(`❌ Request failed: ${e.message}`);
});

req.end();
