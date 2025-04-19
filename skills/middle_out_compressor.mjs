
// skills/middle_out_compressor.mjs

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Utility to estimate tokens (rough rule: 4 chars ≈ 1 token)
function estimateTokens(text) {
  return Math.ceil(text.length / 4);
}

// Compress a string by preserving head + tail and summarizing the middle
export async function middleOutCompress(text, maxTokens = 180000) {
  const tokens = estimateTokens(text);
  if (tokens <= maxTokens) return text;

  const lines = text.split('\n');
  const totalLines = lines.length;

  // Preserve 25% from head and tail
  const headCount = Math.floor(totalLines * 0.25);
  const tailCount = Math.floor(totalLines * 0.25);

  const head = lines.slice(0, headCount);
  const tail = lines.slice(-tailCount);
  const compressed = [
    ...head,
    '',
    '[[COMPRESSED_MIDDLE]]',
    `...${totalLines - headCount - tailCount} lines omitted for context...`,
    '',
    ...tail
  ];

  return compressed.join('\n');
}

// Example usage with a file path
export async function compressFileMiddleOut(filePath, maxTokens = 180000) {
  try {
    const absPath = path.resolve(__dirname, filePath);
    const content = await fs.readFile(absPath, 'utf-8');
    return await middleOutCompress(content, maxTokens);
  } catch (err) {
    console.error('Compression failed:', err);
    throw err;
  }
}
