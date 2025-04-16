import express from 'express';
import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = 3001;

app.use(cors());

function readYamlFile(relativePath) {
  try {
    const absPath = path.resolve(__dirname, '../../', relativePath);
    const raw = fs.readFileSync(absPath, 'utf-8');
    return YAML.parse(raw);
  } catch (err) {
    console.error(`❌ Failed to load ${relativePath}:`, err);
    return { error: `Could not load file: ${relativePath}` };
  }
}



app.get('/api/memory-summary', (req, res) => {
  res.json(readYamlFile('memory/memory_index.yaml'));
});

app.get('/api/agent-usage', (req, res) => {
  res.json(readYamlFile('logs/agent_usage_report.yaml'));
});

app.get('/api/reflection-latest', (req, res) => {
  const dirPath = path.resolve(__dirname, '../../logs');


  const files = fs.readdirSync(dirPath);
  const reflections = files.filter(f => f.startsWith('reflection_summary_') && f.endsWith('.yaml'));
  const latest = reflections.sort().reverse()[0];

  if (latest) {
    const raw = fs.readFileSync(path.join(dirPath, latest), 'utf-8');
    res.json(YAML.parse(raw));
  } else {
    res.status(404).json({ error: 'No reflection files found.' });
  }
});

// 👇 THIS LINE IS CRITICAL TO KEEP THE SERVER RUNNING
app.listen(PORT, () => {
  console.log(`🚀 Dashboard API running at http://localhost:${PORT}`);
});
