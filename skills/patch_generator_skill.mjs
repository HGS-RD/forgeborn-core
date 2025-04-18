export async function generatePatchFromInsight(insight) {
  const { agent, recommendation } = insight;
  const header = `# PATCH for ${agent}
# Recommendation: ${recommendation}

`;
  const body = `--- placeholder for actual code diff ---`;
  return header + body;
}
