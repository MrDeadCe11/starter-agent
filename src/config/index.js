export function loadConfig() {
  return {
    ollamaHost: process.env.OLLAMA_HOST || "http://127.0.0.1:11434",
    ollamaModel: process.env.OLLAMA_MODEL || "llama3.2:3b",
    maxToolRounds: Number(process.env.MAX_TOOL_ROUNDS || 3),
  };
}
