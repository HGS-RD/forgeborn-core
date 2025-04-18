
/**
 * Tries the primary model first, falls back if it fails.
 */
export async function fallbackAdapterSkill({ prompt, primary, backup, callLLM }) {
  try {
    const response = await callLLM({ prompt, model: primary });
    return { model: primary, response };
  } catch (err) {
    console.warn(`⚠️ Primary model failed (${primary}). Falling back to ${backup}...`);
    const response = await callLLM({ prompt, model: backup });
    return { model: backup, response };
  }
}
