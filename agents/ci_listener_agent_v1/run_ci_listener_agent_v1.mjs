import { CIListenerAgent } from "./ci_listener_agent_v1_core.mjs";

const eventType = process.argv[2] || "push";

const agent = new CIListenerAgent(eventType);
agent.run();
