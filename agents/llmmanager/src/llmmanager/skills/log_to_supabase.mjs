import { supabase } from "../../supabase_client.mjs";

export async function logToSupabase({ rc_id = "RC_LOCAL", agent = "llmmanager", message = "", level = "info" }) {
  try {
    const { error } = await supabase
      .from("llm_logs")
      .insert([{ rc_id, agent, message, level }]);

    if (error) {
      console.error("❌ Supabase insert error:", error.message);
    } else {
      console.log("✅ Log entry stored in Supabase.");
    }
  } catch (err) {
    console.error("❌ Unexpected Supabase error:", err);
  }
}
