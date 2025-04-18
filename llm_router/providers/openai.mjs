import 'dotenv/config';

/**
 * Call OpenAI API with the specified model
 * @param {string} prompt - The prompt to send
 * @param {string} [model='gpt-4o'] - The model to use
 * @returns {Promise<string>} The model response
 */
export async function callOpenAI(prompt, model = 'gpt-4o') {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: model,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`OpenAI API error (${response.status}): ${errorData.error?.message || response.statusText}`);
  }
  
  const json = await response.json();
  return json.choices?.[0]?.message?.content || "No response";
}
