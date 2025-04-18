#!/bin/bash

echo "📦 Unzipping LLM Adapter Patch..."

ZIP_PATH="$HOME/Downloads/llm_adapter_dynamic_patch_20250418-024618.zip"
TARGET_DIR="./adapters"

if [ ! -f "$ZIP_PATH" ]; then
  echo "❌ Zip file not found at $ZIP_PATH"
  exit 1
fi

unzip -o "$ZIP_PATH" -d "$TARGET_DIR"

echo "✅ Patched llm_adapter.mjs installed to $TARGET_DIR"
echo "🧪 You can now re-run the test agent:"
echo "   node agents/llm_test_agent_v1/run_llm_test_agent_v1.mjs"

