import 'dotenv/config';

/**
 * Call Mistral API with the specified model
 * @param {string} prompt - The prompt to send
 * @param {string} [model] - The model to use (defaults to env var)
 * @returns {Promise<string>} The model response
 */
export async function callMistral(prompt, model) {
  // Use parameter if provided, otherwise fall back to env variable
  const modelToUse = model || process.env.MISTRAL_MODEL || 'mistral-large-latest';
  
  const response = await fetch(process.env.MISTRAL_API_URL, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json", 
      "Authorization": `Bearer ${process.env.MISTRAL_API_KEY}`
    },
    body: JSON.stringify({
      model: modelToUse,
      prompt,
      stream: false
    }),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Mistral API error (${response.status}): ${errorData.error?.message || response.statusText}`);
  }
  
  const json = await response.json();
  return json.choices?.[0]?.text || "No response";
}
