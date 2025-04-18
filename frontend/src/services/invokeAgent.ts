export async function invokeAgent(input: string) {
  const res = await fetch("http://localhost:2025/api/invoke", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input }),
  });
  if (!res.ok) throw new Error(`Agent error: ${res.status}`);
  const data = await res.json();
  
  // Handle nested output structure
  if (data.output && typeof data.output === 'object') {
    if (data.output.output) {
      return data.output.output;
    }
    return JSON.stringify(data.output);
  }
  
  return JSON.stringify(data);
}
