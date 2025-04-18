import 'dotenv/config';

/**
 * Call Anthropic Claude API with the specified model
 * @param {string} prompt - The prompt to send
 * @param {string} [model='claude-3-opus-20240229'] - The model to use
 * @returns {Promise<string>} The model response
 */
export async function callClaude(prompt, model = 'claude-3-opus-20240229') {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: model,
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }]
    }),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Claude API error (${response.status}): ${errorData.error?.message || response.statusText}`);
  }
  
  const json = await response.json();
  return json.content?.[0]?.text || "No response";
}
