export async function generateInsights(summary) {
  return {
    cycle: "RC7",
    insights: [
      "Embedding was successful.",
      "Graph mapping detected gaps in test coverage."
    ]
  };
}
