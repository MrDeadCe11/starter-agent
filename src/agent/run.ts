import ollama from "ollama";
import type { AppConfig } from "../config/index.js";
import { SYSTEM_PROMPT } from "../prompts/systemPrompt.js";
import { createSessionMemory } from "../memory/sessionMemory.js";
import { createToolsRegistry } from "../tools/index.js";
import { logError, logInfo } from "../lib/logger.js";

function maybeToolName(prompt: string): string | null {
  const normalized = prompt.trim().toLowerCase();
  if (normalized === "/time" || normalized === "time") {
    return "time";
  }
  return null;
}

type RunAgentInput = {
  config: AppConfig;
  userPrompt: string;
};

export async function runAgent({ config, userPrompt }: RunAgentInput): Promise<void> {
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
      model: config.ollamaModel,
      messages: memory.all(),
    });

    memory.add({
      role: response.message.role,
      content: response.message.content,
    });

    logInfo(`Model: ${config.ollamaModel}`);
    console.log(response.message.content);
  } catch (error: unknown) {
    logError("Ollama request failed.");
    logError(
      "Make sure local Ollama running and model pulled (example: ollama pull llama3.2:3b)."
    );
    if (error instanceof Error) {
      logError(error.message);
    } else {
      logError(String(error));
    }
    process.exitCode = 1;
  }
}
