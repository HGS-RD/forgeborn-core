#!/bin/bash

# Set working directory
cd /Users/rogerhill/Documents/GitHub/forgeborn-core || exit 1

# Unzip the phase bundle
echo "📦 Unzipping GitHub Agent Bundle..."
unzip -o ~/Downloads/phase6_github_agent_bundle.zip -d . || exit 1

# Install GitHub API client
echo "📦 Installing GitHub API dependencies..."
npm install @octokit/rest --save || exit 1

# Create or update .env file
echo "⚙️  Setting up .env configuration..."

ENV_FILE=".env"

if [ ! -f "$ENV_FILE" ]; then
  echo "GITHUB_TOKEN=ghp_your_personal_access_token_here" > "$ENV_FILE"
  echo "GITHUB_OWNER=HGS-RD" >> "$ENV_FILE"
  echo "GITHUB_REPO=forgeborn-core" >> "$ENV_FILE"
  echo "✅ .env file created with placeholders."
else
  echo "ℹ️  .env already exists. Please verify its contents:"
fi

# Show .env contents
echo "----------------------"
cat .env
echo "----------------------"

# Finish instructions
echo ""
echo "📝 Please edit the .env file with your GitHub token if you haven't yet."
echo "📡 To run the GitHub agent, use:"
echo "   node agents/github_agent_v1/run_github_agent_v1.mjs"

