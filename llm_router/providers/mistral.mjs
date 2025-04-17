import 'dotenv/config';

export async function callMistral(prompt) {
  const response = await fetch(process.env.MISTRAL_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: process.env.MISTRAL_MODEL,
      prompt,
      stream: false
    }),
  });
  const json = await response.json();
  return json.choices?.[0]?.text || "No response";
}
