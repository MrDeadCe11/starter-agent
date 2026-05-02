import ollama from "ollama";

const model = process.env.OLLAMA_MODEL || "llama3.2:3b";
const userPrompt = process.argv.slice(2).join(" ").trim() || "Give short intro about yourself.";

async function run() {
  try {
    const response = await ollama.chat({
      model,
      messages: [{ role: "user", content: userPrompt }],
    });

    console.log(`Model: ${model}`);
    console.log(`Prompt: ${userPrompt}\n`);
    console.log(response.message.content);
  } catch (error) {
    console.error("Ollama request failed.");
    console.error(
      "Make sure local Ollama running and model pulled (example: ollama pull llama3.2:3b)."
    );
    console.error(error.message);
    process.exitCode = 1;
  }
}

run();
