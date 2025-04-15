// Copyright (c) 2025 Hillstrong Group Security. All rights reserved.
// Use of this source code is governed by the custom license found in the LICENSE file.

import * as fs from 'fs';
import * as path from 'path';

export async function writeScaffold(files: { path: string; content: string }[]): Promise<void> {
  for (const file of files) {
    const dir = path.dirname(file.path);
    await fs.promises.mkdir(dir, { recursive: true });
    await fs.promises.writeFile(file.path, file.content, 'utf-8');
    console.log(`📁 Created: ${file.path}`);
  }
}
