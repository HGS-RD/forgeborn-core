export class CIListenerAgent {
  constructor(eventType = "push") {
    this.eventType = eventType;
  }

  run() {
    console.log(`🧩 [CIListenerAgent] Listening for GitHub event: ${this.eventType}...`);
    console.log(`✅ Simulated CI trigger for: ${this.eventType}`);
  }
}
