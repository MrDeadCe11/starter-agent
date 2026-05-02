import "dotenv/config";
import { loadConfig } from "./config/index.js";
import { runAgent } from "./agent/run.js";

const config = loadConfig();
const userPrompt =
  process.argv.slice(2).join(" ").trim() || "Give short intro about yourself.";

await runAgent({ config, userPrompt });
