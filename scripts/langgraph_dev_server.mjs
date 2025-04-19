import express from "express";
import cors from "cors";
import { graph } from "../agents/llmmanager/index.mjs";
import logsRouter from "./api_routes/logs_api.mjs";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from the llmmanager directory
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '../agents/llmmanager/.env');
dotenv.config({ path: envPath });

const app = express();
app.use(cors());
app.use(express.json());

// Register API routes
app.use("/api", logsRouter);

app.post("/api/invoke", async (req, res) => {
  try {
    const input = req.body.input ?? "Hello, Forgeborn";
    console.log("⏩ Invoking LangGraph with:", input);
    const result = await graph.invoke({ input });
    console.log("✅ Result:", result);
    res.json(result);
  } catch (error) {
    console.error("❌ Graph error:", error);
    res.status(500).json({ error: "Graph invocation failed" });
  }
});

const PORT = 2025;
app.listen(PORT, () => {
  console.log(`🚀 LangGraph Dev Server running at http://localhost:${PORT}`);
});
