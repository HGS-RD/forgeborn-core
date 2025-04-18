import 'dotenv/config';

/**
 * Call Google Gemini API with the specified model
 * @param {string} prompt - The prompt to send
 * @param {string} [model] - The model to use (defaults to env var)
 * @returns {Promise<string>} The model response
 */
export async function callGemini(prompt, model) {
  // Use parameter if provided, otherwise fall back to env variable
  const modelToUse = model || process.env.GEMINI_MODEL || 'gemini-1.5-pro';
  
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${modelToUse}:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    }
  );
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Gemini API error (${response.status}): ${errorData.error?.message || response.statusText}`);
  }
  
  const json = await response.json();
  return json.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
}
