export async function logModelMetrics({ model, latency, tokenCost, success }) {
  console.log(`📈 Logging metrics for model ${model}:`, { latency, tokenCost, success });
  return true;
}
