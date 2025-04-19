// scripts/api_routes/logs_api.mjs
import express from 'express';

// Mock data for development/testing
const MOCK_LOGS = [
  {
    id: 1,
    agent: "llmmanager",
    level: "INFO",
    message: "Agent initialized successfully",
    timestamp: new Date().toISOString()
  },
  {
    id: 2,
    agent: "completion_agent",
    level: "DEBUG",
    message: "Processing user request: 'Generate a summary of quantum computing'",
    timestamp: new Date(Date.now() - 60000).toISOString()
  },
  {
    id: 3,
    agent: "orchestrator",
    level: "INFO",
    message: "Task distributed to workers",
    timestamp: new Date(Date.now() - 120000).toISOString()
  },
  {
    id: 4,
    agent: "validator",
    level: "WARNING",
    message: "Response quality below threshold (0.68)",
    timestamp: new Date(Date.now() - 180000).toISOString()
  },
  {
    id: 5,
    agent: "llmmanager",
    level: "ERROR",
    message: "Failed to connect to LLM API: Rate limit exceeded",
    timestamp: new Date(Date.now() - 240000).toISOString()
  },
  {
    id: 6,
    agent: "supabase_agent",
    level: "INFO",
    message: "Data synchronization complete: 128 records processed",
    timestamp: new Date(Date.now() - 300000).toISOString()
  },
  {
    id: 7,
    agent: "memory_steward",
    level: "DEBUG",
    message: "Memory consolidation triggered",
    timestamp: new Date(Date.now() - 360000).toISOString()
  },
  {
    id: 8,
    agent: "reflection_agent",
    level: "INFO",
    message: "Agent performance metrics calculated",
    timestamp: new Date(Date.now() - 420000).toISOString()
  }
];

const router = express.Router();

// Mock route to fetch logs (simulating Supabase)
router.get('/logs', async (req, res) => {
  try {
    console.log("🔍 Returning mock logs data");
    
    // Add random delay to simulate network latency
    await new Promise(resolve => setTimeout(resolve, Math.random() * 200 + 100));
    
    console.log(`✅ Returning ${MOCK_LOGS.length} mock logs`);
    res.json(MOCK_LOGS);
  } catch (error) {
    console.error("❌ Error in mock logs endpoint:", error);
    res.status(500).json({ error: error.message || "Failed to fetch logs" });
  }
});

export default router;
