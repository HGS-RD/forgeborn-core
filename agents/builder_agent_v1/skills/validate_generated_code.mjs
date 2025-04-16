// Skill: validate_generated_code
export async function validateGeneratedCode(code) {
  try {
    new Function(code); // Simple syntax check
    return { status: "valid", code };
  } catch (e) {
    return { status: "invalid", error: e.message };
  }
}
