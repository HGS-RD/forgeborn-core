const run = async () => {
  console.log("Booting agent...");
  const mod = await import("./run_scheduler_shell.ts");
  if (mod?.run_scheduler) {
    mod.run_scheduler();
  } else {
    console.warn("⚠️ Core function not exported or unavailable.");
  }
};

run();
