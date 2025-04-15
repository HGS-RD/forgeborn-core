agents:
  - name: skill_loader_agent_v1
    goal: Scan the ./skills directory and register all .mjs modules available at runtime.

  - name: blueprint_optimizer_v1
    goal: Analyze agent folder health and orchestrator alignment to ensure structural integrity.

  - name: meta_orchestrator_v2
    goal: Execute agents based on blueprint order, skill availability, and branching logic for dynamic workflows.
  
  - name: validator_agent_v1
    goal: Check for missing core or runner files and log any agent issues
