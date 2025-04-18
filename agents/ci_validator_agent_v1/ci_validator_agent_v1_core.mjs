export class CIValidatorAgent {
  async run(event = "push") {
    console.log(`🔎 [CIValidatorAgent] Validating codebase for event: ${event}...`);
    const { execSync } = await import("child_process");
    try {
      execSync("npm run check:rules", { stdio: "inherit" });
      console.log("✅ Rule compliance passed.");
    } catch (err) {
      console.error("❌ Rule compliance failed.");
    }
  }
}