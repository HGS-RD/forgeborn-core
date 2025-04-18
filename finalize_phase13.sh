#!/bin/bash

echo "🔄 Finalizing Phase 13 and merging into main..."

# Step 1: Stage all files
git add .

# Step 2: Commit with Phase 13 message
git commit -m "🚀 Phase 13: Self-optimizer and patching system complete"

# Step 3: Switch to main branch
git checkout main

# Step 4: Merge feature branch
git merge feature/auto-pr --no-edit

# Step 5: Push main branch to origin
git push origin main

# Step 6: Optional – delete feature branch
git branch -d feature/auto-pr

echo "✅ Phase 13 successfully finalized and merged into main!"

