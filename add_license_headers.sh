#!/bin/bash

# -------------------------------
# Forgeborn Header Injection Script
# Adds license notice to all .ts and .md files in repo
# -------------------------------

ROOT_DIR="$HOME/Documents/GitHub/forgeborn-core"

HEADER="// Copyright (c) 2025 Hillstrong Group Security. All rights reserved.
// Use of this source code is governed by the custom license found in the LICENSE file."

echo "📌 Injecting license headers under: $ROOT_DIR"

find "$ROOT_DIR" \( -name "*.ts" -o -name "*.md" \) | while read -r file; do
  if grep -q "Hillstrong Group Security" "$file"; then
    echo "✅ Already has header: $file"
  else
    echo "✍️  Adding header to: $file"
    tmp_file=$(mktemp)
    echo "$HEADER" > "$tmp_file"
    echo "" >> "$tmp_file"
    cat "$file" >> "$tmp_file"
    mv "$tmp_file" "$file"
  fi
done

echo "🎉 Header injection complete."
