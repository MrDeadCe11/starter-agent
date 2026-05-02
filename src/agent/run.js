import ollama from "ollama";
import { SYSTEM_PROMPT } from "../prompts/systemPrompt.js";
import { createSessionMemory } from "../memory/sessionMemory.js";
import { createToolsRegistry } from "../tools/index.js";
import { logError, logInfo } from "../lib/logger.js";

function maybeToolName(prompt) {
  const normalized = prompt.trim().toLowerCase();
  if (normalized === "/time" || normalized === "time") {
    return "time";
  }
  return null;
}

export async function runAgent({ config, userPrompt }) {
  const memory = createSessionMemory();
  const tools = createToolsRegistry();
  const requestedTool = maybeToolName(userPrompt);

  if (requestedTool) {
    const result = await tools.run(requestedTool);
    logInfo(`Tool ${requestedTool} result: ${result}`);
    return;
  }

  memory.add({ role: "system", content: SYSTEM_PROMPT });
  memory.add({ role: "user", content: userPrompt });

  try {
    const response = await ollama.chat({
      host: config.ollamaHost,
      model: config.ollamaModel,
      messages: memory.all(),
    });

    memory.add(response.message);
    logInfo(`Model: ${config.ollamaModel}`);
    console.log(response.message.content);
  } catch (error) {
    logError("Ollama request failed.");
    logError(
      "Make sure local Ollama running and model pulled (example: ollama pull llama3.2:3b)."
    );
    logError(error.message);
    process.exitCode = 1;
  }
}
