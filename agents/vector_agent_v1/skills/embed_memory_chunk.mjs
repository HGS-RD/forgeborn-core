export async function embedAndStore(context) {
  console.log(`🔍 Embedding file: ${context.input_path}`);
  // Mock: embed YAML + push to vector store
  return { status: "embedded", file: context.input_path };
}
