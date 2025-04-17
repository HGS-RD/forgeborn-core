import 'dotenv/config';

export async function callGrok(prompt) {
  const response = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROK_API_KEY}`
    },
    body: JSON.stringify({
      model: process.env.GROK_MODEL || "grok-1",
      messages: [{ role: "user", content: prompt }]
    }),
  });
  const json = await response.json();
  return json.choices?.[0]?.message?.content || "No response";
}
