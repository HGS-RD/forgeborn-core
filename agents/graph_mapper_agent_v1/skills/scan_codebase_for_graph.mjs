export async function mapCodeGraph(context) {
  console.log(`📊 Scanning codebase at ${context.repo_path}`);
  // Mock: return graph structure
  return {
    nodes: ["planner", "evaluator", "docs"],
    edges: [["planner", "evaluator"], ["evaluator", "docs"]],
    format: "json"
  };
}
